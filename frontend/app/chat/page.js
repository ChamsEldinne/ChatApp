'use client'
import { useState,useEffect } from 'react';
import Chat from '@/app/componnents/Chat'
import Contact from '@/app/componnents/Contact';
import CreateGroup from '../componnents/CreateGroup';

export default function Home() {

  const [displayedContact,setDisplayedContact]=useState(null) ;
  const [displayChat,setDisplauChat]=useState(false) ;

  const [currentPage,setCurentPage]=useState(1) ;
  
 
  const [messages,setMessages]=useState([]) ;
  const [displayCreateGroup,setDisplayCreateGroup]=useState(false) ;
  
  useEffect(()=>{
   
    setMessages(()=>[]) ;
    setDisplauChat(true) ;
    setCurentPage(()=>1) ;
    
  },[displayedContact]) ;


  useEffect(()=>{
    
    setDisplauChat(!window.matchMedia("(max-width: 767px)").matches) ;

  },[])


  return ( 
    <div  className="h-full w-full flex antialiased text-gray-200   overflow-y-hidden">
        <div className="flex-1 flex flex-col">
            <main className="flex-grow flex flex-row min-h-0 relative">
                <Contact setDisplayCreateGroup={setDisplayCreateGroup} setDisplayedContact={setDisplayedContact} displayChat={displayChat}  />
                <Chat currentPage={currentPage} setCurentPage={setCurentPage}  messages={messages} setMessages={setMessages} displayedContact={displayedContact}
                                       displayChat={displayChat} setDisplauChat={setDisplauChat} />    
                {displayCreateGroup && <CreateGroup displayCreateGroup={displayCreateGroup} setDisplayCreateGroup={setDisplayCreateGroup} />}    
            </main>     
        </div>
    </div>
  );
}
