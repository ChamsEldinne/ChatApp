import React from 'react'

function FrindeOrGroupHeader({frindesOrGroups,setFrindesOrGroups}) {
  return (
    <header className='flex sticky top-2  z-10 items-center gap-2 px-2 w-full  ' >
        <h1 onClick={()=>{  setFrindesOrGroups(true) }} className={`${frindesOrGroups ?"bg-gray-600" :"bg-gray-800"} text-xl cursor-pointer text-center w-1/2 p-2 hover:bg-gray-600 rounded-lg transition-all`}>Frindes</h1>
        <h1 onClick={()=>{ setFrindesOrGroups(false) }} className={`${!frindesOrGroups ?"bg-gray-600" :"bg-gray-800"} text-xl cursor-pointer text-center w-1/2 p-2 hover:bg-gray-600 rounded-lg transition-all`}>Groups</h1>
   </header>
  )
}

export default FrindeOrGroupHeader