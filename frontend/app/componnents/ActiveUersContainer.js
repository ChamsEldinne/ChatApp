'use client'
import { useEffect, useState } from "react";
import ActiveUserContainerLoading from "./ActiveUserContainerLoading";
import ActiveUserContainer from "./ActiveUserContainer";
import axiosClient from "../axiosClient";
import { getToken } from "../helpers";

function ActiveUersContainer({setDisplayedContact}) {
  const [data,setData]=useState([]) ;
  const [loading,setLoading]=useState(true)
  const token=getToken()  ;
  useEffect(()=>{
       const fetchData=async ()=>{
         try{
          setLoading(true) ;
          const response =await axiosClient.get('/api/activeFrindes',{
            headers:{
              'Authorization':`Bearer ${token}`
            }
          })
          setData(response.data) ;
         }catch(err){
          window.alert(err)
         }finally{
          setLoading(false)
         }
       }  
       fetchData() ; 
  },[])
  return (
    <div className="active-users flex flex-row items-center p-2  overflow-auto w-0 min-w-full">
      {loading && [1, 2, 3, 4,5,6,7].map((index) => (
        <ActiveUserContainerLoading key={index} />
      ))}
      {data.map((user,index)=><ActiveUserContainer setDisplayedContact={setDisplayedContact} key={index} user={user} />)}
    </div>
  );
}

export default ActiveUersContainer;
