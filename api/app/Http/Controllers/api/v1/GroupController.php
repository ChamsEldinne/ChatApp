<?php

namespace App\Http\Controllers\api\v1;

use App\Http\Resources\api\v1\GroupResources;
use App\Models\Group;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class GroupController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return GroupResources::collection(Group::with(['admins','members'])->get()) ;
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        
        $request->validate([
            'name'=>['required','unique:groups,name'] ,
        ]);
       // return $request ;
        $group=Group::create([
            'name'=>$request->name ,
        ]) ;
        $user=Auth::user() ;
        $group->users()->attach($user, ['status' => 'admin']); 

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
