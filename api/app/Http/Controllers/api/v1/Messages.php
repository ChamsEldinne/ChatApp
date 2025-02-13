<?php

namespace App\Http\Controllers\api\v1;

use App\Http\Controllers\Controller;
use App\Http\Resources\api\v1\MessagesResource;
use App\Models\Message;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB ;


class Messages extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function frinde(Request $request)
    {
        $request->validate([
            'reciver_id'=>['required'] ,
        ]);
        $user=Auth::user() ;

        $messages=collect() ;
        $reciver=collect() ;

        $messages = Message::where('messageable_type', '=','App\Models\User')
        ->where(function ($query)use($user,$request) {
            $query->where(function ($subQuery)use($user,$request) {
                $subQuery->where('messageable_id', $user->id)
                            ->where('user_id', $request->reciver_id);
            })->orWhere(function ($subQuery)use($user,$request) {
                $subQuery->where('messageable_id', $request->reciver_id)
                            ->where('user_id', $user->id);
            });
        })
        ->orderBy('created_at', 'desc') 
        ->paginate(20);
        
        return response()->json( [
            'messages'=>MessagesResource::collection($messages) ,
            'pagination' => [
                'current_page' => $messages->currentPage(),
                'last_page' => $messages->lastPage(),
                'per_page' => $messages->perPage(),
                'total' => $messages->total(),
                'next_page_url' => $messages->nextPageUrl(),
                'prev_page_url' => $messages->previousPageUrl(),
            ],
        ]);  
    }


    public function group(Request $request){

        $request->validate([
            'reciver_id'=>['required'] ,
        ]);
        $messages=collect() ;
        $reciver=collect() ;
       
        $messages = Message::join('users', function ($join)use($request) {
            $join->on('messages.user_id', '=', 'users.id')
                ->on('messages.messageable_type', '=', DB::raw("'App\\Models\\Group'")) // Use DB::raw for literal strings
                ->on('messages.messageable_id', '=', DB::raw($request->reciver_id));
        })
        ->select(
            "messages.*" ,"users.name"
        )
        ->orderBy('created_at', 'desc') 
        ->paginate(20);


        $reciver=DB::select("SELECT groups.id , groups.name 
        from groups 
        where groups.id=:group_id",
        ["group_id"=>$request->reciver_id]) ;

      //  

        return response()->json( [
            'reciver'=>$reciver ,
            'messages'=>MessagesResource::collection($messages) ,
            'pagination' => [
                'current_page' => $messages->currentPage(),
                'last_page' => $messages->lastPage(),
                'per_page' => $messages->perPage(),
                'total' => $messages->total(),
                'next_page_url' => $messages->nextPageUrl(),
                'prev_page_url' => $messages->previousPageUrl(),
            ],
        ]);

    }

    public function reciver(Request $request){
        $request->validate([
            'reciver_id'=>['required','integer'] ,
            "type"=>["required","string","in:user,group"] ,
        ]);
        
        $reciver=null ;
        if($request->type=="user"){
            $reciver=DB::select("
            SELECT users.id ,users.name ,MAX( personal_access_tokens.last_used_at ) as last_used_at ,
                CASE 
                    WHEN personal_access_tokens.last_used_at > DATETIME('now', '-2 minutes') THEN 1
                    ELSE 0
                END AS is_online
            from users , personal_access_tokens 
            where  personal_access_tokens.tokenable_id= :user_id and users.id= :user_id and personal_access_tokens.tokenable_type='App\Models\User' 
            ",["user_id"=>$request->reciver_id]) ;
            $reciver[0]->type='user' ;
        }else if($request->type=="group"){
            $reciver=DB::select("SELECT groups.id , groups.name 
            from groups 
            where groups.id=:group_id",
            ["group_id"=>$request->reciver_id]) ;
            $reciver[0]->type='group' ;
        }
        
        return response()->json(['reciver'=>$reciver]) ;
 
    }
}
