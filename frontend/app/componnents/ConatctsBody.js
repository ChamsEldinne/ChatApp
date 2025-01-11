'use client'
import LoadingSpiner from './LoadingSpiner';
import CntactContainerLoading from './CntactContainerLoading';
import ContactContainer from './ContactContainer';
import GroupContactContainer from './GroupContactContainer';
import { useRef } from 'react';


function ConatctsBody({contact,loading,currentPage,setCurentPage,setDisplayedContact,frindesOrGroups}) {

    const contactBodyRef=useRef()

    const handleScroll =() => {

        const scrollableDiv=contactBodyRef.current ;
        if (scrollableDiv.scrollHeight - scrollableDiv.scrollTop === scrollableDiv.clientHeight) {
            setCurentPage(currentPage+1);
        }
    };

  return (
    <div ref={contactBodyRef} onScroll={()=>handleScroll()} className="contacts mb-4 h-fit p-2 flex-1 overflow-y-auto">   
          
        {contact.length==0 && !loading && 
        <div className='w-full mt-6 grid place-items-center'>
          <a href='/users' className='mx-auto font-semibold  cursor-pointer hover:text-blue-600 transition-colors'> + Make new Relations   </a>
        </div> }
        {frindesOrGroups && contact.map((cont,index)=><ContactContainer   key={index}  setDisplayedContact={setDisplayedContact} cont={cont} />)}
    
        {!frindesOrGroups && contact.map((cont,index)=><GroupContactContainer   key={index}  setDisplayedContact={setDisplayedContact} cont={cont} />)}

        {loading && currentPage==1 &&[1,2,3,4,5,6].map((i)=><CntactContainerLoading key={i} />) }
        {loading && currentPage>1 && <div className='flex w-full mb-8 justify-center' ><LoadingSpiner/></div>}


    </div> 
  )
}

export default ConatctsBody