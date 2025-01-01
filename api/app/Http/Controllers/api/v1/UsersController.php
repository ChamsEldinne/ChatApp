<?php

namespace App\Http\Controllers\api\v1;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;

class UsersController extends Controller
{
    public function index(){

        $userId=auth()->user()->id ;
        // $perPage=10 ;
        // $page = request('page', 1); 
        // $offset = ($page - 1) * $perPage;
        $results = DB::select("
             SELECT name ,id
                from users
                where users.id!= :user_id and users.id not in ( SELECT   (CASE 
                            WHEN user_id = :user_id  THEN relationable_id
                            ELSE user_id
                        END) as freinde_id 

                from relation 
                WHERE relationable_type='App\Models\User' and (relation.user_id= :user_id or relation.relationable_id= :user_id))
    
                ", [
        'user_id' => $userId,
        // 'limit' => $perPage,
        // 'offset' => $offset,
        ]);
        // $res=DB::select("
        // select count (*) as total_count 
        // from users
        // where users.id!= :user_id and users.id not in(
        //  SELECT  (CASE 
        //         WHEN user_id = :user_id  THEN relationable_id
        //         ELSE user_id
        //     END) as total_count 

        // from relation 
        // WHERE relationable_type='App\Models\User' and (relation.user_id= :user_id or relation.relationable_id= :user_id))",


        //     ['user_id'=>$userId]) ;
     //   $total=$res[0]->total_count ;
        $pagination = [
            // 'current_page' => $page,
            // 'per_page' => $perPage,
          //  'total' => $total,
          // 'last_page' => ceil($total / $perPage),
            'data' => $results,
        ];
        return response()->json($pagination);
    }
}
