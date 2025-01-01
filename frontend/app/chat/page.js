'use client'
import { useState } from 'react';
import Chat from '@/app/componnents/Chat'
import Contact from '@/app/componnents/Contact';
// import useEcho from '../hookes/useEcho';
export default function Home() {

  const [displayedContact,setDisplayedContact]=useState(null) ;
  const [displayChat,setDisplauChat]=useState(false) ;
  const [messages,setMessages]=useState([]) ;
  // const echo=useEcho() ;
  return ( 
    <div  className="h-[96vh] w-full flex antialiased text-gray-200   overflow-y-hidden">
        <div className="flex-1 flex flex-col">
            <main className="flex-grow flex flex-row min-h-0 relative">
                <Contact  setMessages={setMessages} setDisplayedContact={setDisplayedContact} displayChat={displayChat} setDisplauChat={setDisplauChat} />
                <Chat  messages={messages} setMessages={setMessages} displayedContact={displayedContact}  displayChat={displayChat} setDisplauChat={setDisplauChat} /> 
            </main>
        </div>
    </div>
  );
}
