'use client'
import { useRouter } from 'next/navigation';
import { svgsRepo } from '../svgsRepo';
import { useState } from 'react';
import Link from 'next/link';
function SideBar({setDisplayCreateGroup}) {
    const [displayList,setDisplayList]=useState(true) ;

    const router=useRouter() ;

	const openUsersList = () => {
		router.push(`/users`, undefined, { shallow: true }); // Shallow routing
	};

    

 return (

<div className="max-w-2xl ">
	<aside className="w-64" aria-label="Sidebar">
		<div className="px-3 py-4 overflow-y-auto rounded  bg-gray-900">
			<ul className="space-y-2">
				<li>
					<Link href="#"
						className="flex items-center p-2 text-base font-normal  rounded-lg text-gray-200 bg-gray-700 hover:bg-gray-700">
						{svgsRepo.index}
						<span className="flex-1 ml-3 whitespace-nowrap">Inbox</span>
						<span className="inline-flex items-center justify-center w-3 h-3 p-3 ml-3 text-sm font-medium  rounded-full bg-blue-900 text-blue-200">3</span>
					</Link >
				</li>
				<li onClick={()=>openUsersList()}>
					<div href="#"
						className="flex items-center p-2 text-base font-normal  rounded-lg text-gray-200 hover:bg-gray-700">
					    {svgsRepo.users} 
						<span className="flex-1 ml-3 whitespace-nowrap">Users</span>
					</div>
				</li>
				<li className="cursor-pointer" onClick={(e)=>e.preventDefault()}>

					<div 
						className="flex items-center cursor-pointer p-2 text-base font-normal  rounded-lg text-gray-200 hover:bg-gray-700">
						{svgsRepo.groups}
						<span className="flex-1 ml-3 whitespace-nowrap">Groups</span>
						<span onClick={()=>setDisplayList(!displayList)} >
                           {!displayList? svgsRepo.arrowDown :  svgsRepo.arrowUp }	   
						</span>
					</div>
					<ul onClick={()=>setDisplayCreateGroup((prev)=>!prev)} className={`${displayList? "":"hidden" } ml-3`}>
						<li>
							<div className="flex items-center p-2 text-base font-normal  rounded-lg text-gray-200 hover:bg-gray-700">
                                 {svgsRepo.plus}
								<span className="flex-1 ml-3 whitespace-nowrap">Create Group</span>                      
							</div>
						</li>
				
					</ul>
				</li>
				<li>
					<Link href="#"
						className="flex items-center p-2 text-base font-normal  rounded-lg text-gray-200 hover:bg-gray-700">
						{svgsRepo.profile}
						<span className="flex-1 ml-3 whitespace-nowrap">Profile</span>
					</Link >
				</li>
				<li>
					<Link href="#"
						className="flex items-center p-2 text-base font-normal  rounded-lg text-gray-200 hover:bg-gray-700">
						{svgsRepo.logOut}
						<span className="flex-1 ml-3 whitespace-nowrap">Loug out</span>
					</Link >
				</li>
				{/* <li>
					<Link href="#"
						className="flex items-center p-2 text-base font-normal  rounded-lg text-gray-200 hover:bg-gray-700">
						
						<span className="flex-1 ml-3 whitespace-nowrap">Sign Up</span>
					</Link >
				</li> */}
			</ul>
		</div>
	</aside>
</div>
 )
}

export default SideBar