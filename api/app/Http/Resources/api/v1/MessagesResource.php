<?php

namespace App\Http\Resources\api\v1;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class MessagesResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $user=Auth::user();
        return [
            'id'=>$this->id ,
            'message'=>$this->message,
            'time'=>$this->created_at,
            'reciv_or_sent'=>$this->user_id==$user->id? 1:0, //1 send ,0 reciv 
            'user_name'=>$this->name? $this->name:null,
            'user_id'=>$this->user_id ? $this->user_id:null
        ];
    }
}
