<?php

namespace App\Http\Controllers\api\v1;

use App\Events\MessageEvent;
use App\Http\Resources\api\v1\MessagesResource;
use App\Models\Message;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use App\Models\Relation ;
class MessagesController extends Controller
{
    public function show(Message $message){
        return  new MessagesResource($message) ;
    }

    /**
     * Store a newly created resource in storage.
     */
    public function frinde(Request $request)
    {
        $request->validate([
            'message' => ['required'],
            'reciver_id' => ['required'],
        ]);
        $user = Auth::user();
        $relation = collect();

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
   
        if ($relation->count() != 0) {
            
            $message = Message::create([
                'user_id' => $user->id,
                'message' => $request->message,
                'messageable_type' =>"App\Models\User" ,
                'messageable_id' => $request->reciver_id
            ]);

            $userIds=[$request->reciver_id,$user->id] ;

            broadcast(new MessageEvent($message,$userIds)) ;
            return new MessagesResource($message) ;
        }

        return response()->json(null, 403);
    }


    public function group(Request $request){

        $request->validate([
            'message' => ['required'],
            'reciver_id' => ['required'],
        ]);

        $user = Auth::user();

        $message = Message::create([
            'user_id' => $user->id,
            'message' => $request->message,
            'messageable_type' => $request->group_or_friend ? "App\Models\User" : 'App\Models\Group',
            'messageable_id' => $request->reciver_id
        ]);

        $userIds = Relation::where('relationable_id', $request->reciver_id)
        ->where('relationable_type', 'App\Models\Group')
        ->whereIn('status', ['admin', 'accpted'])
        ->pluck('user_id');

        broadcast(new MessageEvent($message,$userIds)) ;
        return new MessagesResource($message) ;
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
