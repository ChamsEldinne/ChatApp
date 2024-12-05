'use client'
import axiosClient from "../axiosClient";
import { getToken } from "../helpers";
import { useState } from "react";
function Message({message,prev,next,setMessages}){
    const token=getToken() 

    const formatter = new Intl.DateTimeFormat('en-US', {
        // year: 'numeric',
        // month: 'short',
        // day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    });
    const [update,setUpdate]=useState(false) ;
    const [updateVlaue,setUpdateValue]=useState(message.message);
    const [displayList,setDisplayList]=useState(false) ;
    const updateMessage=async()=>{
        try{
            const response=await axiosClient.put(`/api/message/${message.id}`,{
              'message' : updateVlaue,
            },{
                headers:{
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }             
            })
           //console.log(response.data) ;
            setMessages((prev)=>prev.map((mes)=>message.id!==mes.id? mes:response.data.data))
        }catch(err){
           window.alert(err) 
        }finally{
            setUpdate(false) ;
        }
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
           updateMessage() 
        }else if(event.key === 'Esc'){
            window.alert(event.key)
            setUpdate(false) ;
        }
    };

    const deleteMessage=async ()=>{
        try{
            await axiosClient.delete(`/api/message/${message.id}`,{
                headers:{
                    'Authorization': `Bearer ${token}`,
                }             
            })
            setMessages((prev)=>prev.filter((mes)=>message.id!==mes.id))
        }catch(err){
            window.alert(err)
        }
    }

    return (
    <div className={`group flex flex-col  ${message.reciv_or_sent?"items-end":""}`}>
      <div className="flex items-center ">
        {
            update ? 
            <input  
            onKeyDown={handleKeyDown}
            value={updateVlaue}
            autoFocus={true}
            onChange={(e)=>setUpdateValue(e.target.value)}
            className={`px-6 py-3 rounded-full  max-w-xs lg:max-w-md border-gray-800 focus:border-gray-700 bg-gray-800  outline-none text-gray-200`} />          
            :
            <p 
            className={`px-6 py-3 ${prev? "":"rounded-t-full"} ${next? "":"rounded-b-full"} ${message.reciv_or_sent?"rounded-l-full order-last bg-blue-500 ":"bg-gray-800  rounded-r-full " }  max-w-xs lg:max-w-md text-gray-200`}>
            {message.message}
            </p>
        }
           
              
            <div className="flex items-center">
                <div className={`${!message.reciv_or_sent?"hidden":""} relative `} onMouseLeave={()=>setDisplayList(false)}>
                    <button type="button" onMouseEnter={()=>setDisplayList(true)} className="hidden group-hover:flex group  flex-shrink-0 focus:outline-none mx-2  rounded-full text-gray-500 hover:text-gray-900 hover:bg-gray-700 bg-gray-800 w-8 h-8 p-2">
                        <svg viewBox="0 0 20 20" className="w-full h-full fill-current">
                            <path d="M10.001,7.8C8.786,7.8,7.8,8.785,7.8,10s0.986,2.2,2.201,2.2S12.2,11.215,12.2,10S11.216,7.8,10.001,7.8z
                            M3.001,7.8C1.786,7.8,0.8,8.785,0.8,10s0.986,2.2,2.201,2.2S5.2,11.214,5.2,10S4.216,7.8,3.001,7.8z M17.001,7.8
                            C15.786,7.8,14.8,8.785,14.8,10s0.986,2.2,2.201,2.2S19.2,11.215,19.2,10S18.216,7.8,17.001,7.8z"/>
                        </svg>
                    </button>
                    <ul className={`${displayList? "flex":"hidden"} rounded-md z-10 p-1 absolute top-8 left-1/2 -translate-x-1/2 transition-all flex-col gap-1 bg-gray-800 text-gray-200  shadow-md `}>
                        <li onClick={()=>setUpdate(true)} className="py-2 px-3 rounded-md cursor-pointer hover:bg-gray-700 transition-colors hover:text-gary-100" >Edite</li>
                        <li onClick={()=>deleteMessage()} className="py-2 px-3 rounded-md cursor-pointer hover:bg-gray-700 transition-colors hover:text-gary-100" >Delete</li>
                    </ul>
                </div>
                <button type="button" className="hidden group-hover:flex  flex-shrink-0 focus:outline-none mx-2  rounded-full text-gray-500 hover:text-gray-900 hover:bg-gray-700 bg-gray-800 w-8 h-8 p-2">
                    <svg viewBox="0 0 20 20" className="w-full h-full fill-current">
                        <path d="M19,16.685c0,0-2.225-9.732-11-9.732V2.969L1,9.542l7,6.69v-4.357C12.763,11.874,16.516,12.296,19,16.685z"/>
                    </svg>
                </button>
                <button type="button" className="hidden group-hover:flex  flex-shrink-0 focus:outline-none mx-2  rounded-full text-gray-500 hover:text-gray-900 hover:bg-gray-700 bg-gray-800 w-8 h-8 p-2">
                    <svg viewBox="0 0 24 24" className="w-full h-full fill-current">
                        <path
                                d="M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-3.54-4.46a1 1 0 0 1 1.42-1.42 3 3 0 0 0 4.24 0 1 1 0 0 1 1.42 1.42 5 5 0 0 1-7.08 0zM9 11a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm6 0a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/>
                    </svg>
                </button>
            </div>
        </div>
        <p className={`hidden group-hover:block `}>{formatter.format(new Date(message.time))}</p>
    </div>
    )
  }

  export default Message