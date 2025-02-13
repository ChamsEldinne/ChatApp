<?php

use App\Http\Controllers\api\v1\ActiveFrindesController;
use App\Http\Controllers\api\v1\Messages;
use App\Http\Controllers\api\v1\GroupController;
use App\Http\Controllers\api\v1\AuthController;
use App\Http\Controllers\api\v1\MessagesController;
use App\Http\Controllers\api\v1\UsersController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\api\v1\RelationsController;
use App\Http\Controllers\api\v1\Contact ;

use App\Http\Controllers\api\v1\LastReadMessageController;


use Illuminate\Support\Facades\DB ;


Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::group(['middelware'=>['VerifyCsrfToken']], function(){
    Route::post('/register',[AuthController::class,'register']) ;
    Route::post('/login',[AuthController::class,'login']) ;
}) ;

Route::post('/logout',[AuthController::class,'logout'])->middleware(['auth:sanctum']) ;


Route::group(['middleware'=>['auth:sanctum']],routes: function(){


    Route::apiResource('/group',GroupController::class) ;
    Route::post('/addFreind',[RelationsController::class, "addFriend"]) ;
    Route::put('/cofirmFriend/{relation}',[RelationsController::class,'cofirmFriend']) ;
    Route::get('/freindes',[RelationsController::class,"freindes"]) ;
    Route::get('/frindeRequest',[RelationsController::class,'frindeRequest']) ;
    Route::post('/addGroup',[RelationsController::class,"addGroup"]) ;
    Route::put('/confirmGroup/{relation}',[RelationsController::class,"confirmGroup"]) ;
    Route::apiResource('/message',MessagesController::class)->except(['index','store']) ;
    
    Route::post('/sendeMessage/frinde',[MessagesController::class,'frinde']);
    Route::post('/sendeMessage/group',[MessagesController::class,'group'])->middleware('AcceptedInGroup') ;


    Route::get('/messages/frinde',[Messages::class,'frinde']) ;
    Route::get('/messages/group',[Messages::class,'group'])->middleware('AcceptedInGroup') ;

    Route::get('/contact/frindes',[Contact::class,'frindes']) ;
    Route::get('/contact/groups',[Contact::class,'groups']) ;

    Route::get('/users',[UsersController::class,'index']) ;
    Route::get('/activeFrindes',ActiveFrindesController::class) ;
    
    Route::get('/messages/reciver',[Messages::class,'reciver']) ;


    Route::post('/lastReadMessage',[LastReadMessageController::class,"updateOrCreate"]) ;
    Route::get('/lastReadMessage',[LastReadMessageController::class,"show"]) ;

});
