'use client'
import React from 'react'

function Reciver2({reciverUser=null,urlParams}) {
  return (
     <div className="flex flex-col justify-center items-center w-full">
          {
            reciverUser.type=='user' ?
          
            <div className="size-20 mr-4 relative flex flex-shrink-0">
                <img className="shadow-md rounded-full w-full h-full object-cover"
                        src="https://randomuser.me/api/portraits/women/33.jpg"
                        alt=""
                />
                    { reciverUser.is_online==1 && <div className="absolute bg-gray-900 p-1 rounded-full bottom-0 right-0">
                        <div className="bg-green-500 rounded-full w-3 h-3"></div>
                    </div>
                    }
            </div>
            :   
            <div className="size-12 mr-4 relative flex flex-shrink-0">
              <img className="shadow-md rounded-full size-8 object-cover absolute ml-6"
                    src="https://randomuser.me/api/portraits/men/22.jpg"
                    alt="User2"
              />
              <img className="shadow-md rounded-full size-8 object-cover absolute mt-6"
                    src="https://randomuser.me/api/portraits/men/55.jpg"
                    alt="User2"
              />
              <div className="absolute bg-gray-900 p-1 rounded-full bottom-0 right-0">
                  <div className="bg-green-500 rounded-full size-3"></div>
              </div>
            </div>
          } 
            <div className="text-xl text-center">
                <p className="font-bold">{reciverUser?.name}</p>
            </div>
        </div>
  )
}

export default Reciver2