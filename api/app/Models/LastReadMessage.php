<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class LastReadMessage extends Model
{
    protected $fillable = [
        'user_id',
        "messageable_type",
        'message_id' ,
        "messageable_id" ,
    ];
    protected $table ='last_read_message';

   public function groups(){
    return $this->morphedByMany(Group::class,"messageable") ;
   }
   public function user(){
    return $this->morphedByMany(User::class,"messageable") ;
   }
}
