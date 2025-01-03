<?php

namespace App\Http\Middleware;

use Illuminate\Support\Facades\DB;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AcceptedInGroup
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user=$request->user() ;

        $group=DB::select("SELECT relation.*
        from relation 
        WHERE relationable_id= :group_id and user_id= :user_id and relationable_type='App\Models\Group'
        and (relation.status='admin' or relation.status='accpted') ",[
            'group_id'=>$request->reciver_id,
            'user_id'=>$user->id ,
        ]) ;
        if(count($group)==0){
            return response()->json(['message' => 'Unauthorized'], 403);
        }
        return $next($request);
    }
}
