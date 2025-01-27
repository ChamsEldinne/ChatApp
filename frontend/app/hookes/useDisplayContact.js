import { useState, useEffect } from "react";

const useDisplayContact = (pathname) => {
  
  const [displayContact, setDisplayContact] = useState(true);

  useEffect(() => {
    const updateDisplayContact = () => {
      const isMobile = window.matchMedia("(max-width: 767px)").matches;
      setDisplayContact(!isMobile || pathname.split("/").length <=2 );
      // window.alert(isMobile) ;
    };

    updateDisplayContact(); // Initial check on component mount

    const handleResize = () => {
      updateDisplayContact();
    };

    window.addEventListener("resize", handleResize);

    // Cleanup event listener on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [pathname]);

  return  displayContact ;
};

export default useDisplayContact;
