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

function ChatBody({ isTyping,setCurentPage,loading,currentPage,pagination ,setMessages,messages,displayedContact,chatBodyRef}) {

  const {blocks} = useBlocks(messages);
  const [scrollToBottomn,setScrollToBottomn]=useScrooll(chatBodyRef,setCurentPage,pagination,currentPage ) ;
  
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
      const channle =(displayedContact.group_or_friend==1) ?
                    echo.private(`chat.${user.id}`) : 
                    echo.private(`group.${displayedContact.reciver_id}`) ;

      const event= (displayedContact.group_or_friend==1) ? 'MessageSentEvent':'GroupMessageEvent'

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
        
      const channel= (displayedContact.group_or_friend==1) ? 
                  `chat.${displayedContact.reciver_id}` :
                  `group.${displayedContact.reciver_id}`
       
      echo.private(channel)
      .whisper('typing', {
          isTyping:isTyping
      });
    }
  
  },[isTyping,echo])


  return (
  <div ref={chatBodyRef}  className="chat-body scroll-smooth p-4 flex-1 min-h-[70vh]  z-10  overflow-y-scroll " >
    {scrollToBottomn && <ArrowDown handleScrollToBottomn={handleScrollToBottomn} /> }

    {loading && currentPage==1 && <ChatLoading />}
    {loading && currentPage>1 && <div className='flex justify-center w-full my-3'><LoadingSpiner /> </div> }

    {blocks.map((b,index)=><MessageContainer prev={index==0 ?null : blocks[index-1]} setMessages={setMessages} key={index} block={b} />)}
    {requestedTyping ? <Typing />:<div className='size-4'></div> }
  </div>
  )
}

export default ChatBody