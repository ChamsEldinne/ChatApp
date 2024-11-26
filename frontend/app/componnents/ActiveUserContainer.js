function ActiveUserContainer(){

    return (
      <div className="text-sm text-center mr-4">
        <div className="p-1 border-4 border-transparent rounded-full">
          <div className="w-16 h-16 relative flex flex-shrink-0">
            <img className="shadow-md rounded-full w-full h-full object-cover"
                src="https://randomuser.me/api/portraits/men/75.jpg"
                alt=""
            />
            <div className="absolute bg-gray-900 p-1 rounded-full bottom-0 right-0">
                <div className="bg-green-500 rounded-full w-3 h-3"></div>
            </div>
          </div>
        </div>
        <p>Jeff</p>
       </div>
    )
}

export default ActiveUserContainer ;