<?php
use App\Models\User ;
use Illuminate\Support\Facades\Broadcast;
use Illuminate\Support\Facades\DB ;

Broadcast::channel('chat.{id}', function ($user, $id) {
  return (int) $user->id === (int) $id;
});

Broadcast::channel('contact.{id}', function ($user, $id) {
  return (int) $user->id === (int) $id;
});


Broadcast::channel('group.{id}',function(User $user,$id){
    
  $group=DB::select("SELECT relation.*
  from relation 
  WHERE relationable_id= :group_id and user_id= :user_id and relationable_type='App\Models\Group'
  and (relation.status='admin' or relation.status='accpted') ",[
      'group_id'=>$id,
      'user_id'=>$user->id ,
  ]) ;

  return  !count($group)==0  ; 

}) ;


