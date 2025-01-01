<?php

use App\Http\Controllers\api\v1\ActiveFrindesController;
use App\Http\Controllers\api\v1\GetMessages;
use App\Http\Controllers\api\v1\GroupController;
use App\Http\Controllers\api\v1\AuthController;
use App\Http\Controllers\api\v1\MessagesController;
use App\Http\Controllers\api\v1\UsersController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\api\v1\RelationsController;
use App\Http\Controllers\api\v1\GetMessanger ;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::post('/register',[AuthController::class,'register']) ;
Route::post('/login',[AuthController::class,'login']) ;
Route::post('/logout',[AuthController::class,'logout'])->middleware(['auth:sanctum']) ;


Route::apiResource('/group',GroupController::class)->middleware(['auth:sanctum']) ;


Route::group(['middleware'=>['auth:sanctum']],function(){

    Route::post('/addFreind',[RelationsController::class, "addFriend"]) ;
    Route::put('/cofirmFriend/{relation}',[RelationsController::class,'cofirmFriend']) ;
    Route::get('/freindes',[RelationsController::class,"freindes"]) ;
    Route::get('/frindeRequest',[RelationsController::class,'frindeRequest']) ;
    Route::post('/addGroup',[RelationsController::class,"addGroup"]) ;
    Route::put('/confirmGroup/{relation}',[RelationsController::class,"confirmGroup"]) ;
    Route::apiResource('/message',MessagesController::class)->except('index') ;
    Route::get('/getMessages',GetMessages::class) ;
    Route::get('/getMessanger',GetMessanger::class) ;
    Route::get('/users',[UsersController::class,'index']) ;

    Route::get('/activeFrindes',ActiveFrindesController::class) ;


});
