
import { useState,useRef,useEffect } from 'react';
import { getToken } from '../helpers';
import axiosClient from '../axiosClient';
import ChatHeader from './ChatHeader';
import ChatBody from './ChatBody';
import ChatFooter from './ChatFooter';
import NoSelectedContact from './NoSelectedContact';

function Chat({displayChat ,setDisplauChat,messages,setMessages ,displayedContact ,currentPage,setCurentPage}) {

    const token=getToken() ;
    const chatBodyRef=useRef() ;
    const [loading,setLoading]=useState(false)
    const [pagination ,setPagination]=useState({last_page:1,current_page:1}) ;
    const [reciverUser,setReciverUser]=useState({name:"",is_online:0});
    const [reciverLoading,setReciverLoading]=useState(true) ;

    const [isTyping,setIstyping]=useState(false) ;

    const fetchMessages =async(c)=>{
        try{
            if(!loading && displayedContact){
                setLoading(true)

                const url=`/api/messages/${displayedContact.group_or_friend==1 ?"frinde":"group"}?page=${c}`
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
            fetchMessages(1); 
        }

    },[displayedContact])

    useEffect(()=>{
        if(currentPage>1){
            fetchMessages(currentPage) ;
        }
    },[currentPage]) ;



  

  return (
     (displayedContact==null) ?
      <NoSelectedContact displayChat={displayChat} /> :
    <section className={`${displayChat? "flex":"hidden" } z-10 md:flex flex-col flex-auto bg-gray-900 border-l relative border-gray-800`}>

         <ChatHeader displayedContact={displayedContact} setDisplauChat={setDisplauChat} reciverUser={reciverUser} reciverLoading={reciverLoading} />
         <ChatBody isTyping={isTyping}  chatBodyRef={chatBodyRef} displayedContact={displayedContact} messages={messages} pagination={pagination}  setCurentPage={setCurentPage} loading={loading} currentPage={currentPage} setMessages={setMessages}  />
         <ChatFooter setIstyping={setIstyping} setMessages={setMessages} displayedContact={displayedContact} />
    
    </section>
  )
}

export default Chat