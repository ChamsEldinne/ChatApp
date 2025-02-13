import React from 'react'
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import useCloseDivONRandomClick from '../hookes/useCloseDivONRandomClick';
import { useState,useRef } from 'react';

function PickerContainer({setMessage}) {

    const [displayPicker,setDisplayPicker]=useState(false) ;
    const pickerRef=useRef() ;

    function handelEmojiSelect(emoji){
        setMessage((prev)=>prev+emoji.native)       
    }

    useCloseDivONRandomClick(displayPicker,setDisplayPicker,pickerRef) ;

    
  return (
    <>
      <div className='absolute top-0 right-0 mt-2 mr-3 flex justify-center items-center gap-2'>
        <button onClick={()=>setDisplayPicker(!displayPicker)} type="button" className=" flex-shrink-0 focus:outline-none  text-blue-600 hover:text-blue-700 w-6 h-6">
          <svg viewBox="0 0 20 20" className="w-full h-full fill-current">
            <path d="M10 20a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM6.5 9a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm7 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm2.16 3a6 6 0 0 1-11.32 0h11.32z" />
          </svg>
        </button>
    </div> 
    <div ref={pickerRef} className={`${displayPicker? "":"hidden" } w-[70vw] md:w-full z-50 absolute bottom-12 right-2 `}>
      <Picker data={data} emojiSize={30}  perLine={7} skin={3} theme={"dark"} onEmojiSelect={handelEmojiSelect} />
    </div>
    </>
  )
}

export default PickerContainer