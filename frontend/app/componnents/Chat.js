import React from 'react'
import { useState,useRef,useEffect } from 'react';
import { getToken } from '../helpers';
import axiosClient from '../axiosClient';
import ChatHeader from './ChatHeader';
import ChatBody from './ChatBody';
import ChatFooter from './ChatFooter';

function Chat({displayChat ,setDisplauChat,messages,setMessages ,displayedContact}) {

    const token=getToken() ;
    const chatBodyRef=useRef() ;
    const [loading,setLoading]=useState(false)
    const [pagination ,setPagination]=useState({last_page:1,current_page:1}) ;
    const [currentPage,setCurentPage]=useState(1) ;
    const [reciverUser,setReciverUser]=useState({name:"",is_online:0});
    const [reciverLoading,setReciverLoading]=useState(true) ;

    const fetchMessages=async()=>{

        try{
            if(!loading && displayedContact){
                setLoading(true)

                const url=`/api/messages/${displayedContact.group_or_friend==1 ?"frinde":"group"}?page=${currentPage}`
                const response = await axiosClient.get(url, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    params: {
                        reciver_id: displayedContact.reciver_id,
                    }
                });  
                setMessages((prev)=>[...prev,...response.data.messages]) 
                setPagination(response.data.pagination) ;
                setReciverUser(response.data.reciver[0]) ;
            
            }
           
        }catch(err){
            window.alert(err) ;
        }finally{
            setLoading(false)
            setReciverLoading(false) ;
        }
    }

    useEffect(()=>{
        if(displayedContact){
            fetchMessages() ;
        }
    },[displayedContact,currentPage])

  return (
  (  displayedContact==null) ?
    <div className={`${displayChat? "flex":"hidden" } w-full z-10  justify-center items-center bg-gray-900 border-l relative border-gray-800`} >
          <h1 className='text-xl text-center text-gray-200 font-semibold'>No Selected Contact !</h1>
    </div> :
    <section className={`${displayChat? "flex":"hidden" } z-10 md:flex flex-col flex-auto bg-gray-900 border-l relative border-gray-800`}>
        <div className='flex rounded-full hover:bg-gray-700 bg-gray-700 md:hidden justify-center items-center w-10 h-10 p-1 cursor-pointer' onClick={()=>setDisplauChat(false)}>
         <svg width="24px" height="24px" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path fill="#2563eb" d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z"></path><path fill="#2563eb" d="m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z"></path></g></svg>
        </div>
         <ChatHeader reciverUser={reciverUser} reciverLoading={reciverLoading} />
         <ChatBody  chatBodyRef={chatBodyRef} displayedContact={displayedContact} messages={messages} pagination={pagination}  setCurentPage={setCurentPage} loading={loading} currentPage={currentPage} setMessages={setMessages}  />
         <ChatFooter setMessages={setMessages} displayedContact={displayedContact} />
    </section>
  )
}

export default Chat