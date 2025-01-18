import { useState,useEffect,useCallback } from "react"
import { getDifrnecInMinuts, getUser } from "../helpers";

export  const useBlocks=(messages)=> {

    const [blocks,setBlocks]=useState([]);

    //rerender the messages response into blocks of messages where each bolock contains messages that are 
    // sent or recived in the same time 

    const f=useCallback(()=>{
      
      console.log("block renderd")

      let i=0;
      const user=getUser() ;
      const data=messages.map((d)=> {
         d['reciv_or_sent']= d.user_id==user.id?1:0
         return d ;
      }) ;
      const b=[] ;
      while(i<data.length){
        let g=[];
        let j=0 ;
        g.push(data[i]) ;
        i++; 

        while(i<data.length && data[i].reciv_or_sent==g[j].reciv_or_sent){

          const diffInMinutes = getDifrnecInMinuts(data[i-1].time,data[i].time);
          if(diffInMinutes>=30){
             break ;
          }
          g.unshift(data[i])
          i++;  j++;
        }
        b.unshift(g) ;
      }
      setBlocks(b) ;
    },[messages])

    
    useEffect(()=>{
      f()
    },[messages])

    return {blocks}
}

export default useBlocks