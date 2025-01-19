'use client'
import { useMemo } from "react";
import { formateMinutes, getDifrnecInMinuts } from "../helpers";
import Link from "next/link";

function ActiveUserContainer ({user=null,}) {
  const randomNumber=useMemo(()=> Math.floor(Math.random() * (100 )) + 1,[])
   
  return (
    <Link href={`/chat/user/${user.id}`} className="text-sm text-center mr-2 cursor-pointer hover:opacity-80 transition-opacity">
      <div className="p-1 border-4 border-transparent rounded-full">
        <div className="w-16 h-16 relative flex flex-shrink-0">
          <img className="shadow-md rounded-full w-full h-full object-cover"
              src={`https://randomuser.me/api/portraits/men/${randomNumber}.jpg`}
              alt=""
          />
        {user?.is_online==1 ? 
          <div className="absolute bg-gray-900 p-1 rounded-full bottom-0 right-0">
              <div className="bg-green-500 rounded-full w-3 h-3"></div>
          </div> :
          <div className="absolute bg-gray-900 p-1 rounded-full bottom-0 right-0">
            <div className=" text-xs text-gray-200 rounded-full"> {formateMinutes( getDifrnecInMinuts( null,user?.last_used_at) )}</div>
          </div>
        }
        </div>
      </div>
      <p>{user?.name}</p>
    </Link>
  )
}

export default ActiveUserContainer ;