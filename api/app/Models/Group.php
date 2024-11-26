<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Group extends Model
{
    protected $guarded=[] ;
    public $timestamps = false;

    public function messages()
    {
        return $this->morphMany(Message::class, 'messageable');
    }
    public function members(){
        return $this->users()->wherePivot('status', 'accepted') ;
    }
    public function admins(){
        return $this->users()->wherePivot('status', 'admin') ;
    }
    public function users(){
        return $this->morphToMany(User::class,'relationable','relation')->withPivot('status'); 
    }
}
