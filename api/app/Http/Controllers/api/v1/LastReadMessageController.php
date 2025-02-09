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
            "relation_id"=>['required'] ,
            "message_id"=>['required'] ,
        ]);
        $user=Auth::user() ;

        $r= Relation::findOrFail($request->relation_id) ; 

        $m=Message::findOrFail($attributes['message_id']) ;


        if (($r->user_id==$user->id ||
          ( $r->relationable_type=="App\Models\User" && $r->relationable_id==$user->id) )&&
          ($r->status=="admin" || $r->status=="accpted") ){

            
            if( ($m->user_id==$r->user_id && $m->messageable_id==$r->relationable_id) ||
                ($m->user_id==$r->relationable_id && $m->messageable_id==$r->user_id ) ) {

                $attributes["user_id"]=$user->id ;
                $lrm=LastReadMessage::updateOrCreate(['relation_id'=>$request->relation_id,'user_id'=>$user->id],$attributes) ;
                return response()->json(['last_read_message'=>$lrm])  ;
            }
                    
        }
        
        return response()->json(null,403) ;            
    }

    public function show(Request $request){
        $request->validate([
            "relation_id"=>['required','exists:relation,id'] ,
        ]);
         
        $resault=DB::
        select("SELECT 
            message_id ,
            json_group_array(json_object('id', user_id)) AS user_ids  
            FROM last_read_message
            WHERE relation_id = :relation_id
            GROUP BY message_id",
        ['relation_id'=>$request->relation_id]) ;

        foreach($resault as $r){
            $r->user_ids=json_decode( $r->user_ids,true)  ;
        }
    
        return response()->json($resault) ;
    }


    public function relation(Request $request){
        $attributes=$request->validate([
            "reciver_id"=>['required','integer'] ,
            "type"=>["required","string","in:user,group"] ,
        ]) ;
        $user=Auth::user() ;

        $relation=DB::select("
        SELECT relation.*
        from relation 
        where ((user_id=:id1 and relationable_id=:id2 ) or (relationable_id=:id1 and user_id=:id2))
        and status in ('admin','accpted') and relationable_type=:type",[
            "id1"=>$attributes['reciver_id'] ,
            "id2"=>$user->id ,
            "type"=>$request->type=="group" ? "App\Models\Group" : "App\Models\User"
        ]);
        if(count( $relation)>=1){
            return response()->json(['relation'=>$relation[0]]) ;
        }

        return response()->json(null,403) ;

    }


}