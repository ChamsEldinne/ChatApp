<?php

namespace App\Http\Controllers\api\v1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class ActiveFrindesController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        $user=Auth::user() ;
        $freinds= DB::select("
            SELECT users.id ,users.name ,personal_access_tokens.last_used_at ,
                CASE 
                    WHEN personal_access_tokens.last_used_at > DATETIME('now', '-2 minutes') THEN 1
                    ELSE 0
                END AS is_online
            from users JOIN
            (
            SELECT  (CASE 
                        WHEN user_id = :user_id  THEN relationable_id
                        ELSE user_id
                    END) as frinde_id 
                    
            from relation 
            WHERE   (relation.user_id= :user_id or relation.relationable_id= :user_id ) and relation.status='accpted' and relationable_type='App\Models\User' ) join personal_access_tokens 
            on users.id=frinde_id and personal_access_tokens.tokenable_id=users.id and personal_access_tokens.tokenable_type='App\Models\User' 
            ORDER by  personal_access_tokens.last_used_at DESC",
        ['user_id'=>$user->id]) ;
        return response()->json($freinds) ;
    }
}
