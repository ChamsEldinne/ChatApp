'use client'
import ActiveUserContainerLoading from "./ActiveUserContainerLoading";
import ActiveUserContainer from "./ActiveUserContainer";
import axiosClient from "../axiosClient";
import { getToken } from "../helpers";

import { useQuery } from "@tanstack/react-query";

function ActiveUersContainer() {

  const token=getToken()  ;

  const {data,isLoading}=useQuery({
    queryKey:["activeFr"] ,
    queryFn:()=>fetchData() ,
  })

  const fetchData=async ()=>{
    const response =await axiosClient.get('/api/activeFrindes',{
      headers:{
        'Authorization':`Bearer ${token}`
      }
    })
    return response.data ;
    
  }  
  return (
    <div className="active-users flex flex-row items-center p-2  overflow-auto w-0 min-w-full">
      {isLoading && [1, 2, 3, 4,5,6,7].map((index) => (
        <ActiveUserContainerLoading key={index} />
      ))}
      {data && data.map((user,index)=><ActiveUserContainer  key={index} user={user} />)}
    </div>
  );
}

export default ActiveUersContainer;
