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
import Reciver2 from './Reciver2'

function ChatBody({ fetchNextPage,urlParams,isTyping,hasNextPage,isFetchingNextPage,status,messages,reciver=null,isLoading}) {

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

          if (!oldData) return; 
           
          return {
            ...oldData,
            pages: oldData.pages.map((page, index) =>
              index === 0
                ? { ...page, messages: [event.message, ...page.messages] } // Update only the first page
                : page
            ),
          };

        });
        setScrollToBottomn(true)     
      });

      channle.listenForWhisper('typing', (e) => {
        setRequestedTyping(e.isTyping);
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
   
   {(!isLoading && !hasNextPage ) &&  <Reciver2 urlParams={urlParams} reciverUser={reciver} />}
    
    {scrollToBottomn && <ArrowDown ScrollToBottomn={ScrollToBottomn} /> }

    {status==="pending" && <ChatLoading />}
    {isFetchingNextPage && <div className='flex justify-center w-full my-3'><LoadingSpiner /> </div> }

    {blocks.map((b,index)=><MessageContainer prev={index==0 ?null : blocks[index-1]} urlParams={urlParams}  key={index} block={b} />)}
    {requestedTyping ? <Typing />:<div className='size-4'></div> }
  </div>
  )
}

export default ChatBody