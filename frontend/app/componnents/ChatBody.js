'use client'

import {useEffect, useState } from 'react'
import MessageContainer from './MessageContainer';
import ChatLoading from './ChatLoading'
import LoadingSpiner from './LoadingSpiner';
import ArrowDown from './ArrowDown';
import { getUser } from '../helpers';
import useBlocks from '../hookes/useBlocks';
import useEcho from '../hookes/useEcho';
import Typing from './Typing';
import useScrooll from '../hookes/useScrooll';

function ChatBody({ isTyping,setCurentPage,isFetchingNextPage,status,currentPage ,setMessages,messages,reciverUser,chatBodyRef}) {

  const {blocks} = useBlocks(messages);
  const [scrollToBottomn,setScrollToBottomn]=useScrooll(chatBodyRef,setCurentPage ) ;
  
  const [requestedTyping,setRequestedTyping]=useState(false) ;
  const user=getUser() ;

  function handleScrollToBottomn(){
    if(chatBodyRef.current){
      chatBodyRef.current.scrollTop=chatBodyRef.current.scrollHeight ;
      setScrollToBottomn(false) ;
    }
  }


  useEffect(()=>{
    
    if(currentPage==1){
      handleScrollToBottomn() ;
    }
    if(messages.length==0){
      setScrollToBottomn(false) ;
    }
  },[blocks])

  const echo= useEcho() ;
  
  useEffect(()=>{
    if(echo && user){
      const channle =(reciverUser.type=='user') ?
                    echo.private(`chat.${user.id}`) : 
                    echo.private(`group.${reciverUser.id}`) ;

      const event= (reciverUser.type=='user' ) ? 'MessageSentEvent':'GroupMessageEvent'

      channle.listen(event, (event) => {

        setMessages((prev)=>[event.message , ...prev])
        setScrollToBottomn(true) ;
      
      });

      channle
      .listenForWhisper('typing', (e) => {
        setRequestedTyping(e.isTyping);
        handleScrollToBottomn() ;
      });
    } 
  },[echo])


  useEffect(()=>{
    if(echo){
        
      const channel= (reciverUser.type=='user') ? 
                  `chat.${reciverUser.id}` :
                  `group.${reciverUser.id}`
       
      echo.private(channel)
      .whisper('typing', {
          isTyping:isTyping
      });
    }
  
  },[isTyping,echo])


  return (
  <div ref={chatBodyRef}  className="chat-body scroll-smooth p-4 flex-1 min-h-[70vh]  z-10  overflow-y-scroll " >
    {scrollToBottomn && <ArrowDown handleScrollToBottomn={handleScrollToBottomn} /> }

    {status==="loading" && <ChatLoading />}
    {isFetchingNextPage && <div className='flex justify-center w-full my-3'><LoadingSpiner /> </div> }

    {blocks.map((b,index)=><MessageContainer prev={index==0 ?null : blocks[index-1]} setMessages={setMessages} key={index} block={b} />)}
    {requestedTyping ? <Typing />:<div className='size-4'></div> }
  </div>
  )
}

export default ChatBody