<?php

namespace App\Http\Controllers\api\v1;

use App\Models\LastReadMessage;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB ;
use Illuminate\Http\Request;
use App\Models\Message;
use App\Models\Relation;
class LastReadMessageController extends Controller
{

    /**
     * Store a newly created resource in storage.
     */
    public function updateOrCreate(Request $request)
    {
        $attributes= $request->validate([
            "reciver_id"=>['required','integer'] ,
            "type"=>["required","string","in:user,group"] ,
            "message_id"=>['required'] ,
        ]) ;
        $user=Auth::user() ;


        //get the relation id 
        $relation=DB::select("
        SELECT relation.*
        from relation 
        where ((user_id=:id1 and relationable_id=:id2 ) or (relationable_id=:id1 and user_id=:id2))
        and status in ('admin','accpted') and relationable_type=:type",[
            "id1"=>$attributes['reciver_id'] ,
            "id2"=>$user->id ,
            "type"=>$request->type=="group" ? "App\Models\Group" : "App\Models\User"
        ]);  
        
        // return $relation ;
        
        if(count( $relation)==0){
            return response()->json(null,403) ;
        }

        $r=$relation[0] ;

        $m=Message::findOrFail($attributes['message_id']) ;
            
        //check if message belong to one of them 
        if( ($m->user_id==$r->user_id || $m->user_id==$r->relationable_id ) ) {
            $lrm=LastReadMessage::updateOrCreate(
                ['user_id'=>$user->id,"messageable_id"=>$request->reciver_id,
                             "messageable_type"=>$m->messageable_type],[
                'user_id'=>$user->id,
                "messageable_id"=>$request->reciver_id,
                "messageable_type"=>$m->messageable_type ,
                "message_id"=>$request->message_id ,
            ]) ;
            return response()->json(['last_read_message'=>$lrm])  ;
        }
                
        
        
        return response()->json(null,403) ;            
    }

    public function show(Request $request){
        
        $attributes=$request->validate([
            "reciver_id"=>['required','integer'] ,
            "type"=>["required","string","in:user,group"] ,
        ]) ;  
        $reasult=collect() ;
        
        if($attributes["type"]=="user"){
            $user=Auth::user() ;
            $reasult=DB::select("SELECT  last_read_message.message_id ,
                json_group_array(json_object('id', user_id,'seen_at',updated_at )) AS user_ids  
                from last_read_message 
                where ((user_id=:id1 and messageable_id=:id2 ) or (user_id=:id2 and messageable_id=:id1 ))
             and messageable_type='App\Models\User' 
             group by message_id ", 
             ["id1"=>$user->id,"id2"=>$attributes["reciver_id"]]) ;

        }else if($attributes["type"]=="group"){
            $reasult=DB::select("SELECT  last_read_message.message_id ,
                json_group_array(json_object('id', user_id,'seen_at',updated_at )) AS user_ids  
                from last_read_message 
                where  messageable_id=:id1 and messageable_type='App\Models\Group' 
                group by message_id",
             ["id1"=>$attributes["reciver_id"]]) ;
        }

        foreach($reasult as $r){
            $r->user_ids=json_decode( $r->user_ids,true)  ;
        }
    
        return response()->json($reasult) ;
    }
}