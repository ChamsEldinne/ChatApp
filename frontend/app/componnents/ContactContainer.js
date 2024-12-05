import React from 'react'

function ContactContainer({cont,setDisplayedContact ,setDisplauChat,setMessages}) {
  return (
    <div onClick={()=>{
            setDisplayedContact({reciver_id:cont.freinde_id,group_or_friend:1});
            setDisplauChat(true) ;
            setMessages([])
        }}
        className="flex justify-between items-center p-3 cursor-pointer hover:bg-gray-800 rounded-lg relative">
        <div className="w-16 h-16 relative flex flex-shrink-0">
            <img className="shadow-md rounded-full w-full h-full object-cover"
                src="https://randomuser.me/api/portraits/women/61.jpg"
                alt=""
            />
        </div>
        <div className="flex-auto min-w-0 ml-4 mr-6 block">
            <p className={`font-bold`} >{cont.freinde_name}</p>
            <div className="flex items-center text-sm text-gray-600">
                <div className="min-w-0">
                    <p className="truncate font-bold">{cont.message}</p>
                </div>
                <p className="ml-2 whitespace-no-wrap">{cont.lates_message_date}</p>
            </div>
        </div>
    </div>
  )
}

export default ContactContainer