import React from 'react'

function ChatLoading() {
  return (
    <div className='my-4 flex flex-col gap-4' >
        <div className="flex flex-row  justify-start" >
            <div className="w-8 h-8 relative bg-slate-400 animate-pulse rounded-full flex flex-shrink-0 mr-4">
                
            </div>
            <div className="messages text-sm text-gray-700 grid grid-flow-row gap-2">
                <div className="flex items-center group">
                    <p className="rounded-t-full rounded-r-full bg-slate-400 w-44 h-10 animate-pulse"></p>
                </div>
                <div className="flex items-center group">
                    <p className=" rounded-r-full bg-slate-400 w-48 h-10 animate-pulse"></p>
                </div>
                <div className="flex items-center group">
                    <p className="rounded-b-full rounded-r-full bg-slate-400 w-44 h-10 animate-pulse"></p>
                </div>
            </div>
        </div>
        <div className="flex flex-row justify-end">
        
            <div className="messages  text-sm text-gray-700 flex flex-col  items-end gap-2">
                <div className="flex items-center group">
                    <p className="rounded-t-full rounded-l-full bg-slate-400 w-44 h-10 animate-pulse"></p>
                </div>
                <div className="flex items-center group">
                    <p className="rounded-b-full rounded-l-full bg-slate-400 w-48 h-10 animate-pulse"></p>
                </div>
            </div>
        </div>

        <div className="flex flex-row justify-start">
            <div className="w-8 h-8 relative bg-slate-400 animate-pulse rounded-full flex flex-shrink-0 mr-4">
                
            </div>
            <div className="messages text-sm text-gray-700 grid grid-flow-row gap-2">
                <div className="flex items-center group">
                    <p className="rounded-full  bg-slate-400 w-48 h-10 animate-pulse"></p>
                </div>
            </div>
        </div>
        <div className="flex flex-row justify-end">
            
            <div className="messages  text-sm text-gray-700 flex flex-col  items-end gap-2">
                <div className="flex items-center group">
                    <p className="rounded-t-full rounded-l-full bg-slate-400 w-44 h-10 animate-pulse"></p>
                </div>
                <div className="flex items-center group">
                    <p className="rounded-b-full rounded-l-full bg-slate-400 w-48 h-10 animate-pulse"></p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ChatLoading