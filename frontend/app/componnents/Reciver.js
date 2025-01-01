import React from 'react'

function Reciver({reciverUser}) {
  return (
    <div className="flex">
        <div className="w-12 h-12 mr-4 relative flex flex-shrink-0">
            <img className="shadow-md rounded-full w-full h-full object-cover"
                    src="https://randomuser.me/api/portraits/women/33.jpg"
                    alt=""
            />
                { reciverUser.is_online==1 && <div className="absolute bg-gray-900 p-1 rounded-full bottom-0 right-0">
                    <div className="bg-green-500 rounded-full w-3 h-3"></div>
                </div>
                }
        </div>
        <div className="text-sm flex flex-col  justify-center">
            <p className="font-bold">{reciverUser?.name}</p>
            {!reciverUser.is_online==1 && <p>Active {reciverUser.last_used_at}</p>}
        </div>
    </div>
  )
}

export default Reciver