'use client'
import { useState } from 'react';
import Chat from './componnents/Chat';
import Contact from './componnents/Contact';

export default function Home() {

  const [displayedContact,setDisplayedContact]=useState({reciver_id:5,group_or_friend:1}) ;
  const [displayChat,setDisplauChat]=useState(true) ;
   
  return ( 
    <div className="h-[96vh] w-full flex antialiased text-gray-200 bg-gray-900  overflow-y-hidden">
        <div className="flex-1 flex flex-col">
            <main className="flex-grow flex flex-row min-h-0 relative">
                <Contact setDisplayedContact={setDisplayedContact} displayChat={displayChat} setDisplauChat={setDisplauChat} />
                <Chat displayedContact={displayedContact}  displayChat={displayChat} setDisplauChat={setDisplauChat} />
            </main>
        </div>
    </div>
  );
}









