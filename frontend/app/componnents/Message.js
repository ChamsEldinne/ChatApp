'use client'
import { getToken } from "../helpers";
import { useState ,useRef, memo} from "react";
import { useMutation,useQueryClient } from "@tanstack/react-query";
import LoadingSpiner from "./LoadingSpiner";
import useCloseDivONRandomClick from "../hookes/useCloseDivONRandomClick";
import LastReaderContainer from "./LastReaderContainer"
import { updateMessage , deleteMessage } from "../chat/fetch";

const Message=memo(({message,prevBlock,next,urlParams ,lastReadData=[] } )=>{
    const queryClient=useQueryClient() ;    
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
    const divRef=useRef() ;

    useCloseDivONRandomClick(update,setUpdate,divRef) ;
    const token=getToken() ;



    const updateFn=useMutation({
        mutationFn:()=>updateMessage(message.id,token),
        onSuccess:()=>{         
            queryClient.invalidateQueries({queryKey:['chat',urlParams.type,urlParams.id] ,exact:true})
        }
             
    })

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            updateFn.mutate() 
            setUpdate(false) ;
        }else if(event.key === 'Esc'){
            setUpdate(false) ;
        }
    };



    const deletFn=useMutation({
        mutationFn:()=>deleteMessage(message.id,token),
        onSuccess:()=>{      
            queryClient.invalidateQueries( {queryKey:['chat',urlParams.type,urlParams.id],exact:true})
        }

    })

    return (
        <div className="w-full">
            <div ref={divRef} className={`group flex flex-col  ${message.reciv_or_sent?"items-end":""}`}>
            <div className="flex items-center ">
                {
                    update ? 
                    <div className="flex flex-col">
                        <input  onKeyDown={handleKeyDown} value={updateVlaue}
                        autoFocus={true} onChange={(e)=>setUpdateValue(e.target.value)}
                        className={`px-6 py-3 rounded-full  max-w-xs lg:max-w-md border-gray-800 focus:border-gray-700 bg-gray-800  outline-none text-gray-200`} />          
                        <p>Press Enter To Update</p>
                    </div>
                    :
                    <div 
                    className={`px-6 py-3 ${prevBlock? "":"rounded-t-full"} ${next? "":"rounded-b-full"} ${message.reciv_or_sent?"rounded-l-full order-last bg-blue-500 ":"bg-gray-800  rounded-r-full " }  max-w-xs lg:max-w-md text-gray-200`}>
                
                    {updateFn.isPending || deletFn.isPending ? <LoadingSpiner/> : message.message}
                    </div>
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
                            <li onClick={()=>deletFn.mutate()} className="py-2 px-3 rounded-md cursor-pointer hover:bg-gray-700 transition-colors hover:text-gary-100" >Delete</li>
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
       
        {lastReadData.map((data)=>data.message_id==message.id ? <LastReaderContainer users={data.user_ids} />:""  ) } 
    </div>

    )
}) ;

export default Message