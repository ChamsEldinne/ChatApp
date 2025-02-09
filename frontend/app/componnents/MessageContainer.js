import { getDifrnecInMinuts } from "../helpers";
import Message from "./Message";

function MessageContainer({block=[],prev=null,urlParams,lastReadData}){  

  const formatter = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  });

  let diffInMinutes=0 ;
  if(prev!=null){
    diffInMinutes = getDifrnecInMinuts(block[0].time,prev[0].time);
  }
  
  return (
      <div className="my-3 w-full">
       { (diffInMinutes >=30 || prev==null) && <p className="p-4 text-center text-sm text-gray-500">{formatter.format(new Date(  block[0].time)) }</p>}
        <div className={`flex flex-row ${block[0].reciv_or_sent?"justify-end":"justify-start"}`}>
          <div className={`${block[0].reciv_or_sent?'hidden':'flex'} w-8 h-8 relative  flex-shrink-0 mr-4`}>
            <img className="shadow-md rounded-full w-full h-full object-cover"
                src="https://randomuser.me/api/portraits/women/33.jpg"
                alt=""
            />
          </div>
          <div className="messages w-full text-sm text-gray-700 grid grid-flow-row gap-2">
            {block[0].reciv_or_sent==0 && urlParams.type=="group" &&<h1 className="text-sm text-gray-400  -my-4 ">{block[0].user_name}</h1>}
            {block.map((message,index)=><Message  lastReadData={lastReadData} urlParams={urlParams} key={message.id} message={message} prev={index!=0} next={index<block.length-1}  />)}
          </div>
      </div>
    </div>
    )
  }

  export default MessageContainer ;