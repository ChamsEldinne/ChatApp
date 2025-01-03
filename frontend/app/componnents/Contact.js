import { useState,useEffect,useCallback } from 'react'
import { getToken ,getUser} from '../helpers';
import axiosClient from '../axiosClient';
import useEcho from '../hookes/useEcho';
import ActiveUersContainer from './ActiveUersContainer';
import ContactHeaderSection from './ContactHeaderSection';
import FrindeOrGroupHeader from './FrindeOrGroupHeader';
import ConatctsBody from './ConatctsBody';


function Contact({setDisplayedContact, displayChat ,setDisplayCreateGroup }) {
    const [contact,setContact]=useState([]);
    const token=getToken() ;
    const user=getUser() ;
    const [loading,setLoading]=useState(true) ;
    const [pagination ,setPagination]=useState({last_page:1}) ;
    const [currentPage,setCurentPage]=useState(1) ;

    const [frindesOrGroups,setFrindesOrGroups]=useState(true) ; //true =>frindes ,flase=>groups  

    // const echo = useEcho() ;

    // useEffect(()=>{
    //     if(echo && user){
    //         echo.private(`contact.${user.id}`)
    //         .listen('MessageSentEvent', (event) => {
            
    //             const freinde_id=event.message.user_id==user.id?event.message.messageable_id:event.message.user_id
    //             let tab= contact.map((cont)=>
    //                 cont.freinde_id==freinde_id ?
    //                     {...cont,message:event.message.message,lates_message_date:event.message.time}: cont
    //                 )

    //              tab.sort( (a, b) =>new Date( b.lates_message_date) - new Date(a.lates_message_date) )
    //              setContact(tab) ;
    //         });
    //     } 
    //  },[echo,contact])
    
    // useEffect(()=>{

    //   if(contact.length!=0){
    //     setContact(()=>[]) ;
    //   }
      
    // },[frindesOrGroups])

    useEffect(()=>{
        const getContacts = async()=>{
             if( currentPage<=pagination.last_page){
                try{
                    setLoading(true)
                    const url=`/api/contact/${frindesOrGroups?'frindes':'groups'}?page=${currentPage}`
                    const response= await axiosClient.get(url,{
                        headers:{
                            'Authorization': `Bearer ${token}`,
                        }
                    })
                    setContact((prev)=> [...response.data.data]) 
                    setPagination({last_page:response.data.last_page})

                  //  setDisplayedContact(response.data.data.length!=0 ? {reciver_id:response.data.data[0].freinde_id,group_or_friend:1} : null)

                    
                }catch(err){
                    window.alert(err) 
                }finally{
                    setLoading(false)
                }
            }
        }
        getContacts() ;
    },[currentPage,frindesOrGroups])

  return (
    <section className={`${displayChat? "-left-[100vw]":"left-0"} bg-gray-900  md:left-0 overflow-y-auto  absolute md:relative top-0 z-10 md:flex flex-col flex-none w-full lg:max-w-sm md:w-5/12 transition-al  duration-300 ease-in-out`}>     
        
        <ContactHeaderSection setDisplayCreateGroup={setDisplayCreateGroup} />
     
        <FrindeOrGroupHeader setContact={setContact} frindesOrGroups={frindesOrGroups}  setFrindesOrGroups={setFrindesOrGroups} />
        <ActiveUersContainer setDisplayedContact={setDisplayedContact}  />
          
        <ConatctsBody  contact={contact} loading={loading} currentPage={currentPage} setCurentPage={setCurentPage}  setDisplayedContact={setDisplayedContact} frindesOrGroups={frindesOrGroups}  />
    
    </section>
  )
}

export default Contact