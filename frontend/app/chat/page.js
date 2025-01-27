'use client'
import React from 'react'
import { useEffect, useState } from "react";


function NoSelectedContact() {
  const [display, setDisplay] = useState(true);
  useEffect(() => {
    const updateDisplay = () => {
      const isMobile = window.matchMedia("(max-width: 767px)").matches;
      setDisplay(!isMobile);
    };

    updateDisplay();

    const handleResize = () => {
      updateDisplay();
    };

    window.addEventListener("resize", handleResize);

    // Cleanup event listener on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className={` ${!display?"hidden":"flex"} w-full z-10  justify-center items-center bg-gray-900 border-l relative border-gray-800`} >
          <h1 className='text-xl text-center text-gray-200 font-semibold'>No Selected Contact !</h1>
    </div>
  )
}

export default NoSelectedContact
