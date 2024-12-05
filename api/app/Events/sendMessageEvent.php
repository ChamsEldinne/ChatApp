<?php

namespace App\Events;

use App\Http\Resources\api\v1\MessagesResource;
use App\Models\Message;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Auth;

class sendMessageEvent implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    /**
     * Create a new event instance.
     */
    public function __construct(public Message $message)
    {
        //
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return array<int, \Illuminate\Broadcasting\Channel>
     */
    public function broadcastOn(): array
    {
        return [
            new Channel('chat'),
        ];
    }

    public function broadcastWith(){
       // $user=Auth::user();
        return [
            "message"=>[
                'id'=>$this->message->id ,
                'message'=>$this->message->message,
                'time'=>$this->message->created_at,
                "user_id"=>$this->message->user_id ,
                // 'reciv_or_sent'=>$this->message->user_id==$user->id? 1:0, //1 send ,0 reci
            ]
        ];
    }
}
