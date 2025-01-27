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
    public function __construct(public Message $message,public $members)
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
      //  $arr=[new PrivateChannel("group.{$this->message->messageable_id}")] ;
       $arr=[] ;
        foreach($this->members as $member){
            array_push($arr,new PrivateChannel("chat.{$member->user_id}") ) ;
        }
        return $arr ;
    }

    


    public function broadcastWith(){
        return [
            "message"=>[
                'id'=>$this->message->id ,
                'message'=>$this->message->message,
                'time'=>$this->message->created_at,
                "user_id"=>$this->message->user_id ,
                "messageable_id"=>$this->message->messageable_id,
                "messsageble_type"=>$this->message->messageable_type ,
            ]
        ];
    }
}
