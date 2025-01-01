<?php

namespace App\Http\Controllers\api\v1;

use App\Http\Controllers\Controller;
use App\Http\Resources\api\v1\MessagesResource;
use App\Models\Message;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB ;


class GetMessages extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        $request->validate([
            'group_or_friend'=>['required','boolean'] ,//1 user,0 group 
            'reciver_id'=>['required'] ,
        ]);
        $user=Auth::user() ;

        $messages = Message::where('messageable_type', $request->group_or_friend?'App\Models\User':"App\Models\Group")
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
        $reciver=DB::select("
        SELECT users.id ,users.name ,personal_access_tokens.last_used_at ,
            CASE 
                WHEN personal_access_tokens.last_used_at > DATETIME('now', '-2 minutes') THEN 1
                ELSE 0
            END AS is_online
        from users , personal_access_tokens 
        where  personal_access_tokens.tokenable_id= :user_id and users.id= :user_id and personal_access_tokens.tokenable_type='App\Models\User' 
        ",["user_id"=>$request->reciver_id]) ;
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
}
