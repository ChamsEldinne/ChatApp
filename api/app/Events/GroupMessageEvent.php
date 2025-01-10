<?php

namespace App\Events;

use App\Models\Message;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class GroupMessageEvent implements ShouldBroadcast 
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
            new PrivateChannel("group.{$this->message->messageable_id}"),
        ];
    }


    public function broadcastWith(){
        return [
            "message"=>[
                'id'=>$this->message->id ,
                'message'=>$this->message->message,
                'time'=>$this->message->created_at,
                "user_id"=>$this->message->user_id ,
                'reciv_or_sent'=>0, //1 send ,0 reci
                "messageable_id"=>$this->message->messageable_id,
                "messsageble_type"=>$this->message->messageable_type ,
            ]
        ];
    }
}
