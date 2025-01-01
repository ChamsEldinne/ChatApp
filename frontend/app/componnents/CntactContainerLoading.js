import React from 'react'

function CntactContainerLoading() {
  return (
    <div  className="flex cursor-wait justify-between items-center  p-3 hover:bg-gray-800 rounded-lg relative">
        <div className="w-16 animate-pulse h-16 rounded-full overflow-hidden bg-slate-400 relative flex flex-shrink-0">
        </div>
        <div className="flex-auto min-w-0 ml-4 mr-6  block">
            <p className="font-bold bg-gray-400 animate-pulse w-1/3 md:w-2/3 h-4 rounded-md"> </p>
            <div className="flex items-center mt-2 animate-pulse text-sm font-bold bg-gray-400 w-2/3 md:w-full h-4 rounded-md">
            </div>
        </div>
        <div className="bg-blue-700 w-3 h-3 rounded-full  flex-shrink-0 block"></div>
    </div>
  )
}

export default CntactContainerLoading