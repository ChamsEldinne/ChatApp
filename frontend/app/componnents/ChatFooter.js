'use client'
import { useState ,useEffect } from 'react';
import React from 'react'
import { getToken } from '../helpers';
import axiosClient from '../axiosClient';

function ChatFooter({setMessages,displayedContact}) {

    const [displayButtuns,setDisplyaButtuns]=useState(false)
    const [loadingOnMessageSending,setLoadingOnMessageSending]=useState(false)
    const [message,setMessage]=useState("") ;
    const [error,setError]=useState(false) ;

    const token=getToken() ;
    
    async function sendMessage(e){
        e.preventDefault()
        if(displayedContact && !loadingOnMessageSending){
            try{
                setLoadingOnMessageSending(true) ;
                const url=`/api/sendeMessage/${displayedContact.group_or_friend==1? "frinde":"group"} `
                const response=await axiosClient.post(url,{
                    'message' : message,
                  //  'group_or_friend' :1, // 1 user ,0 group 
                    'reciver_id':displayedContact.reciver_id ,
                },{
                    headers:{
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }             
                })

                setMessage("") ;
                setMessages((prev)=> [response.data.data,...prev])
            }catch(err){
                if(err.status==422){
                   setError(true)
                }else{
                    window.alert(err) ;
                }
            }finally{
                setLoadingOnMessageSending(false) ;
            }
        }
    }

    function handleInputChange(e){
        setMessage(e.target.value) ;
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
          sendMessage(event)
        }
    };

    useEffect(()=>{
        if(error){
            setTimeout(()=>{
                setError(false) ;
            },2000)
        }
    },[error])

  return (
    <div className="chat-footer flex-none ">
        <div className="flex flex-row items-center p-4">
            <button type="button" className="flex flex-shrink-0 focus:outline-none mx-2  text-blue-600 hover:text-blue-700 w-6 h-6">
                <svg viewBox="0 0 20 20" className="w-full h-full fill-current">
                    <path d="M10,1.6c-4.639,0-8.4,3.761-8.4,8.4s3.761,8.4,8.4,8.4s8.4-3.761,8.4-8.4S14.639,1.6,10,1.6z M15,11h-4v4H9  v-4H5V9h4V5h2v4h4V11z"/>
                </svg>
            </button>
            <button type="button" className={`${displayButtuns?"flex":"hidden" } md:flex flex-shrink-0 focus:outline-none mx-2  text-blue-600 hover:text-blue-700 w-6 h-6`}>
                <svg viewBox="0 0 20 20" className="w-full h-full fill-current">
                    <path d="M11,13 L8,10 L2,16 L11,16 L18,16 L13,11 L11,13 Z M0,3.99406028 C0,2.8927712 0.898212381,2 1.99079514,2 L18.0092049,2 C19.1086907,2 20,2.89451376 20,3.99406028 L20,16.0059397 C20,17.1072288 19.1017876,18 18.0092049,18 L1.99079514,18 C0.891309342,18 0,17.1054862 0,16.0059397 L0,3.99406028 Z M15,9 C16.1045695,9 17,8.1045695 17,7 C17,5.8954305 16.1045695,5 15,5 C13.8954305,5 13,5.8954305 13,7 C13,8.1045695 13.8954305,9 15,9 Z" />
                </svg>
            </button>
            <button type="button" className={`${displayButtuns?"flex":"hidden" } md:flex  flex-shrink-0 focus:outline-none mx-2  text-blue-600 hover:text-blue-700 w-6 h-6`}>
                <svg viewBox="0 0 20 20" className="w-full h-full fill-current">
                    <path d="M0,6.00585866 C0,4.89805351 0.893899798,4 2.0048815,4 L5,4 L7,2 L13,2 L15,4 L17.9951185,4 C19.102384,4 20,4.89706013 20,6.00585866 L20,15.9941413 C20,17.1019465 19.1017876,18 18.0092049,18 L1.99079514,18 C0.891309342,18 0,17.1029399 0,15.9941413 L0,6.00585866 Z M10,16 C12.7614237,16 15,13.7614237 15,11 C15,8.23857625 12.7614237,6 10,6 C7.23857625,6 5,8.23857625 5,11 C5,13.7614237 7.23857625,16 10,16 Z M10,14 C11.6568542,14 13,12.6568542 13,11 C13,9.34314575 11.6568542,8 10,8 C8.34314575,8 7,9.34314575 7,11 C7,12.6568542 8.34314575,14 10,14 Z"/>
                </svg>
            </button>
            <button type="button" className={`${displayButtuns?"flex":"hidden" } md:flex flex-shrink-0 focus:outline-none mx-2  text-blue-600 hover:text-blue-700 w-6 h-6`}>
                <svg viewBox="0 0 20 20" className="w-full h-full fill-current">
                    <path d="M9,18 L9,16.9379599 C5.05368842,16.4447356 2,13.0713165 2,9 L4,9 L4,9.00181488 C4,12.3172241 6.6862915,15 10,15 C13.3069658,15 16,12.314521 16,9.00181488 L16,9 L18,9 C18,13.0790094 14.9395595,16.4450043 11,16.9378859 L11,18 L14,18 L14,20 L6,20 L6,18 L9,18 L9,18 Z M6,4.00650452 C6,1.79377317 7.79535615,0 10,0 C12.209139,0 14,1.79394555 14,4.00650452 L14,8.99349548 C14,11.2062268 12.2046438,13 10,13 C7.790861,13 6,11.2060545 6,8.99349548 L6,4.00650452 L6,4.00650452 Z" />
                </svg>
            </button>
            <div className="relative flex-grow">
                <label>
                    <input onFocus={()=> {setDisplyaButtuns(false)}} 
                    
                    onBlur={()=>setDisplyaButtuns(true)} 
                    className={`${error? "border-red-500":""} rounded-full py-2  pl-3 pr-10 w-full group border border-gray-800 focus:border-gray-700 bg-gray-800 focus:bg-gray-900 focus:outline-none text-gray-200 focus:shadow-md transition duration-300 ease-in`}
                        type="text" value={message} onChange={(e)=>handleInputChange(e) } placeholder="Aa"
                        onKeyDown={handleKeyDown}/>
                    <div className='absolute top-0 right-0 mt-2 mr-3 flex justify-center items-center gap-2'>
                        <button type="button" className=" flex-shrink-0 focus:outline-none  text-blue-600 hover:text-blue-700 w-6 h-6">
                            <svg viewBox="0 0 20 20" className="w-full h-full fill-current">
                                <path d="M10 20a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM6.5 9a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm7 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm2.16 3a6 6 0 0 1-11.32 0h11.32z" />
                            </svg>
                        </button>
                    </div>     
                </label>
            </div>
            <button onClick={(e)=>sendMessage(e)} type="button" className=" flex flex-shrink-0 focus:outline-none mx-2  text-blue-600 hover:text-blue-700  ">
                            <svg width="34px" height="34px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M16.1391 2.95907L7.10914 5.95907C1.03914 7.98907 1.03914 11.2991 7.10914 13.3191L9.78914 14.2091L10.6791 16.8891C12.6991 22.9591 16.0191 22.9591 18.0391 16.8891L21.0491 7.86907C22.3891 3.81907 20.1891 1.60907 16.1391 2.95907ZM16.4591 8.33907L12.6591 12.1591C12.5091 12.3091 12.3191 12.3791 12.1291 12.3791C11.9391 12.3791 11.7491 12.3091 11.5991 12.1591C11.3091 11.8691 11.3091 11.3891 11.5991 11.0991L15.3991 7.27907C15.6891 6.98907 16.1691 6.98907 16.4591 7.27907C16.7491 7.56907 16.7491 8.04907 16.4591 8.33907Z" fill="#2363ef"></path> </g></svg>
            </button>
            <button type="button" className="group-focus:hidden flex flex-shrink-0 focus:outline-none mx-2  text-blue-600 hover:text-blue-700 w-6 h-6">
                <svg viewBox="0 0 20 20" className="w-full h-full fill-current">
                    <path d="M11.0010436,0 C9.89589787,0 9.00000024,0.886706352 9.0000002,1.99810135 L9,8 L1.9973917,8 C0.894262725,8 0,8.88772964 0,10 L0,12 L2.29663334,18.1243554 C2.68509206,19.1602453 3.90195042,20 5.00853025,20 L12.9914698,20 C14.1007504,20 15,19.1125667 15,18.000385 L15,10 L12,3 L12,0 L11.0010436,0 L11.0010436,0 Z M17,10 L20,10 L20,20 L17,20 L17,10 L17,10 Z"/>
                </svg>
            </button>
        </div>
    </div>
  )
}

export default ChatFooter