import React from 'react'

function ReciverLoading() {
  return (
    <div className="flex">
        <div className="size-12 animate-pulse rounded-full bg-slate-400 mr-4 relative flex flex-shrink-0">
            
        </div>
        <div className="text-sm">
            <p className="font-bold bg-slate-400 animate-pulse h-4 rounded-lg w-28"></p>
            <p className='bg-slate-400 animate-pulse h-4 rounded-lg w-20 mt-3' ></p>
        </div>
    </div>
  )
}

export default ReciverLoading