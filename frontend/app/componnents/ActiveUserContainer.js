'use client'
import { useMemo } from "react";

function ActiveUserContainer({user=null,setDisplayedContact}){
    const randomNumber=useMemo(()=> Math.floor(Math.random() * (100 )) + 1,[])
  
    return (
      <div className="text-sm text-center mr-2 cursor-pointer hover:opacity-80 transition-opacity"
       onClick={()=>{setDisplayedContact({reciver_id:user?.id,group_or_friend:1})} }>
        <div className="p-1 border-4 border-transparent rounded-full">
          <div className="w-16 h-16 relative flex flex-shrink-0">
            <img className="shadow-md rounded-full w-full h-full object-cover"
                src={`https://randomuser.me/api/portraits/men/${randomNumber}.jpg`}
                alt=""
            />
         {user?.is_online==1 && 
           <div className="absolute bg-gray-900 p-1 rounded-full bottom-0 right-0">
                <div className="bg-green-500 rounded-full w-3 h-3"></div>
            </div>
          }
          </div>
        </div>
        <p>{user?.name}</p>
       </div>
    )
}

export default ActiveUserContainer ;