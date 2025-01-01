'use clinet'
import axiosClient from '../axiosClient'
import { getToken } from '../helpers'
import { useState,useMemo } from 'react';

function UserContainer({user}) {
  const [isAdded,setAdded]=useState(false) ;
  const token=getToken() ;
  async function addFreind(){
    try{
      const response=await axiosClient.post('/api/addFreind',
      {
        "user_id":user.id ,
      },{
        headers:{
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })
      setAdded(true) ;

    }catch(err){
      window.alert(err) ;
    }     
  }
  const randomNumber=useMemo(()=> Math.floor(Math.random() * (100 )) + 1,[])
   

  return (
    <div className="flex justify-between items-center cursor-pointer p-3 hover:bg-gray-800 rounded-lg relative">
      <div className="w-16 h-16 relative flex flex-shrink-0">
          <img className="shadow-md rounded-full w-full h-full object-cover"
            src={`https://randomuser.me/api/portraits/men/${randomNumber}.jpg`}
            alt=""
          />

      </div>
      <div className="flex-auto min-w-0 ml-4 mr-6  block">
          <p className="font-bold text-gray-200">{user?.name}</p>
      </div>
      {!isAdded ? <button onClick={()=>addFreind()} className='text-gray-200 mx-4  px-3 hover:shadow-md transition-colors rounded-md py-2 bg-gray-900 font-semibold'>+Add</button> :
      <button className='text-gray-200 mx-4  px-3 hover:shadow-md transition-colors rounded-md py-2 bg-gray-900 font-semibold'>Added</button>}
    </div>
  )
}

export default UserContainer