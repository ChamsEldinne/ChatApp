<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Support\Facades\DB;



class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable,HasApiTokens;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'is_active' ,
        "password"
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function messages()
    {
        return $this->morphMany(Message::class, 'messageable');
    }
    public function recivedUsers(){
        return $this->morphedByMany(User::class,'relationable','relation')->withPivot('status');
    }

    public function groups(){
        return $this->morphedByMany(Group::class,'relationable','relation') ;
      //  ->withPivot('status')
    }

    public function freindes(){
        return DB::table('relation')
        ->where('relationable_type','=','App\Models\User')
        ->where(function ($query) {
            $query->where('user_id', '=', $this->id) ;
        })
        ->orWhere(function ($query) {
                 $query->where('relationable_id', '=', $this->id);
        })
        ->where('status','=','accpted')
        ->get();
    }

    
    public function sendedUsers(){
        return $this->morphToMany(User::class,'relationable','relation')->withPivot('status') ;
    }
  
}
