import { useState,useEffect,useCallback } from "react"

export  const useBlocks=(messages)=> {

    const [blocks,setBlocks]=useState([]);

    //rerender the messages response into blocks of messages where each bolock contains messages that are 
    // sent or recived in the same time 

    const f=useCallback(()=>{
      let i=0;
      const data=messages ;
      const b=[] ;
      while(i<data.length){
        let g=[];
        let j=0 ;
        g.push(data[i]) ;
        i++; 
        while(i<data.length && data[i].reciv_or_sent==g[j].reciv_or_sent){
          const date1 = new Date(data[i-1].time);
          const date2 = new Date(data[i].time);
          const differenceInTime = date1.getTime() - date2.getTime();
          const diffInMinutes = differenceInTime / (1000 * 60);
          if(diffInMinutes>=30){
             break ;
          }
          g.unshift(data[i])
          i++; 
          j++;
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