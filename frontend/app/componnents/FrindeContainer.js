'use client'
import { useState,useMemo } from 'react';
import { getToken } from '../helpers';
import axiosClient from '../axiosClient';

function FrindeContainer({user}) {
    const [isRemoved,setIsRemoved]=useState(false) ;
    const randomNumber=useMemo(()=> Math.floor(Math.random() * (100 )) + 1,[])

    async function removeFrinde() {
        const token=getToken() ;
        try{
            await axiosClient.delete(`/api/${user.relation_id}`,
            {
              headers:{
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
              }  
            })
            setIsRemoved(true) ;
        }catch(err){
            window.alert(err) ;
        }
    }
    
    return (
    <div className="flex justify-between min-w-fit items-center cursor-pointer p-3 hover:bg-gray-800 rounded-lg relative">
        <div className="size-16 relative flex flex-shrink-0">
            <img className="shadow-md rounded-full w-full h-full object-cover"
                    src={`https://randomuser.me/api/portraits/men/${randomNumber}.jpg`}
                    alt=""
            />
        
        </div>
        <div className="flex-auto min-w-0 ml-4 mr-6 text-nowrap  block">
            <p className="font-bold text-gray-200">{user?.name}</p>
        </div>
        { 
            isRemoved ? <div></div>:
            <button onClick={()=>removeFrinde()} className='text-gray-200 mx-4  px-3 hover:shadow-md transition-colors rounded-md py-2 bg-red-500 font-semibold'>Remove</button>
        }
   </div>)
}

export default FrindeContainer