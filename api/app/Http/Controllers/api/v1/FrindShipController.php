<?php

namespace App\Http\Controllers\api\v1;

use App\Http\Controllers\Controller;
use App\Models\Group;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use App\Models\Relation ;
class FrindShipController extends Controller
{
    public function addFriend(Request $request){
        $request->validate([
         "user_id"=>['required','exists:users,id'] ,
        ]);
        $user=Auth::user();
        $relation= DB::table('relation')
        ->where('relationable_type','=','App\Models\User')
        ->where(function ($query)use($user,$request) {
            $query->where('user_id', '=', $user->id)
                  ->where('relationable_id', '=', $request->user_id);
        })
        ->orWhere(function ($query)use($user,$request) {
            $query->where('user_id', '=', $request->user_id)
                  ->where('relationable_id', '=', $user->id);
        })
        ->get();
        if($user->id==$request->user_id ||$relation->count()!=0){
            return response()->json(null,403) ;
        }
        $user->sendedUsers()->attach($request->user_id,['status'=>'not_confirm']);
        $user->recivedUsers;
        $user->sendedUsers ;
        return response()->json(['user'=>$user] ) ;
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
        $freinds= DB::table('relation')
        ->where('relationable_type','=','App\Models\User')
        ->where(function ($query)use($user) {
            $query->where('user_id', '=', $user->id) ;
        })
        ->orWhere(function ($query)use($user) {
                 $query->where('relationable_id', '=', $user->id);
        })
        ->where('status','=','accpted')
        ->get();
        
        return response()->json($freinds ) ;
    }

    public function addGroup(Request $request){

        $request->validate([
            'group_id'=>['required','exists:groups,id']
        ]);
        $group=Group::find($request->group_id) ;
        $user=Auth::user() ; 
        $realtion=Relation::where([['user_id','=',$user->id],
        ['relationable_type','=','App\Models\Group']]
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

}
