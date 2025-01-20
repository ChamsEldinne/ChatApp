import LoadingSpiner from './LoadingSpiner';
import CntactContainerLoading from './CntactContainerLoading';
import ContactContainer from './ContactContainer';
import GroupContactContainer from './GroupContactContainer';
import Link from 'next/link';


function ConatctsBody({contact,frindesOrGroups ,status, isFetchingNextPage}) {



  return (
    <div  className="contacts mb-4 p-2 flex-1">   
          
      {contact.length==0 && status !="pending" && 
      <div className='w-full mt-6 grid place-items-center'>
        <Link href='/users' className='mx-auto font-semibold  cursor-pointer hover:text-blue-600 transition-colors'> + Make new Relations   </Link>
      </div> }

      {frindesOrGroups && contact.map((cont,index)=><ContactContainer   key={index}  cont={cont} />)}
  
      {!frindesOrGroups && contact.map((cont,index)=><GroupContactContainer   key={index}  cont={cont} />)}

      {status=="pending" &&[1,2,3,4,5,6].map((i)=><CntactContainerLoading key={i} />) }
      {isFetchingNextPage && <div className='flex w-full mb-8 justify-center' ><LoadingSpiner/></div>}


    </div> 
  )
}

export default ConatctsBody