import React from 'react'

function NoSelectedContact({displayChat}) {
  return (
    <div className={`${displayChat? "flex":"hidden" } w-full z-10  justify-center items-center bg-gray-900 border-l relative border-gray-800`} >
          <h1 className='text-xl text-center text-gray-200 font-semibold'>No Selected Contact !</h1>
    </div>
  )
}

export default NoSelectedContact