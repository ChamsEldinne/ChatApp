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
import axiosClient from '../axiosClient';
import useIntersectionObserver from '../hookes/useIntersectionObserver' ;

// import {useQueryClient } from '@tanstack/react-query';


function ChatBody({ fetchNextPage,urlParams,isTyping,hasNextPage,lastRead,isFetchingNextPage,status,messages,reciver,isLoading}) {

  function ScrollToBottomn(){
    if(chatBodyRef.current){
      chatBodyRef.current.scrollTop=chatBodyRef.current.scrollHeight ;
      setScrollToBottomn(false) ;
    }
  }
  // const queryClient = useQueryClient();

  const {blocks} = useBlocks(messages,ScrollToBottomn);
  const chatBodyRef=useRef() ;
  const [scrollToBottomn,setScrollToBottomn]=useState(false) ;
  const user=getUser() ;

  const [requestedTyping,setRequestedTyping]=useState({isTyping:false,user: {id:null} }) ;

  useEffect(()=>{
    console.log("rerender ")
  })

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

  async function UpdateLatRead(reciverId,type, messageId){
    const response=await axiosClient.post('/api/lastReadMessage',
      {
        type:type ,
        reciver_id :reciverId,
        message_id:messageId ,
      },{
        headers:{
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
    })
  }

  // useEffect(()=>{
  //   if( messages[0] ){
  //     UpdateLatRead(urlParams.id,urlParams.type,messages[0]?.id)
  //     queryClient.invalidateQueries({queryKey:["lastRead",urlParams.type,urlParams.id],exact:true}) 
  //   } 
  // },[messages])



  // const [firstIsDone,setFirstIsDone]=useState(false) ;

  // useEffect(()=>{
  //   if(status=='pending' && !firstIsDone){
  //     ScrollToBottomn()
  //     setFirstIsDone(true) ;
  //   }

  //   ScrollToBottomn()
  // },[messages])




  const [thirdMessageRef, isIntersectingthirdMessage] = useIntersectionObserver({});

   useEffect(()=>{
      if(!isIntersectingthirdMessage){
        setScrollToBottomn(true)
      }else{
        setScrollToBottomn(false) ;
      }
   },[isIntersectingthirdMessage])


  return (
  <div ref={chatBodyRef} className="chat-body w-full justify-end scroll-smooth p-4 flex-1 min-h-[70vh]  z-10  overflow-y-scroll " >
   
   {(!isLoading && !hasNextPage ) &&  <Reciver2 urlParams={urlParams} reciverUser={reciver} />}
    
    {scrollToBottomn && <ArrowDown ScrollToBottomn={ScrollToBottomn} /> }

    {status==="pending" && <ChatLoading />}
    {isFetchingNextPage && <div className='flex justify-center w-full my-3'><LoadingSpiner /> </div> }
    
    {blocks.map((b,index)=>
     <div key={index} ref={index==blocks.length-1?thirdMessageRef:null} >
      <MessageContainer  setScrollToBottomn={setScrollToBottomn} fetchNextPage={fetchNextPage} index={index} lastReadData={lastRead.data} prev={index==0 ?null : blocks[index-1]} urlParams={urlParams}   block={b} />
     </div>)}
    {requestedTyping?.isTyping &&( (urlParams.type=='user' && requestedTyping.user.id==urlParams.id) || urlParams.type=='group' )? <Typing user={requestedTyping.user}/>:<div className='size-4'></div> }
  </div>
  )
}

export default ChatBody