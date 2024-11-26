<?php

namespace App\Http\Controllers\api\v1;

use App\Models\Message;
use App\Http\Controllers\Controller;
use App\Models\Relation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class MessagesController extends Controller
{


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $attributes = $request->validate([
            'message' => ['required'],
            'group_or_user' => ['required', 'boolean'], // 1 user ,0 group 
            'reciver_id' => ['required'],
        ]);
        $user = Auth::user();


        if ($attributes['group_or_user']) {
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
                $messge = Message::create([
                    'user_id' => $user->id,
                    'message' => $request->message,
                    'messageable_type' => 'App\Models\User',
                    'messageable_id' => $request->reciver_id
                ]);
                return response()->json($messge);
            }
            return response()->json(null, 403);
        }

        //check if the sender user are accpeted in the group 
        $relation = DB::table('relation')
            ->where('relationable_type', '=', 'App\Models\Group')
            ->where(function ($query) use ($user, $request) {
                $query->where('user_id', '=', $user->id)
                    ->where('relationable_id', '=', $request->reciver_id);
            })->where('status', '=', 'accpted')
            ->get();
        if ($relation->count() != 0) {
            $messge = Message::create([
                'user_id' => $user->id,
                'message' => $request->message,
                'messageable_type' => 'App\Models\Group',
                'messageable_id' => $request->reciver_id
            ]);
            return response()->json($messge);
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
            return response()->json($message);
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
