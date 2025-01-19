import { useState,useEffect } from 'react'
import { getToken ,getUser} from '../helpers';
import axiosClient from '../axiosClient';
import ActiveUersContainer from './ActiveUersContainer';
import ContactHeaderSection from './ContactHeaderSection';
import FrindeOrGroupHeader from './FrindeOrGroupHeader';
import ConatctsBody from './ConatctsBody';
import { cansolToken } from '../axiosClient';
import { usePathname } from 'next/navigation';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

function Contact({setDisplayCreateGroup }) {
    const [contact,setContact]=useState([]);
    const token=getToken() ;
    const user=getUser() ;
    const [loading,setLoading]=useState(false) ;
    const [pagination ,setPagination]=useState({last_page:1}) ;
    const [currentPage,setCurentPage]=useState(1) ;

    const [frindesOrGroups,setFrindesOrGroups]=useState(true) ; //true =>frindes ,flase=>groups  
    const pathname = usePathname()


    useEffect(()=>{
      setFrindesOrGroups( pathname.split("/")[2]==='group'?false:true)
    },[])

    
    useEffect(()=>{

      if(contact.length!=0){
        setContact(()=>[]) ;
      }
      
    },[frindesOrGroups])

    const {status,error,data,isFetchingNextPage,hasNextPage,fetchNextPage}=useInfiniteQuery({
      queryKey:['contact',frindesOrGroups] ,
      queryFn :()=>getContacts(currentPage) ,
      getNextPageParam: ()=>currentPage+1 ,
    })

    const getContacts = async(currentPage)=>{

      const url=`/api/contact/${frindesOrGroups==true ?'frindes':'groups'}?page=${currentPage}`
      const response= await axiosClient.get(url,{
      headers:{
          'Authorization': `Bearer ${token}`,
      }
      })
      return response.data ;
    }


  return (
    <section className={`left-0 bg-gray-900  md:left-0 overflow-y-auto  absolute md:relative top-0 z-10 md:flex flex-col flex-none w-full lg:max-w-sm md:w-5/12 transition-al  duration-300 ease-in-out`}>     
        
        <ContactHeaderSection setDisplayCreateGroup={setDisplayCreateGroup} />
     
        <FrindeOrGroupHeader setContact={setContact} frindesOrGroups={frindesOrGroups}  setFrindesOrGroups={setFrindesOrGroups} />
        <ActiveUersContainer   />
          
        <ConatctsBody  contact={data!=null ? data.pages.flatMap(item => item.data) :[]} loading={status=="pending"} currentPage={currentPage} setCurentPage={setCurentPage}   frindesOrGroups={frindesOrGroups}  />
    
    </section>
  )
}

export default Contact