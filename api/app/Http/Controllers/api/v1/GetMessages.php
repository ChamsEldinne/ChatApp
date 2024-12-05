<?php

namespace App\Http\Controllers\api\v1;

use App\Http\Controllers\Controller;
use App\Http\Resources\api\v1\MessagesResource;
use App\Models\Message;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

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
        ->orderBy('created_at', 'desc') // Replace 'id' with 'created_at' if you want to sort by the latest creation date
        ->paginate(10);
        return response()->json( [
            'reciver'=>['name'=>User::find($request->reciver_id)->name] ,
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
