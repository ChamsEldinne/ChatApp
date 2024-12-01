import React from 'react'

function GroupContactContainer() {
  return (
    <div className="flex justify-between items-center p-3 cursor-pointer hover:bg-gray-800 rounded-lg relative">
        <div className="w-16 h-16 relative flex flex-shrink-0">
            <img className="shadow-md rounded-full w-10 h-10 object-cover absolute ml-6"
                  src="https://randomuser.me/api/portraits/men/22.jpg"
                  alt="User2"
            />
            <img className="shadow-md rounded-full w-10 h-10 object-cover absolute mt-6"
                  src="https://randomuser.me/api/portraits/men/55.jpg"
                  alt="User2"
            />
            <div className="absolute bg-gray-900 p-1 rounded-full bottom-0 right-0">
                <div className="bg-green-500 rounded-full w-3 h-3"></div>
            </div>
        </div>
        <div className="flex-auto min-w-0 ml-4 mr-6 block">
            <p>TailwindCSS Group</p>
            <div className="flex items-center text-sm text-gray-600">
                <div className="min-w-0">
                    <p className="truncate">Adam: Hurray, Version 2 is out now!!.
                    </p>
                </div>
                <p className="ml-2 whitespace-no-wrap">23 Jan</p>
            </div>
        </div>
     </div>
  )
}

export default GroupContactContainer