import React from 'react'

function ContactContainer2() {
  return (
    <div className="flex justify-between items-center p-3 hover:bg-gray-800 rounded-lg relative">
    <div className="w-16 h-16 relative flex flex-shrink-0">
        <img className="shadow-md rounded-full w-full h-full object-cover"
             src="https://randomuser.me/api/portraits/men/97.jpg"
             alt=""
        />
        <div className="absolute bg-gray-900 p-1 rounded-full bottom-0 right-0">
            <div className="bg-green-500 rounded-full w-3 h-3"></div>
        </div>
    </div>
    <div className="flex-auto min-w-0 ml-4 mr-6  block">
        <p className="font-bold">Tony Stark</p>
        <div className="flex items-center text-sm font-bold">
            <div className="min-w-0">
                <p className="truncate">Hey, Are you there?</p>
            </div>
            <p className="ml-2 whitespace-no-wrap">10min</p>
        </div>
    </div>
    <div className="bg-blue-700 w-3 h-3 rounded-full  flex-shrink-0 block"></div>
    </div>
  )
}

export default ContactContainer2