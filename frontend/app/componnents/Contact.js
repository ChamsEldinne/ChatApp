import { useState,useEffect,useRef} from 'react'
import { getToken, getUser } from '../helpers';
import axiosClient from '../axiosClient';
import ActiveUersContainer from './ActiveUersContainer';
import ContactHeaderSection from './ContactHeaderSection';
import FrindeOrGroupHeader from './FrindeOrGroupHeader';
import ConatctsBody from './ConatctsBody';
import { useInfiniteQuery } from '@tanstack/react-query';
import { usePathname } from 'next/navigation'
import useEcho from '../hookes/useEcho';
import { useQueryClient } from '@tanstack/react-query';

function Contact({setDisplayCreateGroup }) {
    const token=getToken() ;
    const pathname = usePathname()
    const [frindesOrGroups,setFrindesOrGroups]=useState(pathname.split("/")[2]==='group'?false:true) ; //true =>frindes ,flase=>groups  
    const contactBodyRef=useRef()

    const user=getUser() ;


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
    const echo=useEcho() ;
    const queryClient=useQueryClient() ;

    useEffect(()=>{
      if(echo && user){
        const channle =echo.private(`contact.${user.id}`) ;
                  
        const event='contact' ;
  
        channle.listen(event, (event) => {
            
          console.log(event)
          // queryClient.setQueryData([],(oldData) => {
  
          //   if (!oldData) return; 
  
          // });
  
        });
  

      } 
    },[echo])

  return (
    <section ref={contactBodyRef} onScroll={()=>handleScroll()} className={`${pathname.split("/").length>2 && window.matchMedia("(max-width: 767px)").matches ? "hidden":"" } overflow-y-auto bg-gray-900  h-full overflow-x-hidden relative top-0 z-10 flex flex-col flex-none w-full lg:max-w-sm md:w-5/12 transition-al  duration-300 ease-in-out`}>     
      <ContactHeaderSection setDisplayCreateGroup={setDisplayCreateGroup} />
      <FrindeOrGroupHeader  frindesOrGroups={frindesOrGroups}  setFrindesOrGroups={setFrindesOrGroups} />
      <ActiveUersContainer   />    
      <ConatctsBody status={status} isFetchingNextPage={isFetchingNextPage}   contact={data!=null ? data.pages.flatMap(item => item.data) :[]} loading={status=="pending"} frindesOrGroups={frindesOrGroups}  />
    </section>
  )
}

export default Contact