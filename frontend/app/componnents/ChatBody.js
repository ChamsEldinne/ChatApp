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
import Reciver2 from './Reciver2'
import useIntersectionObserver from '../hookes/useIntersectionObserver' ;
import { UpdateLatRead } from '../chat/fetch/index';
import { useQueryClient } from '@tanstack/react-query';


function ChatBody({ fetchNextPage,urlParams,chatBodyRef,isTyping,hasNextPage,lastRead,isFetchingNextPage,status,messages,reciver,isLoading}) {

  const queryClient = useQueryClient();
  const {blocks} = useBlocks(messages);
  const [scrollToBottomn,setScrollToBottomn]=useState(false) ;
  const user=getUser() ;
  const [requestedTyping,setRequestedTyping]=useState({isTyping:false,user: {id:null} }) ;
  const token=getToken() ;
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

 const [firstIsDone,setFirstIsDone]=useState(false) ;
  useEffect(()=>{
    if( messages[0] && !firstIsDone ){
      setFirstIsDone(true) ;
      UpdateLatRead(urlParams.id,urlParams.type,messages[0]?.id,token)
      queryClient.invalidateQueries({queryKey:["lastRead",urlParams.type,urlParams.id],exact:true}) 
    } 
  },[messages])

  //track last block intersction to display the arrow down while scrolling
  const [lastBlockRef, isIntersectingLastBlockRef] = useIntersectionObserver({});

  useEffect(()=>{
    if(!isIntersectingLastBlockRef){
      setScrollToBottomn(true)
    }else{
      setScrollToBottomn(false) ;
    }
  },[isIntersectingLastBlockRef])

 //track the first block intersction to fetch the next page 
  const [firstBlockRef, isIntersectingFirstBlockRef] = useIntersectionObserver({});
  useEffect(() => {
    if (isIntersectingFirstBlockRef) {
      fetchNextPage() ;
    }
  }, [isIntersectingFirstBlockRef]);
  


  return (
  <div ref={chatBodyRef} className="chat-body w-full flex-1 overflow-y-auto justify-end scroll-smooth p-4  h-fit min-h-[70vh]  z-10 " >
   
   {(!isLoading && !hasNextPage ) &&  <Reciver2 urlParams={urlParams} reciverUser={reciver} />}
    
    {scrollToBottomn && <ArrowDown chatBodyRef={chatBodyRef} /> }

    {status==="pending" && <ChatLoading />}
    {isFetchingNextPage && <div className='flex justify-center w-full my-3'><LoadingSpiner /> </div> }
    
    {blocks.map((b,index)=>

      <MessageContainer key={index} isFirstBlock={index==0} firstBlockRef={firstBlockRef} lastBlockRef={lastBlockRef}  isLastBlock={blocks.length-1==index}  lastReadData={lastRead.data} prevBlock={index==0 ?null : blocks[index-1]} urlParams={urlParams}   block={b} />
    
    )}
    {requestedTyping?.isTyping &&( (urlParams.type=='user' && requestedTyping.user.id==urlParams.id) || urlParams.type=='group' )? <Typing user={requestedTyping.user}/>:<div className='size-4'></div> }
    
  </div>
  )
}

export default ChatBody