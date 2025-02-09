'use client'

import {useEffect, useState,useRef} from 'react'
import MessageContainer from './MessageContainer';
import ChatLoading from './ChatLoading'
import LoadingSpiner from './LoadingSpiner';
import ArrowDown from './ArrowDown';
import { getToken, getUser } from '../helpers';
import useBlocks from '../hookes/useBlocks';
import useEcho from '../hookes/useEcho';
import Typing from './Typing';
import useScrooll from '../hookes/useScrooll';
import Reciver2 from './Reciver2'
import axiosClient from '../axiosClient';
import { useQuery } from '@tanstack/react-query';


function ChatBody({ fetchNextPage,urlParams,isTyping,hasNextPage,isFetchingNextPage,status,messages,reciver,isLoading}) {

  function ScrollToBottomn(){
    if(chatBodyRef.current){
      chatBodyRef.current.scrollTop=chatBodyRef.current.scrollHeight ;
      setScrollToBottomn(false) ;
    }
  }

  const {blocks} = useBlocks(messages,ScrollToBottomn);
  const chatBodyRef=useRef() ;
  const [scrollToBottomn,setScrollToBottomn]=useScrooll(chatBodyRef,fetchNextPage) ;
  const user=getUser() ;

  const [requestedTyping,setRequestedTyping]=useState({isTyping:false,user: {id:null} }) ;



  const token=getToken() ;

  useEffect(()=>{
    if(messages.length==0){
      setScrollToBottomn(false) ;
    }
  },[blocks])


  const echo= useEcho() ;


  useEffect(()=>{
    if(echo){
      const channle =(urlParams.type=='user') ?
      echo.private(`chat.${user.id}`) : 
      echo.private(`group.${urlParams.id}`) ;

      channle.listenForWhisper('typing', (e) => {
        setRequestedTyping({isTyping:e.isTyping,user:e.user}); 
      });
    }
  },[echo])


  useEffect(()=>{
    if(echo){        
      const channel= (urlParams.type=='user') ? 
                  `chat.${urlParams.id}` :
                  `group.${urlParams.id}`
       
      echo.private(channel)
      .whisper('typing', {
        isTyping:isTyping,
        user: {id:user.id , name:user.name} ,
      });
    }
  
  },[isTyping,echo]) 

  async function getRelationId(){
    const response=await axiosClient.get("/api/relation",{
      params:{
        "type":urlParams.type ,
        "reciver_id" :urlParams.id
      },
      headers:{
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    return response.data ;
  }
  const relationId=useQuery({
    queryKey:['relationId',urlParams.type,urlParams.id] ,
    queryFn:getRelationId ,
    staleTime:Infinity ,
  }) 

  


  async function fetchLastRead(){
    const response =await axiosClient.get('/api/lastReadMessage',{
      params:{
        relation_id: relationId.data.relation.id, 
      },
      headers:{
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    }) ;
    return response.data ;
  }

  const lastRead=useQuery({
    queryKey:["lastRead",urlParams.type,urlParams.id] ,
    queryFn:fetchLastRead ,
    staleTime:Infinity ,
    retry:2 ,  
    enabled:!!relationId.data
  })

  useEffect(()=>{
    console.log(lastRead.data) ;
  },[lastRead])

  const [firstIsDone,setFirstIsDone]=useState(false) ;

  useEffect(()=>{
    if(blocks.length==0 && !firstIsDone){
      ScrollToBottomn()
      setFirstIsDone(true) ;
    }
  },[messages])

  async function UpdateLatRead(relationId,messageId){
    const response=await axiosClient.post('/api/lastReadMessage',
      {
        relation_id:relationId,
        message_id:messageId ,
      },{
        headers:{
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
    })
  }
  useEffect(()=>{
    if(relationId.data && messages[0]){
      UpdateLatRead(relationId.data.relation.id,messages[0]?.id)
    } 
  },[relationId.data,messages])




  return (
  <div ref={chatBodyRef} className="chat-body w-full justify-end scroll-smooth p-4 flex-1 min-h-[70vh]  z-10  overflow-y-scroll " >
   
   {(!isLoading && !hasNextPage ) &&  <Reciver2 urlParams={urlParams} reciverUser={reciver} />}
    
    {scrollToBottomn && <ArrowDown ScrollToBottomn={ScrollToBottomn} /> }

    {status==="pending" && <ChatLoading />}
    {isFetchingNextPage && <div className='flex justify-center w-full my-3'><LoadingSpiner /> </div> }
    
    {blocks.map((b,index)=><MessageContainer lastReadData={lastRead.data} prev={index==0 ?null : blocks[index-1]} urlParams={urlParams}  key={index} block={b} />)}
    {requestedTyping?.isTyping &&( (urlParams.type=='user' && requestedTyping.user.id==urlParams.id) || urlParams.type=='group' )? <Typing user={requestedTyping.user}/>:<div className='size-4'></div> }
  </div>
  )
}

export default ChatBody