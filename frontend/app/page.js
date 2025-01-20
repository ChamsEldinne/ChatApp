'use client'
import { useEffect } from 'react'
import { getToken } from './helpers'
import { useRouter } from 'next/navigation'
import LoadingSpiner from './componnents/LoadingSpiner'
import axiosClient from './axiosClient'

import React from 'react'
function page() {
  const router=useRouter()
  const token=getToken() ;

  async function getUser(){
    try{
      const response=await axiosClient.get('/api/user',{
        headers:{
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })
      window.localStorage.setItem('user',JSON.stringify( response.data))
      router.push('/chat')
     }catch(err){
      if(err.status==401){
        router.push('/login')
      }else{
        window.alert(err) ;
      }   
     }
  }
  useEffect(()=>{
    if(token==null){
      router.push('/login')
    }
    getUser()

  },[])

  return (
    <div className='grid place-items-center bg-gray-900 w-full h-[98vh]'>
         <LoadingSpiner/>
    </div>
  )
}

export default page








