import { useState,useRef} from 'react'
import { getToken, getUser } from '../helpers';
import axiosClient from '../axiosClient';
import ActiveUersContainer from './ActiveUersContainer';
import ContactHeaderSection from './ContactHeaderSection';
import FrindeOrGroupHeader from './FrindeOrGroupHeader';
import ConatctsBody from './ConatctsBody';
import { useInfiniteQuery } from '@tanstack/react-query';
import { usePathname } from 'next/navigation'
import useDisplayContact from '../hookes/useDisplayContact';

function Contact({setDisplayCreateGroup }) {
    const token=getToken() ;
    const pathname = usePathname()
    const [frindesOrGroups,setFrindesOrGroups]=useState(pathname.split("/")[2]==='group'?false:true) ; //true =>frindes ,flase=>groups  
    const contactBodyRef=useRef()
    const displayConatct=useDisplayContact(pathname) ;

    const {status,error,data,isFetchingNextPage,fetchNextPage}=useInfiniteQuery({
      queryKey:['contact',frindesOrGroups] ,
      queryFn :({pageParam })=>getContacts(pageParam ) ,
      initialPageParam: 1,
      getNextPageParam: (lastPage) =>{
        const last_page =parseInt(lastPage.last_page );
        const current_page=parseInt(lastPage.current_page) ;
        return last_page > current_page  ? current_page+1  : undefined;
      },
      staleTime:Infinity ,
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

    const handleScroll =() => {

      const scrollableDiv=contactBodyRef.current ;
      if (scrollableDiv.scrollHeight - scrollableDiv.scrollTop === scrollableDiv.clientHeight) {
        fetchNextPage()
      } 
             
    };

  return (
    <section ref={contactBodyRef} onScroll={()=>handleScroll()} className={`${displayConatct ? "flex":"hidden" } w-screen md:w-[40vw] lg:w-[35vw] overflow-y-auto bg-gray-900  h-full overflow-x-hidden relative top-0 z-10  flex-col flex-none  lg:max-w-sm transition-al  duration-300 ease-in-out`}>     
      <ContactHeaderSection setDisplayCreateGroup={setDisplayCreateGroup} />
      <FrindeOrGroupHeader  frindesOrGroups={frindesOrGroups}  setFrindesOrGroups={setFrindesOrGroups} />
      <ActiveUersContainer   />    
      <ConatctsBody status={status} isFetchingNextPage={isFetchingNextPage}   contact={data!=null ? data.pages.flatMap(item => item.data) :[]} loading={status=="pending"} frindesOrGroups={frindesOrGroups}  />
    </section>
  )
}

export default Contact