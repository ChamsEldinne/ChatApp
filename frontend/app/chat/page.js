'use client'
import { useState,useEffect } from 'react';
import Chat from '@/app/componnents/Chat'
import Contact from '@/app/componnents/Contact';
import CreateGroup from '../componnents/CreateGroup';

export default function Home() {

  const [displayedContact,setDisplayedContact]=useState(null) ;
  const [displayChat,setDisplauChat]=useState(!window.matchMedia("(max-width: 600px)").matches) ;
  const [messages,setMessages]=useState([]) ;
  const [displayCreateGroup,setDisplayCreateGroup]=useState(false) ;
  
  useEffect(()=>{
    if(messages.length!=0){
      setMessages([]) ;
      setDisplauChat(true) ;
    }
  },[displayedContact]) ;


  return ( 
    <div  className="h-full w-full flex antialiased text-gray-200   overflow-y-hidden">
        <div className="flex-1 flex flex-col">
            <main className="flex-grow flex flex-row min-h-0 relative">
                <Contact setDisplayCreateGroup={setDisplayCreateGroup} setMessages={setMessages} setDisplayedContact={setDisplayedContact} displayChat={displayChat} setDisplauChat={setDisplauChat} />
                <Chat  messages={messages} setMessages={setMessages} displayedContact={displayedContact}  displayChat={displayChat} setDisplauChat={setDisplauChat} /> 
                <CreateGroup displayCreateGroup={displayCreateGroup} setDisplayCreateGroup={setDisplayCreateGroup} />
            </main>     
        </div>
    </div>
  );
}
