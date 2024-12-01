<?php

namespace App\Http\Controllers\api\v1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class GetMessanger extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        $userId = Auth::user()->id;
        $perPage = 10;
        $page = request('page', 1); 
        $offset = ($page - 1) * $perPage;
        $results = DB::select("
                        SELECT DISTINCT 
                    (CASE 
                        WHEN user_id = :user_id THEN messageable_id 
                        ELSE user_id
                    END) as freinde_id,
                    name as freinde_name,
                    message,
                    messageable_type,
                    Max(messages.created_at) as lates_message_date
                FROM messages
                JOIN users 
                    ON (CASE 
                        WHEN user_id = :user_id THEN messageable_id = users.id 
                        ELSE messages.user_id = users.id 
                    END)
                WHERE messages.messageable_type = 'App\\Models\\User'
                    AND (messages.user_id = :user_id OR messages.messageable_id = :user_id)
                GROUP BY freinde_id
                ORDER BY messages.created_at DESC
                LIMIT :limit OFFSET :offset;
        ", [
            'user_id' => $userId,
            'limit' => $perPage,
            'offset' => $offset,
        ]);

        $res = DB::select("
                    SELECT COUNT( DISTINCT 
                        CASE 
                            WHEN user_id = :user_id THEN messageable_id 
                            ELSE user_id 
                        END )AS freinde_count
                FROM messages
                WHERE messages.messageable_type = 'App\Models\User' 
                AND (messages.user_id = :user_id OR messages.messageable_id = :user_id)",
            ['user_id' => $userId]
        );
       $total = $res[0]->freinde_count;

        $pagination = [
            'current_page' => $page,
            'per_page' => $perPage,
            'total' => $total,
            'last_page' => ceil($total / $perPage),
            'data' => $results,
        ];
        return response()->json($pagination);
    }
}
