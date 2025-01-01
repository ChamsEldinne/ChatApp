<?php

namespace App\Http\Controllers\api\v1;

use App\Http\Controllers\Controller;
use App\Models\Group;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use App\Models\Relation ;
class RelationsController extends Controller
{
    public function addFriend(Request $request){
        $request->validate([
         "user_id"=>['required','exists:users,id'] ,
        ]);
        $user=Auth::user();
        $relation= DB::table('relation')
        
        ->where(function ($query)use($user,$request) {
            $query->where('user_id', '=', $user->id)
                  ->where('relationable_id', '=', $request->user_id)
                  ->where('relationable_type','=','App\Models\User');
        })
        ->orWhere(function ($query)use($user,$request) {
            $query->where('user_id', '=', $request->user_id)
                  ->where('relationable_id', '=', $user->id)
                  ->where('relationable_type','=','App\Models\User');
        })
        ->get();
        if($user->id==$request->user_id ||$relation->count()!=0){
            return response()->json(['sent before']) ;
        }
        $user->sendedUsers()->attach($request->user_id,['status'=>'not_confirm']);
        return response()->json('Added' ) ;
    }
    public function cofirmFriend(Request $request,Relation $relation){
        
        $request->validate([
            'response'=>['required','boolean'] ,
        ]);
        $authUser=Auth::user()->id ;
        if($authUser==$relation->user_id){
            $relation->update(['status'=>$request->response==1 ?"accpted":"rejected"]) ;
            return response()->json($relation) ;
        }
        return response()->json(null,403) ;
    }
    public function freindes(){
        $user=Auth::user() ;
        $freinds= DB::select("
        SELECT users.id ,users.name ,relation_id
        from users JOIN 
        (  
        SELECT   (CASE 
            WHEN user_id = :user_id  THEN relationable_id
            ELSE user_id
        END) as freinde_id , relation.id as relation_id

        from relation 
        WHERE relationable_type='App\Models\User' and relation.status='accpted'
        and (relation.user_id= :user_id or relation.relationable_id= :user_id))
        on users.id=freinde_id ",
        ['user_id'=>$user->id]) ;
       
        return response()->json($freinds)  ;
    }

    public function addGroup(Request $request){

        $request->validate([
            'group_id'=>['required','exists:groups,id']
        ]);
        $group=Group::find($request->group_id) ;
        $user=Auth::user() ; 
        $realtion=Relation::where([['user_id','=',$user->id],
        ['relationable_type','=','App\Models\Group'],['relationable_id','=',$group->id]]
        )->get() ;
        
        if($realtion->count()==0){
            $user->groups()->attach($request->group_id,['status'=>'not_confirm']) ;
            return response()->json($group) ;
        }
        return response()->json(null,403) ;  
    }

    public function confirmGroup(Request $request,Relation $relation){
        $request->validate([
            'response'=>['required','boolean'] ,
        ]);
        $authUser=Auth::user() ;
        
        $groups=Relation::where([['user_id','=',$authUser->id],
                                   ['relationable_type','=','App\Models\Group'],
                                   ['status','=','admin']])->pluck('relationable_id');
         //check if the auth user is admin in the group 
        if($groups->contains($relation->relationable_id)){
            $relation->update(['status'=>$request->response==1 ?"accpted":"rejected"]) ;
            return response()->json($relation) ;
        }
        return response()->json(null,403) ;
    }

    public function frindeRequest(){
        $user=Auth::user() ;
        $freinds= DB::select("
        SELECT users.id ,users.name ,relation_id
        from users JOIN 
        (  
        SELECT relation.relationable_id as freinde_id , relation.id as relation_id

        from relation 
        WHERE relationable_type='App\Models\User' and relation.status = 'not_confirm'
        and (relation.user_id = :user_id))
        on users.id=freinde_id ",
        ['user_id'=>$user->id]) ;
       
        return response()->json($freinds)  ;
    } 

}
