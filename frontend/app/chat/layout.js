import React from 'react'
import Provider from './Provider'; 
export const metaData={
  title:"Chat | Inbox"
}


export default function ChatLayout({children}) {     

    return ( 
      <div  className="h-full w-full flex antialiased text-gray-200   overflow-y-hidden">
          <div className="flex-1 flex flex-col">
            <Provider>{children}</Provider>
          </div>
      </div>
    );
}

