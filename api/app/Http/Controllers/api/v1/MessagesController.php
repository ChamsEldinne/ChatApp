<?php

namespace App\Http\Controllers\api\v1;

use App\Events\MessageSentEvent;
use App\Http\Resources\api\v1\MessagesResource;
use App\Models\Message;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use App\Events\sendMessageEvent ;

class MessagesController extends Controller
{
    public function show(Message $message){
        return  new MessagesResource($message) ;
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $attributes = $request->validate([
            'message' => ['required'],
            'group_or_friend' => ['required', 'boolean'], // 1 user ,0 group 
            'reciver_id' => ['required'],
        ]);
        $user = Auth::user();
        $relation = collect();
        //can't send message to not firnd user and can send message to himself ;
        if ($attributes['group_or_friend']) {
            //check if the reciver user and the sender user are friend
            $relation = DB::table('relation')
                ->where('relationable_type', '=', 'App\Models\User')
                ->where(function ($query) use ($user, $request) {
                    $query->where('user_id', '=', $user->id)
                        ->where('relationable_id', '=', $request->reciver_id);
                })
                ->orWhere(function ($query) use ($user, $request) {
                    $query->where('user_id', '=', $request->reciver_id)
                        ->where('relationable_id', '=', $user->id);
                })->where('status', '=', 'accpted')
                ->get();
        } else {
            //check if the sender user are accpeted in the group 
            $relation = DB::table('relation')
                ->where('relationable_type', '=', 'App\Models\Group')
                ->where(function ($query) use ($user, $request) {
                    $query->where('user_id', '=', $user->id)
                        ->where('relationable_id', '=', $request->reciver_id);
                })->where('status', '=', 'accpted')
                ->get();
        }
        if ($relation->count() != 0) {
            
            $message = Message::create([
                'user_id' => $user->id,
                'message' => $request->message,
                'messageable_type' => $request->group_or_friend ? "App\Models\User" : 'App\Models\Group',
                'messageable_id' => $request->reciver_id
            ]);
           // sendMessageEvent::dispatch($message) ;
          //  broadcast(new sendMessageEvent($message))   ;
          broadcast(new MessageSentEvent($message)) ;
            return new MessagesResource($message) ;
        }


        return response()->json(null, 403);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Message $message)
    {
        $request->validate([
            "message" => ['required'],
        ]);
        $user = Auth::user();
        if ($user->id == $message->user_id) {
            $message->update(["message" => $request->message]);
            return new MessagesResource($message) ;
        }
        return response()->json(null, 403);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Message $message)
    {
        $user = Auth::user();
        if ($user->id == $message->user_id) {
            $message->delete();
            return response()->json("deleted");
        }
        return response()->json(null, 403);
    }
}
