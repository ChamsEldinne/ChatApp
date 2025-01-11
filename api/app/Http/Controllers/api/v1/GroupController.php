<?php

namespace App\Http\Controllers\api\v1;

use App\Http\Resources\api\v1\GroupResources;
use App\Models\Group;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;


class GroupController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user=Auth::user() ;
        $groups=DB::select('SELECT groups.id ,groups.name
                            from groups 
                            WHERE groups.id not in (SELECT relation.relationable_id
                                                    from relation 
                                                    WHERE relation.user_id=:user_id and relation.relationable_type="App\Models\Group" ) '
                        ,['user_id'=>$user->id]) ;
        return response()->json($groups);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {       
        $request->validate([
            'name'=>['required','unique:groups,name'] ,
            'members'=>['array'] ,
            'members.*'=>['exists:users,id'] ,
        ]);

        $group=Group::create([
            'name'=>$request->name ,
        ]) ;
        $user=Auth::user() ;
        $group->users()->attach($user, ['status' => 'admin']); 
        
        $data=[] ;
        foreach($request->members as $userId){
          $data[]=['user_id'=>$userId,'status'=>'accpted',
          'relationable_type'=>'App\Models\Group',
          'relationable_id'=>$group->id] ;
        }
        DB::table('relation')->insert($data) ;

        return new GroupResources($group)  ;
    }

    /**
     * Display the specified resource.
     */
    public function show(Group $group)
    {
        return new GroupResources($group)  ;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Group $group)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Group $group)
    {
        //
    }
}
