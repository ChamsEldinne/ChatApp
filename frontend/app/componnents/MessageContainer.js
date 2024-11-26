import Message from "./Message";
function MessageContainer(){
    return (
      <div>
        <div className="flex flex-row justify-start">
          <div className="w-8 h-8 relative flex flex-shrink-0 mr-4">
            <img className="shadow-md rounded-full w-full h-full object-cover"
                src="https://randomuser.me/api/portraits/women/33.jpg"
                alt=""
            />
          </div>
          <div className="messages text-sm text-gray-700 grid grid-flow-row gap-2">
              <Message/>
              <Message/>
          </div>
      </div>
      <p className="p-4 text-center text-sm text-gray-500">FRI 3:04 PM</p>
    </div>
    )
  }

  export default MessageContainer ;