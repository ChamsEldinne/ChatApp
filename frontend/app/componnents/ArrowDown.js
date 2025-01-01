import React from 'react'

function ArrowDown({handleScrollToBottomn}) {
  return (
    <div   onClick={handleScrollToBottomn}
    className='p-2 bg-gray-800 cursor-pointer animate-bounce rounded-full bottom-20 left-1/2 -translate-x-1/2 shadow-md z-20 absolute '>
    <svg width="24px" height="24px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title></title> <g id="Complete"> <g id="arrow-down"> <g> <polyline data-name="Right" fill="none" id="Right-2" points="7 16.4 12 21.5 17 16.4" stroke="#2563eb" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></polyline> <line fill="none" stroke="#2563eb" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="12" x2="12" y1="2.5" y2="19.2"></line> </g> </g> </g> </g></svg>
  </div>
  )
}

export default ArrowDown