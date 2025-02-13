'use client'
import React from 'react'
import ChatFooter from '../../../componnents/ChatFooter'
import ChatHeader from '../../../componnents/ChatHeader'
import ChatBody from '../../../componnents/ChatBody'
import { useState,useEffect } from 'react'
import { getToken } from '../../../helpers'
import { useInfiniteQuery,useQuery } from '@tanstack/react-query';
import { usePathname } from 'next/navigation'
import {fetchReciver,fetchMessages ,fetchLastRead} from '../../fetch/index'

export default function Page() {

  const token=getToken() ;
  const [isTyping,setIstyping]=useState(false) ;
  const pathname = usePathname()  

  const [urlParams]=useState(()=>{
    const arr=pathname.split("/") ;
    return {type:arr[2],id:arr[3]}
  }) ;
 
  const {status,error,data,isFetchingNextPage,fetchNextPage,hasNextPage}=useInfiniteQuery({
    queryKey:["chat",urlParams.type,urlParams.id] ,
    queryFn:({pageParam })=>fetchMessages(pageParam,token,urlParams.type,urlParams.id) ,
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>{
      const nextPageUrl = lastPage.pagination.next_page_url;
      return nextPageUrl ? lastPage.pagination.current_page + 1 : undefined;
    },
    staleTime:Infinity,
  })

  const reciver=useQuery({
    queryKey:[urlParams] ,
    queryFn:()=>fetchReciver(urlParams.id,urlParams.type,token) ,
    staleTime:1000*60*2 ,//2min
    retry:2, 
  })


  const lastRead=useQuery({
    queryKey:["lastRead",urlParams.type,urlParams.id] ,
    queryFn:()=>fetchLastRead(urlParams.id,urlParams.type,token) ,
    staleTime:Infinity ,
    retry:2 ,  
  })
 

  
  return (
    <div className='flex'>
      <section className={ `flex scroll-smooth lg:w-[40vw]  w-screen md:w-[60vw] z-10 md:flex flex-col flex-auto bg-gray-900 border-l border-r relative border-gray-800`}>
        <ChatHeader isLoading={reciver.isLoading} reciver={ reciver.data ? reciver.data.reciver[0]:null} />
        <ChatBody isLoading={reciver.isLoading} reciver={ reciver.data ? reciver.data.reciver[0]:null}
          fetchNextPage={fetchNextPage} isTyping={isTyping} hasNextPage={hasNextPage}
          messages={data!=null ? data.pages.flatMap(item => item.messages) :[]}
          urlParams={urlParams} status={status} isFetchingNextPage={isFetchingNextPage}  lastRead={lastRead}  />
        <ChatFooter setIstyping={setIstyping}  urlParams={urlParams} />
      </section>

      <div className={`hidden lg:flex w-[25vw] z-10  justify-center  items-center bg-gray-900 border-l relative border-gray-800`} >
          <h1 className='text-xl text-center text-gray-200 font-semibold'>comming soon</h1>
      </div>

     </div>
  )
}