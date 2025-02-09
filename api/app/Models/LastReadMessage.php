<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class LastReadMessage extends Model
{
    protected $fillable = [
        'user_id',
        'relation_id',
        'message_id' ,
        "password"
    ];
    protected $table ='last_read_message';

}
