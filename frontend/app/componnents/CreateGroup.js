'use client'
import useCloseDivONRandomClick from '../hookes/useCloseDivONRandomClick';
import FrindeConatiner2 from './FrindeConatiner2'
import { useRef,useState } from 'react'
import axiosClient from '../axiosClient';
import { getToken } from '../helpers';
import LoadingSpiner from './LoadingSpiner';
import { useQuery } from '@tanstack/react-query';

function CreateGroup({displayCreateGroup,setDisplayCreateGroup}) {

  const createGroupRef=useRef() ;

  useCloseDivONRandomClick(displayCreateGroup,setDisplayCreateGroup,createGroupRef) ;
  const token=getToken() ;
  const [loading,setLoading]=useState(false) ;
  const [groupName,setGroupName]=useState('') ;
  const [err,setErr]=useState(null) ;
  const [newMemebers,setNewMemebers]=useState([]) ;

  const fetchData= async()=>{

      const response=await axiosClient.get('/api/freindes',{
        headers:{
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }) ;
      return response.data

  }


  const {data,isLoading}=useQuery({
    queryFn:()=>fetchData() ,
    queryKey:['frindes'] ,
    staleTime:Infinity ,//time to cosider when the data is stale(old)
    placeHolderData:[] ,
  })

  async function CreateGroup(){
    try{
      setLoading(true)
      const response=await axiosClient.post('/api/group',{
        name:groupName ,
        members:newMemebers ,
      },{
        headers:{
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })      
      setDisplayCreateGroup(false) ;

    }catch(err){
      window.alert(err) ;
    }finally{
      setLoading(false) ;
    }
  }


  return (
    <div ref={createGroupRef} className={`${displayCreateGroup? "":"hidden"} overflow-hidden rounded-t-lg shadow-gray-800 shadow-xl absolute bottom-0 left-0 md:left-[20%] z-10 border-2 border-gray-700 bg-gray-900 `}>
      <div className=' w-screen overflow-y-auto  md:w-80 md:max-w-80 flex flex-col gap-4 text-gray-200 h-[96vh] md:h-[85vh] '>
          <div className='px-2 w-full sticky top-0  bg-gray-900 z-10 '>
              <label className='font-semibold' >Name Of The Group : </label>
              <div className='relative w-full h-fit'>
              <input value={groupName} onChange={(e)=>setGroupName(e.target.value)} type='text' className='bg-gray-800 outline-none p-2 w-full rounded-md' />
              <button onClick={()=>CreateGroup()} className='p-1 rounded-md bg-blue-500 hover:bg-blue-700 absolute right-1 top-1/2 -translate-y-1/2 '>{loading? <LoadingSpiner/>: "Submit"} </button>
              
              </div>
              {err!=null && <p className='hidden text-red-500 w-full'>{err} </p>}
          </div>
          
          <div className=' w-full flex flex-col '>
            <h1 className='text-sm font-semibold px-2' >Add New Members From Your Frindes :</h1>

            {data && data.map((user,index)=> <FrindeConatiner2 key={index} setNewMemebers={setNewMemebers} user={user} />)}

            {isLoading && <LoadingSpiner/>}

          </div>
      </div>
    </div>
  )
}

export default CreateGroup