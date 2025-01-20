'use client'

import {useEffect, useState,useRef} from 'react'
import MessageContainer from './MessageContainer';
import ChatLoading from './ChatLoading'
import LoadingSpiner from './LoadingSpiner';
import ArrowDown from './ArrowDown';
import { getUser } from '../helpers';
import useBlocks from '../hookes/useBlocks';
import useEcho from '../hookes/useEcho';
import Typing from './Typing';
import useScrooll from '../hookes/useScrooll';
import { useQueryClient } from '@tanstack/react-query';

function ChatBody({ fetchNextPage,urlParams,isTyping,isFetchingNextPage,status,messages}) {

  const {blocks} = useBlocks(messages);
  const chatBodyRef=useRef() ;

  const [scrollToBottomn,setScrollToBottomn]=useScrooll(chatBodyRef,fetchNextPage) ;

  const [requestedTyping,setRequestedTyping]=useState(false) ;
  const user=getUser() ;

  function ScrollToBottomn(){
    if(chatBodyRef.current){
      chatBodyRef.current.scrollTop=chatBodyRef.current.scrollHeight ;
      setScrollToBottomn(false) ;
    }
  }


  useEffect(()=>{
    
    // if(currentPage==1){
    //   ScrollToBottomn() ;
    // }
    if(messages.length==0){
      setScrollToBottomn(false) ;
    }
  },[blocks])

  const echo= useEcho() ;
  const queryClient=useQueryClient() ;
  
  useEffect(()=>{
    if(echo && user){
      const channle =(urlParams.type=='user') ?
                    echo.private(`chat.${user.id}`) : 
                    echo.private(`group.${urlParams.id}`) ;

      const event= (urlParams.type=='user' ) ? 'MessageSentEvent':'GroupMessageEvent'

      channle.listen(event, (event) => {

        queryClient.setQueryData(["chat",urlParams],(oldData) => {
          const messages = oldData?.messages || []; // Ensure messages is an array.
          return { ...oldData, messages: [event.message, ...messages] };
        });

        queryClient.invalidateQueries(["chat",urlParams])      
      });

      channle.listenForWhisper('typing', (e) => {
        setRequestedTyping(e.isTyping);
        ScrollToBottomn() ;
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
          isTyping:isTyping
      });
    }
  
  },[isTyping,echo])

 

  return (
  <div ref={chatBodyRef}  className="chat-body scroll-smooth p-4 flex-1 min-h-[70vh]  z-10  overflow-y-scroll " >
    {scrollToBottomn && <ArrowDown ScrollToBottomn={ScrollToBottomn} /> }

    {status==="pending" && <ChatLoading />}
    {isFetchingNextPage && <div className='flex justify-center w-full my-3'><LoadingSpiner /> </div> }

    {blocks.map((b,index)=><MessageContainer prev={index==0 ?null : blocks[index-1]}  key={index} block={b} />)}
    {requestedTyping ? <Typing />:<div className='size-4'></div> }
  </div>
  )
}

export default ChatBody