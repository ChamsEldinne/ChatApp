'use client'
import axiosClient from '../axiosClient'
import { getToken } from '../helpers'
import { useState ,useMemo} from 'react';
function FrindeRequestContainer({user=null}) {
    
    const randomNumber=useMemo(()=> Math.floor(Math.random() * (100 )) + 1,[])
    const [isRequested,setIsRequested]=useState(false) ;
    async function cofirmFriend(bool){
        const token=getToken() ;
        try{
            const response=await axiosClient.put(`/api/cofirmFriend/${user.relation_id}`,{
                'response':bool,
            },{
                headers:{
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            })
            setIsRequested(true) ;
            console.log(response) ;
        }catch(err){
            window.alert(err)
        }
    }

  return (
    <div className="flex justify-between items-center cursor-pointer p-3 hover:bg-gray-800 rounded-lg relative">
        <div className='flex gap-2 items-center'>
            <div className="w-16 h-16 relative flex flex-shrink-0">
                <img className="shadow-md rounded-full w-full h-full object-cover"
                    src={`https://randomuser.me/api/portraits/men/${randomNumber}.jpg`}
                    alt="Not Founde"
                />
          
            </div>
            <div className="flex-auto min-w-0 ml-4 mr-6  block">
                <p className="font-bold text-gray-200">{user?.name}</p>
            </div>
        </div>
         {isRequested ?<div></div> :
            <div className='flex items-center gap-0'>
                <button onClick={()=>cofirmFriend(1)} className='text-gray-200 mx-4  px-3 hover:shadow-md transition-colors rounded-md py-2 bg-blue-500 font-semibold'>Accept</button>
                <button onClick={()=>cofirmFriend(0)} className='text-gray-200 mx-4 bg-gray-500 px-3 hover:shadow-md transition-colors rounded-md py-2  font-semibold'>Reject</button>
            </div>
         }

    </div>
  )
}

export default FrindeRequestContainer