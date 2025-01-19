'use client'
import React from 'react'
import ChatFooter from '../../../componnents/ChatFooter'
import ChatHeader from '../../../componnents/ChatHeader'
import ChatBody from '../../../componnents/ChatBody'
import { useState,useEffect } from 'react'
import { getToken } from '../../../helpers'
import { useInfiniteQuery } from '@tanstack/react-query';
import axiosClient from '../../../axiosClient'

import { checkForCircularReferences } from '../../../helpers'
import { usePathname } from 'next/navigation'


export default function Page() {

  const token=getToken() ;
  const [isTyping,setIstyping]=useState(false) ;
  const [reciverUser,setReciverUser]=useState({name:"",is_online:0});

  const [currentPage,setCurentPage]=useState(1) ;
  const pathname = usePathname()
  const [urlParams,setUrlParams]=useState(null) ;
 
  useEffect(()=>{
    const arr=pathname.split("/") ;
    setUrlParams({type:arr[2],id:arr[3]})
  },[])

  const fetchMessages =async(c)=>{  
    const url=`/api/messages/${urlParams.type=="user"?"frinde":"group"}?page=${c}`

    const response = await axiosClient.get(url, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        params: {
          reciver_id:urlParams.id ,
        }
    })
    return response.data
  } 

  
  const {status,error,data,isFetchingNextPage,hasNextPage,fetchNextPage}=useInfiniteQuery({
    queryKey:["chat",pathname.split("/")[2],pathname.split("/")[3]] ,
    enabled:!!urlParams ,
    queryFn:({page=currentPage})=>fetchMessages(page) ,
    getNextPageParam: () => currentPage+1,
  })

  useEffect(()=>{
    if(data && currentPage>1 && currentPage<=data.pages[0].pagination.last_page){
      fetchNextPage() ;
    }
  },[currentPage])

  useEffect(()=>{
     if(data){
      console.log( data.pages.flatMap(item => item.messages) )
     }
  },[])



  
  return (
      <section className={ `flex z-10 md:flex flex-col flex-auto bg-gray-900 border-l relative border-gray-800`}>
          <ChatHeader urlParams={urlParams}  reciverUser={reciverUser} reciverLoading={status=="pending"} />
          <ChatBody isTyping={isTyping}  messages={data!=null ? data.pages.flatMap(item => item.messages) :[]}
            urlParams={urlParams}
            setCurentPage={setCurentPage} status={status} isFetchingNextPage={isFetchingNextPage} currentPage={currentPage}  />
          <ChatFooter setIstyping={setIstyping}  urlParams={urlParams} />
     </section>
  )
}