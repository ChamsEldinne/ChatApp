<?php

use App\Events\ExampleEvenet;
use App\Http\Controllers\api\v1\GetMessages;
use App\Http\Controllers\api\v1\GroupController;
use App\Http\Controllers\api\v1\AuthController;
use App\Http\Controllers\api\v1\MessagesController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\api\v1\FrindShipController;
use App\Http\Controllers\api\v1\GetMessanger ;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// Route::get('/broadcast',function(){
//     broadcast(new ExampleEvenet('dasdasdas')) ;
//     return response()->json(['fhjhh']) ;
// }) ;


Route::post('/register',[AuthController::class,'register']) ;
Route::post('/login',[AuthController::class,'login']) ;
Route::post('/logout',[AuthController::class,'logout'])->middleware(['auth:sanctum']) ;


Route::apiResource('/group',GroupController::class)->middleware(['auth:sanctum']) ;



Route::group(['middleware'=>['auth:sanctum']],function(){
    Route::post('/addFreind',[FrindShipController::class, "addFriend"]) ;
    Route::put('/cofirmFriend/{relation}',[FrindShipController::class,'cofirmFriend']) ;
    Route::get('/freindes',[FrindShipController::class,"freindes"]) ;
    Route::post('/addGroup',[FrindShipController::class,"addGroup"]) ;
    Route::put('/confirmGroup/{relation}',[FrindShipController::class,"confirmGroup"]) ;
    Route::apiResource('/message',MessagesController::class)->except('index') ;
    Route::get('/getMessages',GetMessages::class) ;
    Route::get('/getMessanger',GetMessanger::class) ;
});
