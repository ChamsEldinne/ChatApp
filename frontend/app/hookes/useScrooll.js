import {useState,useEffect} from 'react' ;

const useScrooll=(chatBodyRef,fetchNextPage)=>{

    const [lastScrollTop, setLastScrollTop] = useState(0);
    const [scrollToBottomn,setScrollToBottomn]=useState(false) ;
      
    useEffect(() => {
        const div=chatBodyRef.current ;

        const handleScroll = () => {    
            const currentScrollTop = div.pageYOffset || div.scrollTop;
            
            // Check if the user reached the bottom of the body
            if (div.scrollTop + div.clientHeight >= div.scrollHeight){
                setScrollToBottomn(false)
            }
            // Check if the user is scrolling upwards
            if (currentScrollTop < lastScrollTop) {
                setScrollToBottomn(true)
            } 
            // Check if the user reached the top of the body
            if (div.scrollTop === 0 ) {
                fetchNextPage() ;
            }
            setLastScrollTop(currentScrollTop);
        };
    
        div.addEventListener('scroll', handleScroll);
    
        return () => {
            div.removeEventListener('scroll', handleScroll);
        };
    }, [lastScrollTop]);

    return [scrollToBottomn,setScrollToBottomn] ;
}

export default useScrooll ;