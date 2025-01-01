'use client'
import { useState,useEffect } from 'react';
import React from 'react'
import { getToken } from '@/app/helpers';
import FrindeContainer from '@/app/componnents/FrindeContainer';
import axiosClient from '@/app/axiosClient';
function page() {
    const [loading,setLoading]=useState(false)
    const [freindes,setFriends]=useState([])
    const token=getToken() ;
    useEffect(()=>{
      const fetchData= async()=>{
        try{
          setLoading(true)
          const response=await axiosClient.get('/api/freindes',{
            headers:{
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          }) ;
          setFriends(response.data)
    
        }catch(err){
          window.alert(err.status) ;
        }finally{
          setLoading(false)
        }
      }
      fetchData()
    },[])

  
    return (
      <div class='flex justify-start items-center bg-transparent gap-4  h-full w-full z-10'>
        <div className='w-full md:w-1/3 min-w-fit h-[90%] overflow-y-auto rounded-md '>
            <h1 className='text-xl font-semibold text-gary-200 py-2 sticky top-0 px-3 w-full bg-gray-900 text-gray-200 z-10'>Freindes </h1>
            {loading? <div className='text-gray-200 font-semibold px-3'> Loading...</div> : freindes.map((user)=><FrindeContainer setFriends={setFriends} user={user} />)}   
        </div>
      </div>
    )
  
}

export default page