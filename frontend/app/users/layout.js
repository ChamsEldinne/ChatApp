'use client'
import SidBar2 from '../componnents/SidBar2'
import { useState,useRef,useEffect } from 'react';
import { useRouter } from 'next/navigation';

function UsersLayout({children}) {
  const [dispalySidBar,setDispalySideBar ]=useState(false) ;
  const sideBarRef=useRef() ;
  const [selctedRoute,setSlectedRoute]=useState('users');
  const router=useRouter()


  function handleClick(e){
    if( sideBarRef.current && ! sideBarRef.current.contains(e.target) ){
        setDispalySideBar(false) ;
    } 
  }

  useEffect(()=>{
  
    const url = window.location.href
    const lastSegment = url.split('/').pop()
    setSlectedRoute(lastSegment) ;
    // console.log(url.)

  },[])


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
    <div className='flex h-[96vh] w-full'>
      <div ref={sideBarRef} id='sideBar' className='cursor-pointer z-50' onClick={()=>setDispalySideBar(!dispalySidBar)} title='plus'>
          <svg width="24px" className='md:hidden' height="24px" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M15 1H1V3H15V1Z" fill="#2563eb"></path> <path d="M1 5H15V7H1V5Z" fill="#2563eb"></path> <path d="M15 9H1V11H15V9Z" fill="#2563eb"></path> <path d="M11 13H1V15H11V13Z" fill="#2563eb"></path> </g></svg>
          <div   className={`${dispalySidBar?"left-0":'-left-[500px]'} md:left-0 md:relative absolute transition-all ease-in  top-14 shadow-gray-800 md:shadow-none shadow-lg`}>
            <SidBar2  selctedRoute={selctedRoute} setSlectedRoute={setSlectedRoute}/>
          </div>
      </div>
   
       <div className='w-screen md:w-full'>
         {children}
       </div>
    </div>
  )
}
export default UsersLayout ;

