<?php

namespace App\Http\Controllers\api\v1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use App\Models\User ;

class AuthController extends Controller
{
    public function register(Request $request)
    { 

        $attributes=$request->validate([
            'name'=>['required','unique:users,name'] ,
            'email'=>['required','email','unique:users,email'] ,
            'password'=>['required','confirmed'] ,
        ]) ;
        $user = User::create($attributes);
        
        $token = $user->createToken($user->name,['user']);
        return ['user' => $user, 'token' => $token->plainTextToken];
    }
    public function login(Request $request)
    {
        $request->validate([
            'email'=>['required','email'] ,
            'password'=>['required'] ,
        ]) ;

        $user = User::where('email', $request->email)->first();
        if (!Hash::check($request->password, $user->password)) {
            return  response()->json(['errors'=>['password'=>'the password is incoreccet']], 401);
        }

        $token =$user->is_admin?  $user->createToken($user->email,['admin']):
                                  $user->createToken($user->email,['user']);
        return ['user' => $user, 'token' => $token->plainTextToken];
    }

    public function logout()
    {
        Auth::user()->tokens()->delete();
        return response()->json(['message' => "scssufuly loged out"]);
    }
}
