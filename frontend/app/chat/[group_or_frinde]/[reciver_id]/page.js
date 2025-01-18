'use client'
import React from 'react'
import ChatFooter from '@/app/componnents/ChatFooter'
import ChatHeader from '@/app/componnents/ChatHeader'
import ChatBody from '@/app/componnents/ChatBody'
import { useState,useEffect,useRef } from 'react'
import { getToken } from '@/app/helpers'
import { useInfiniteQuery } from '@tanstack/react-query';
import axiosClient from '@/app/axiosClient'

import { usePathname } from 'next/navigation'

export default function Page() {

  const token=getToken() ;
  const [isTyping,setIstyping]=useState(false) ;
  const [currentPage,setCurentPage]=useState(1) ;
  const [reciverUser,setReciverUser]=useState({name:"",is_online:0,type:""});
  const chatBodyRef=useRef() ;

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
    });  
    return response.data
  } 

  
  const {status,error,data,isFetchingNextPage,hasNextPage,fetchNextPage}=useInfiniteQuery({
    queryKey:["chat",urlParams] ,
    enabled:urlParams!=null ,
    queryFn:()=>fetchMessages(currentPage) ,
    getNextPageParam: ()=>currentPage+1
  })

  useEffect(()=>{
    if(data && currentPage<=data.pages[0].pagination.last_page){
      fetchNextPage() ;
    }
  },[currentPage])


  useEffect(()=>{
    if(data){
      setReciverUser(data.pages[0].reciver[0])
    }
  },[data])
  
  return (
      <section className={ `flex z-10 md:flex flex-col flex-auto bg-gray-900 border-l relative border-gray-800`}>
          <ChatHeader  reciverUser={reciverUser} reciverLoading={false} />
          <ChatBody isTyping={isTyping}  chatBodyRef={chatBodyRef} reciverUser={reciverUser} messages={data!=null ? data.pages.flatMap(item => item.messages) :[]}

            setCurentPage={setCurentPage} status={status} isFetchingNextPage={isFetchingNextPage} currentPage={currentPage} setMessages={null}  />
          <ChatFooter setIstyping={setIstyping} setMessages={null} reciverUser={reciverUser} />
     </section>
  )
}