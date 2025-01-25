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


function ChatBody({ fetchNextPage,urlParams,isTyping,hasNextPage,isFetchingNextPage,status,messages,reciver,isLoading}) {

  const {blocks} = useBlocks(messages);
  const chatBodyRef=useRef() ;


  const [scrollToBottomn,setScrollToBottomn]=useScrooll(chatBodyRef,fetchNextPage) ;
  const user=getUser() ;

  const [requestedTyping,setRequestedTyping]=useState({isTyping:false,user: {id:null} }) ;

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

    //  const channle =echo.private(`chat.${user.id}`) ;


      const event= (urlParams.type=='user' ) ? 'MessageSentEvent':'GroupMessageEvent'

      channle.listen(event, (event) => {
        const message=event.message
       
        console.log(message) ;

        const ReciverId=(message.messsageble_type=="App\\Models\\Group" || message.user_id==user.id) ? message.messageable_id
        :message.user_id
        const params={type:message.messsageble_type=="App\\Models\\Group"? 'group':'user',
                      id:ReciverId
        }

        queryClient.setQueryData( ["chat",params.type,params.id.toString()] ,(oldData) => {

          if (!oldData) return; 
           
          return {
            ...oldData,
            pages: oldData.pages.map((page, index) =>
              index === 0
                ? { ...page, messages: [message, ...page.messages] } // Update only the first page
                : page
            ),
          };

        });
        const groupOrUser=message.messsageble_type=="App\\Models\\User"
        if(groupOrUser){
          queryClient.setQueryData(['contact',groupOrUser?true:false],(oldData)=>{
            if(!oldData) return ;
             
            //finde the contact first to update 
             const s= oldData.pages.map((page,index)=>page.data.filter(d=>d.freinde_id==ReciverId )) 
                   
             const k=s[0][0] ?       
                {
                  ...s[0][0],
                  message:message.message ,
                  lates_message_date:message.time ,
                  user_id:message.user_id ,
                } :
             
                //frindes contact
               {
                  message:message.message,
                  lates_message_date:message.time,
                  user_id:message.user_id ,
                  freinde_id:reciver?.id,
                  freinde_name:reciver?.name,
                  messsageble_type: "App\\Models\\User",
                
                }
                // }:{
  
                //   //group contact 
                //   message:message.message,
                //   lates_message_date:message.time,
                //   user_id:message.user_id ,
                //   freinde_id:reciver?.id,
                //   freinde_name:reciver?.name,
                //   messsageble_type: "App\\Models\\Group",
                // }
  
             return {
              ...oldData,
              pages:oldData.pages.map((page,index)=>{
                const p={...page,data:page.data.filter((d)=>d.freinde_id!==ReciverId)}
                return index===0 ?
                 {...p, data :[k, ...p.data] }:
                 page
               })
             }
          }) ;
        }

      }) ;
      
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

 

  return (
  <div ref={chatBodyRef}  className="chat-body scroll-smooth p-4 flex-1 min-h-[70vh]  z-10  overflow-y-scroll " >
   
   {(!isLoading && !hasNextPage ) &&  <Reciver2 urlParams={urlParams} reciverUser={reciver} />}
    
    {scrollToBottomn && <ArrowDown ScrollToBottomn={ScrollToBottomn} /> }

    {status==="pending" && <ChatLoading />}
    {isFetchingNextPage && <div className='flex justify-center w-full my-3'><LoadingSpiner /> </div> }

    {blocks.map((b,index)=><MessageContainer prev={index==0 ?null : blocks[index-1]} urlParams={urlParams}  key={index} block={b} />)}
    {requestedTyping?.isTyping &&( (urlParams.type=='user' && requestedTyping.user.id==urlParams.id) || urlParams.type=='group' )? <Typing />:<div className='size-4'></div> }
  </div>
  )
}

export default ChatBody