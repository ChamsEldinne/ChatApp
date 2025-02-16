import { getDifrnecInMinuts } from "../helpers";
import Message from "./Message";
import {useEffect,memo } from "react";
import useIntersectionObserver from '../hookes/useIntersectionObserver' ;



const formatter = new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'short',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: false
});

const MessageContainer=memo(({lastBlockRef,firstBlockRef,isFirstBlock ,block=[],prevBlock=null,isLastBlock,urlParams,lastReadData }) =>{  

  let diffInMinutes=0 ;
  if(prevBlock!=null){
    diffInMinutes = getDifrnecInMinuts(block[0].time,prevBlock[0].time);
  }

  
  return (
      <div ref={isLastBlock?lastBlockRef:(isFirstBlock)?firstBlockRef: null} className="my-3 w-full">
       { (diffInMinutes >=30 || prevBlock==null) && <p className="p-4 text-center text-sm text-gray-500">{formatter.format(new Date(  block[0].time)) }</p>}
        <div className={`flex flex-row ${block[0].reciv_or_sent?"justify-end":"justify-start"}`}>
          <div className={`${block[0].reciv_or_sent?'hidden':'flex'} w-8 h-8 relative  flex-shrink-0 mr-4`}>
            <img className="shadow-md rounded-full w-full h-full object-cover"
                src="https://randomuser.me/api/portraits/women/33.jpg"
                alt=""
            />
          </div>
          <div className="messages w-full text-sm text-gray-700 grid grid-flow-row gap-2">
            {block[0].reciv_or_sent==0 && urlParams.type=="group" &&<h1 className="text-sm text-gray-400  -my-4 ">{block[0].user_name}</h1>}
            {block.map((message,i)=>
              // <div key={message.id}  >
                <Message key={message.id} lastReadData={lastReadData} urlParams={urlParams}  message={message} prevBlock={i!=0} next={i<block.length-1}  />
              // </div>
            )}
          </div>
      </div>
    </div>
    )
}) ;

export default MessageContainer ;