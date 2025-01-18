'use client'
import React from 'react'
import { useState,useEffect } from 'react';
import CreateGroup from '../componnents/CreateGroup';
import Contact from '../componnents/Contact';

export default function ChatLayout({children}) {
  
    const [displayCreateGroup,setDisplayCreateGroup]=useState(false) ;
      

    return ( 
      <div  className="h-full w-full flex antialiased text-gray-200   overflow-y-hidden">
          <div className="flex-1 flex flex-col">
              <main className="flex-grow flex flex-row min-h-0 relative">
                  <Contact setDisplayCreateGroup={setDisplayCreateGroup}    />
                  {children}   
                  {displayCreateGroup && <CreateGroup displayCreateGroup={displayCreateGroup} setDisplayCreateGroup={setDisplayCreateGroup} />}    
              </main>     
          </div>
      </div>
    );
}

