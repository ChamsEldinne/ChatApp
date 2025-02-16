'use client'
import {useState,memo,useRef} from 'react'
import SideBar from './SideBar';
import useCloseDivONRandomClick from '../hookes/useCloseDivONRandomClick';
const ContactHeaderSection=memo( ({setDisplayCreateGroup})=>{
    
    const sideBarRef=useRef() ;
    const [dispalySidBar,setDispalySideBar ]=useState(false) ;

    useCloseDivONRandomClick(dispalySidBar,setDispalySideBar,sideBarRef) ;

    return (
        <div className="header z-20 md:p-4 p-2 flex flex-row justify-between items-center flex-none relative">
            <div ref={sideBarRef} id='sideBar' className='cursor-pointer' >
                <div className='p-2 hover:bg-gray-700 bg-gray-900 rounded-full'>
                  <svg onClick={()=>setDispalySideBar(!dispalySidBar)} title='plus' width="24px" height="24px" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M15 1H1V3H15V1Z" fill="#2563eb"></path> <path d="M1 5H15V7H1V5Z" fill="#2563eb"></path> <path d="M15 9H1V11H15V9Z" fill="#2563eb"></path> <path d="M11 13H1V15H11V13Z" fill="#2563eb"></path> </g></svg>
                </div>
                <div   className={`${dispalySidBar?"left-0":'-left-[500px]'} absolute transition-all ease-in  top-14 shadow-gray-800 shadow-lg`}>
                    <SideBar setDisplayCreateGroup={setDisplayCreateGroup}/>
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
    )
}) ;

export default ContactHeaderSection