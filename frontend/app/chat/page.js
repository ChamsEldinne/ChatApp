'use client'
import { useState,useEffect } from "react";
import NoSelectedContact from "../componnents/NoSelectedContact";

export default function Home() {

  const [displayChat,setDisplauChat]=useState(false) ;

  useEffect(()=>{
    setDisplauChat(!window.matchMedia("(max-width: 767px)").matches) ;
  },[])

  return ( 
    displayChat &&
     <NoSelectedContact  />
  );
}
