'use client'
import { useCallback } from 'react'
import {useEffect,useState } from 'react'
import MessageContainer from './MessageContainer';
import ChatLoading from './ChatLoading'
import LoadingSpiner from './LoadingSpiner';
import ArrowDown from './ArrowDown';
import { getUser } from '../helpers';
import useBlocks from '../hookes/useBlocks';
import useEcho from '../hookes/useEcho';
import Typing from './Typing';

function ChatBody({setCurentPage,loading,currentPage,pagination ,setMessages,messages,displayedContact,chatBodyRef}) {

   const [scrollToBottomn,setScrollToBottomn]=useState(false) ;
   const {blocks} = useBlocks(messages);


   const user=getUser() ;

    const [lastScrollTop, setLastScrollTop] = useState(0);
  
    useEffect(() => {
      const handleScroll = () => {
        const div=chatBodyRef.current ;
        const currentScrollTop = div.pageYOffset || div.scrollTop;
       
        // Check if the user reached the bottom of the body
        if (div.scrollTop + div.clientHeight >= div.scrollHeight){
          setScrollToBottomn(false)
        }
        // Check if the user is scrolling upwards
        if (currentScrollTop < lastScrollTop) {
          setScrollToBottomn(true)
        } 
        // Check if the user reached the top of the body
        if (div.scrollTop === 0 && pagination.last_page>currentPage) {
            setCurentPage((prev)=>prev+1) ;
        }
        setLastScrollTop(currentScrollTop);
      };
  
      chatBodyRef.current.addEventListener('scroll', handleScroll);
  
      return () => {
        chatBodyRef.current.removeEventListener('scroll', handleScroll);
      };
    }, [lastScrollTop]);


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

    // const echo= useEcho() 
   
    // useEffect(()=>{
    //     if(echo && user){
    //       echo.private(`chat.${user.id}`) 
    //         .listen('MessageSentEvent', (event) => {
    //             if(event.message.user_id != user.id){
    //                 setMessages((prev)=>[event.message , ...prev])
    //                 setScrollToBottomn(true) ;
    //             }
    //         });
    //     } 
    // },[echo])

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