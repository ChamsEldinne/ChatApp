import React from 'react'

function ActiveUserContainerLoading() {
  return (
    <div className="text-sm text-center flex flex-col items-center  mr-4">
        <div className="p-1 border-4 border-transparent rounded-full">
            <div className="w-16 bg-gray-400 animate-pulse rounded-full  h-16 relative flex flex-shrink-0">  
            <div className="absolute bg-gray-900 p-1 rounded-full bottom-0 right-0">
                <div className="bg-green-500 rounded-full w-3 h-3"></div>
            </div>
            </div>
        </div>
        <p className='w-1/2 rounded-md  animate-pulse bg-slate-400 h-2 '></p>
    </div>
  )
}

export default ActiveUserContainerLoading