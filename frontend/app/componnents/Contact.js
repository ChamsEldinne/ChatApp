import React from 'react'
import { useState,useEffect,useRef } from 'react'
import { getToken ,getUser} from '../helpers';
import CntactContainerLoading from './CntactContainerLoading';
import ContactContainer from './ContactContainer';
import axiosClient from '../axiosClient';
import SideBar from './SideBar';
import LoadingSpiner from './LoadingSpiner';
import useEcho from '../hookes/useEcho';
import ActiveUersContainer from './ActiveUersContainer';

function Contact({setDisplayedContact, displayChat,setDisplauChat,setMessages }) {
    const [dispalySidBar,setDispalySideBar ]=useState(false) ;
    const [contact,setContact]=useState([]);
    const token=getToken() ;
    const user=getUser() ;
    const [loading,setLoading]=useState(true) ;
    const [pagination ,setPagination]=useState({last_page:1}) ;
    const [currentPage,setCurentPage]=useState(1) ;
    const contactRef=useRef()
    const sideBarRef=useRef() ;

    const echo=useEcho() ;
    useEffect(()=>{
        if(echo && user){
            echo.private(`contact.${user.id}`)
            .listen('MessageSentEvent', (event) => {
            
                const freinde_id=event.message.user_id==user.id?event.message.messageable_id:event.message.user_id
                let tab= contact.map((cont)=>
                    cont.freinde_id==freinde_id ?
                        {...cont,message:event.message.message,lates_message_date:event.message.time}: cont
                    )

                 tab.sort( (a, b) =>new Date( b.lates_message_date) - new Date(a.lates_message_date) )
                 setContact(tab) ;
            });
        } 
    },[echo,contact])
    


    useEffect(()=>{
        const getMessanger= async()=>{
             if( currentPage<=pagination.last_page){
                try{
                    setLoading(true)
                    const response= await axiosClient.get(`api/getMessanger?page=${currentPage}`,{
                        headers:{
                            'Authorization': `Bearer ${token}`,
                        }
                    })
                    setContact([...contact,...response.data.data]) 
                    setPagination({last_page:response.data.last_page})
                    setDisplayedContact(response.data.data.length!=0 ? {reciver_id:response.data.data[0].freinde_id,group_or_friend:1} : null)
                }catch(err){
                    window.alert(err) 
                }finally{
                    setLoading(false)
                }
            }
        }
        getMessanger() ;
    },[currentPage])

    const scrollableDiv=contactRef.current ;
    const handleScroll =() => {

        if (scrollableDiv.scrollHeight - scrollableDiv.scrollTop === scrollableDiv.clientHeight) {
            setCurentPage(currentPage+1);
        }
    };

    function handleClick(e){
        if( sideBarRef.current && ! sideBarRef.current.contains(e.target) ){
            setDispalySideBar(false) ;
        } 
    }

    useEffect(()=>{
   
        if(dispalySidBar){
            window.addEventListener('mousedown',handleClick) ;
        }else{
            window.removeEventListener('mousedown',handleClick)
        }


		return ()=>{
			window.removeEventListener('mousedown',handleClick)
        }
	},[dispalySidBar])


  return (
    <section className={`${displayChat? "-left-[100vw]":"left-0"} bg-gray-900  h-full  md:left-0 overflow-y-auto  absolute md:relative top-0 z-10 md:flex flex-col flex-none w-full lg:max-w-sm md:w-5/12 transition-al  duration-300 ease-in-out`}>     
        <div className="header z-10 p-4 flex flex-row justify-between items-center flex-none relative">
            <div ref={sideBarRef} id='sideBar' className='cursor-pointer' onClick={()=>setDispalySideBar(!dispalySidBar)} title='plus'>
                <svg width="24px" height="24px" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M15 1H1V3H15V1Z" fill="#2563eb"></path> <path d="M1 5H15V7H1V5Z" fill="#2563eb"></path> <path d="M15 9H1V11H15V9Z" fill="#2563eb"></path> <path d="M11 13H1V15H11V13Z" fill="#2563eb"></path> </g></svg>
                <div   className={`${dispalySidBar?"left-0":'-left-[500px]'} absolute transition-all ease-in  top-14 shadow-gray-800 shadow-lg`}>
                    <SideBar/>
                </div>
            </div>
            <p className="text-md font-bold  block">Messenger</p>
            <a  href="#" className=" rounded-full hover:bg-gray-700 bg-gray-800 w-10 h-10 p-2 block">
                <svg viewBox="0 0 24 24" className="w-full h-full fill-current">
                    <path
                            d="M6.3 12.3l10-10a1 1 0 0 1 1.4 0l4 4a1 1 0 0 1 0 1.4l-10 10a1 1 0 0 1-.7.3H7a1 1 0 0 1-1-1v-4a1 1 0 0 1 .3-.7zM8 16h2.59l9-9L17 4.41l-9 9V16zm10-2a1 1 0 0 1 2 0v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6c0-1.1.9-2 2-2h6a1 1 0 0 1 0 2H4v14h14v-6z"/>
                </svg>
            </a>
           
        </div>
        <div className="search-box p-4 flex-none">
            <form >
                <div className="relative">
                    <label>
                        <input className="rounded-full py-2 pr-6 pl-10 w-full border border-gray-800 focus:border-gray-700 bg-gray-800 focus:bg-gray-900 focus:outline-none text-gray-200 focus:shadow-md transition duration-300 ease-in"
                            type="text" placeholder="Search Messenger"/>
                        <span className="absolute top-0 left-0 mt-2 ml-3 inline-block">
                            <svg viewBox="0 0 24 24" className="w-6 h-6">
                                <path fill="#bbb"
                                    d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z"/>
                            </svg>
                        </span>
                    </label>
                </div>
            </form>
        </div>
        <ActiveUersContainer setDisplayedContact={setDisplayedContact} setDisplauChat={setDisplauChat} setMessages={setMessages} />
        <div ref={contactRef} onScroll={()=>handleScroll()} className="contacts mb-4 h-fit p-2 flex-1 overflow-y-auto">   
            {contact.length==0 && !loading && 
            <div className='w-full mt-6 grid place-items-center'>
               <a href='/users' className='mx-auto font-semibold  cursor-pointer hover:text-blue-600 transition-colors'> +Add Frindes </a>
            </div> }
            {contact.map((cont,index)=><ContactContainer setMessages={setMessages}  key={index} setDisplauChat={setDisplauChat} setDisplayedContact={setDisplayedContact} cont={cont} />)}
            {loading && currentPage==1 &&[1,2,3,4,5,6].map((i)=><CntactContainerLoading key={i} />) }
            {loading && currentPage>1 && <div className='flex w-full mb-8 justify-center' ><LoadingSpiner/></div>}
            {/* <ContactContainer2/> */}
        </div> 
    </section>
  )
}

export default Contact