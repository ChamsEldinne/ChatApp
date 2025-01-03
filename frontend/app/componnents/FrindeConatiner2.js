'use client'
import { useMemo,useState } from "react"

function FrindeConatiner2({user=null,setNewMemebers}) {

  const randomNumber=useMemo(()=> Math.floor(Math.random() * (100 )) + 1,[])
  const [isAdded,setIsAdded]=useState(false) ;

  function add(){
    setNewMemebers((prev)=>[...prev,user.id]) ;
    setIsAdded(true) ;
  }
  function cancel(){
    setNewMemebers((prev)=>prev.filter((u)=>u!=user.id))
    setIsAdded(false) ;
  }
  return (
    <div className="flex justify-between min-w-fit items-center cursor-pointer p-3 hover:bg-gray-800 rounded-lg relative">
        <div className="size-16 relative flex flex-shrink-0">
            <img className="shadow-md rounded-full w-full h-full object-cover"
                    src={`https://randomuser.me/api/portraits/men/${randomNumber}.jpg`}
                    alt=""
            />
        
        </div>
        <div className="flex-auto min-w-0 ml-4 mr-6 text-nowrap  block">
            <p className="font-bold text-gray-200">{user?.name}</p>
        </div>
        {isAdded?  
            <button onClick={()=>cancel()} className='text-gray-200 mx-4  hover:opacity-75  px-3 hover:shadow-md transition-colors rounded-md py-2 bg-gray-700 font-semibold'>Cancel</button>
                :
            <button onClick={()=>add()} className='text-gray-200 mx-4 hover:opacity-75  px-3 hover:shadow-md transition-colors rounded-md py-2 bg-gray-500 font-semibold'>+ Add</button>
        }  
    </div>
  )
}

export default FrindeConatiner2