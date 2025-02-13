import React from 'react'

function LastReaderContainer({users=[]}) {

  return (
    <div className="w-full gap-1 mt-2 flex justify-end">
      <h1 className='text-xs opacity-50 text-gray-200'>Vu:</h1>
      {users.map((u)=> <img key={u.id} title={u?.id} className="size-4 object-cover rounded-full" src="https://randomuser.me/api/portraits/women/33.jpg" />)}
    </div>
  )
}

export default LastReaderContainer