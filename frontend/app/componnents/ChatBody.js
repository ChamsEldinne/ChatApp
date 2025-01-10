'use client'

import {useEffect } from 'react'
import MessageContainer from './MessageContainer';
import ChatLoading from './ChatLoading'
import LoadingSpiner from './LoadingSpiner';
import ArrowDown from './ArrowDown';
import { getUser } from '../helpers';
import useBlocks from '../hookes/useBlocks';
import useEcho from '../hookes/useEcho';
import Typing from './Typing';
import useScrooll from '../hookes/useScrooll';

function ChatBody({setCurentPage,loading,currentPage,pagination ,setMessages,messages,displayedContact,chatBodyRef}) {

  const {blocks} = useBlocks(messages);
  const [scrollToBottomn,setScrollToBottomn]=useScrooll(chatBodyRef,setCurentPage,pagination,currentPage ) ;
  
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
  },[blocks])

  const echo= useEcho() ;
  
  useEffect(()=>{
    if(echo && user){
      const channle =(displayedContact.group_or_friend==1) ?
                    echo.private(`chat.${user.id}`) : 
                    echo.private(`group.${displayedContact.reciver_id}`) ;

      const event= (displayedContact.group_or_friend==1) ? 'MessageSentEvent':'GroupMessageEvent'

      channle.listen(event, (event) => {
        // if(event.message.user_id != user.id){
            setMessages((prev)=>[event.message , ...prev])
            setScrollToBottomn(true) ;
       // }
      });
    } 
  },[echo])

  return (
    <div ref={chatBodyRef}  className="chat-body scroll-smooth p-4 flex-1  z-10  overflow-y-scroll " >
    {scrollToBottomn && <ArrowDown handleScrollToBottomn={handleScrollToBottomn} /> }

    {loading && currentPage==1 && <ChatLoading />}
    {loading && currentPage>1 && <div className='flex justify-center w-full my-3'><LoadingSpiner /> </div> }


    {blocks.map((b,index)=><MessageContainer prev={index==0 ?null : blocks[index-1]} setMessages={setMessages} key={index} block={b} />)}
    <Typing />
</div>
  )
}

export default ChatBody