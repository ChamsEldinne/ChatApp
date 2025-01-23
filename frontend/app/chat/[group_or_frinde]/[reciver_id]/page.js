'use client'
import React from 'react'
import ChatFooter from '../../../componnents/ChatFooter'
import ChatHeader from '../../../componnents/ChatHeader'
import ChatBody from '../../../componnents/ChatBody'
import { useState,useEffect } from 'react'
import { getToken } from '../../../helpers'
import { useInfiniteQuery,useQuery } from '@tanstack/react-query';
import axiosClient from '../../../axiosClient'
import { usePathname } from 'next/navigation'
//import fetchMessages from '../../../fetching function/chat'


export default function Page() {

  const token=getToken() ;
  const [isTyping,setIstyping]=useState(false) ;
  const pathname = usePathname()

  const [urlParams,setUrlParams]=useState(()=>{
    const arr=pathname.split("/") ;
    return {type:arr[2],id:arr[3]}
  }) ;
 
  const fetchMessages =async(c)=>{  
    const url=`/api/messages/${pathname.split("/")[2]=="user"?"frinde":"group"}?page=${c}`

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
  
  const {status,error,data,isFetchingNextPage,fetchNextPage,hasNextPage}=useInfiniteQuery({
    queryKey:["chat",urlParams] ,
    queryFn:({pageParam })=>fetchMessages(pageParam ) ,
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>{
      const nextPageUrl = lastPage.pagination.next_page_url;
      return nextPageUrl ? lastPage.pagination.current_page + 1 : undefined;
    },
    staleTime:Infinity,
  })

  async function fetchReciver(){
    const response= await axiosClient.get('/api/messages/reciver',
    {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    ,  
    params:{ 
        reciver_id:urlParams.id,
        type:urlParams.type==='user'?1:0 ,
    }
    })
  return  response.data
  }
  const reciver=useQuery({
    queryKey:[urlParams] ,
    queryFn:fetchReciver ,
    staleTime:Infinity ,
    retry:2, 
  })

  
  return (
      <section className={ `flex z-10 md:flex flex-col flex-auto bg-gray-900 border-l relative border-gray-800`}>
        <ChatHeader isLoading={reciver.isLoading} reciver={ reciver.data ? reciver.data.reciver[0]:null} />
        <ChatBody isLoading={reciver.isLoading} reciver={ reciver.data ? reciver.data.reciver[0]:null}
          fetchNextPage={fetchNextPage} isTyping={isTyping} hasNextPage={hasNextPage}
          messages={data!=null ? data.pages.flatMap(item => item.messages) :[]}
           urlParams={urlParams} status={status} isFetchingNextPage={isFetchingNextPage}   />
        <ChatFooter setIstyping={setIstyping}  urlParams={urlParams} />
     </section>
  )
}