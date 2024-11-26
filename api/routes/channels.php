<?php

use Illuminate\Support\Facades\Broadcast;

Broadcast::channel('Chat', function ($user) {
    // 
});

Broadcast::channel('App.Models.User.{id}', function ($user, $id) {
    return (int) $user->id === (int) $id;
});
