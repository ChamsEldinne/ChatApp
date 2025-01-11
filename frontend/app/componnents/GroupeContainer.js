import React from 'react'
import { useState,useEffect } from 'react';
import axiosClient from '../axiosClient';
import { getToken } from '../helpers';

function GroupeContainer({group}) {
    const [isAdded,setAdded]=useState(false) ;

    async function addGroup() {
        const token=getToken() 
        try{
            await axiosClient.post(`/api/addGroup`,
                                    {
                                        group_id:group.id 
                                    },
                                    {
                                        headers:{
                                            'Authorization': `Bearer ${token}`,
                                            'Content-Type': 'application/json'
                                        }  
                                    }
                                    )
            setAdded(true);
        }catch(err){
            window.alert(err) ;
        }
    }
    
    return (
    <div className="flex justify-between min-w-fit items-center cursor-pointer p-3 hover:bg-gray-800 rounded-lg relative">
        <div className="w-16 h-16 relative flex flex-shrink-0">
            <img className="shadow-md rounded-full w-10 h-10 object-cover absolute ml-6"
                  src="https://randomuser.me/api/portraits/men/22.jpg"
                  alt="User2"
            />
            <img className="shadow-md rounded-full w-10 h-10 object-cover absolute mt-6"
                  src="https://randomuser.me/api/portraits/men/55.jpg"
                  alt="User2"
            />
            <div className="absolute bg-gray-900 p-1 rounded-full bottom-0 right-0">
                <div className="bg-green-500 rounded-full w-3 h-3"></div>
            </div>
        </div>
        <div className="flex-auto min-w-0 ml-4 mr-6 text-nowrap  block">
            <p className="font-bold text-gray-200">{group?.name}</p>
        </div>
        {!isAdded ? <button onClick={()=>addGroup()} className='text-gray-200 mx-4  px-3 hover:shadow-md transition-colors rounded-md py-2 bg-gray-900 font-semibold'>+Add</button> :
      <button className='text-gray-200 mx-4  px-3 hover:shadow-md transition-colors rounded-md py-2 bg-gray-900 font-semibold'>Added</button>}
   
   </div>)
}

export default GroupeContainer