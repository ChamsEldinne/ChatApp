<?php

use Illuminate\Support\Facades\Route;
use App\Events\ExampleEvenet;


Route::get('/', function () {
    return view('welcome');
});
