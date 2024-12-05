import Message from "./Message";
function MessageContainer({block=[],setMessages}){  

  const formatter = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  });
  return (
      <div className="my-2">
        <p className="p-4 text-center text-sm text-gray-500">{formatter.format(new Date(block[0].time)) }</p>
        <div className={`flex flex-row ${block[0].reciv_or_sent?"justify-end":"justify-start"}`}>
          <div className={`${block[0].reciv_or_sent?'hidden':'flex'} w-8 h-8 relative  flex-shrink-0 mr-4`}>
            <img className="shadow-md rounded-full w-full h-full object-cover"
                src="https://randomuser.me/api/portraits/women/33.jpg"
                alt=""
            />
          </div>
          <div className="messages text-sm text-gray-700 grid grid-flow-row gap-2">
              {block.map((message,index)=><Message key={index} setMessages={setMessages} message={message} prev={index!=0} next={index<block.length-1}  />)}
          </div>
      </div>
    </div>
    )
  }

  export default MessageContainer ;