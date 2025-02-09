import React from 'react'

function LastReaderContainer({users=[]}) {
  return (
    <div className="w-full gap-1 mt-2 flex justify-end">
      {users.map((user)=><img title={user?.id} className="size-4 object-cover rounded-full" src="https://randomuser.me/api/portraits/women/33.jpg" />)}
    </div>
  )
}

export default LastReaderContainer