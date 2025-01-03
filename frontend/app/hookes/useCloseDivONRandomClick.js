import { useEffect,useCallback } from "react"
const useCloseDivONRandomClick= (diplayDiv,setDisplayDiv,divRef)=> {

    const handleClick=useCallback((e)=>{
       
        if( divRef.current && ! divRef.current.contains(e.target) ){
            setDisplayDiv(false) ;
        } 
    },[divRef,diplayDiv]) ; 
      
    useEffect(()=>{

        if(diplayDiv){
            window.addEventListener('mousedown',handleClick) ;
        }else{
            window.removeEventListener('mousedown',handleClick)
        }
        return ()=>{
            window.removeEventListener('mousedown',handleClick)
        }
    },[diplayDiv])

  
}

export default useCloseDivONRandomClick ;
