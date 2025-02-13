"use client";
import React from "react";
import { useState, useEffect } from "react";
import Contact from "../componnents/Contact";
import dynamic from "next/dynamic";
import { useQueryClient } from "@tanstack/react-query";
import ContactInstance from "../util/ContactInstans";
import useEcho from "../hookes/useEcho";
import { getUser } from "../helpers";
import { usePathname } from "next/navigation";

const CreateGroup = dynamic(() => import("../componnents/CreateGroup"));

function Provider({ children }) {
  const [displayCreateGroup, setDisplayCreateGroup] = useState(false);

  const user = getUser();
  const echo = useEcho();
  const queryClient = useQueryClient();

  const pathname = usePathname()  

  const [urlParams]=useState(()=>{
    const arr=pathname.split("/") ;
    return {type:arr[2],id:arr[3]}
  }) ;



  async function UpdateLatRead(reciverId,type, messageId){
    const response=await axiosClient.post('/api/lastReadMessage',
      {
        type:type ,
        reciver_id :reciverId,
        message_id:messageId ,
      },{
        headers:{
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
    })
  }
  
  useEffect(() => {
    if (echo && user) {
      const channle = echo.private(`chat.${user.id}`);

      channle.listen("MessageEvent", (event) => {
        const message = event.message;

        //reciverId from the message
        const ReciverId =
          (message.messsageble_type == "App\\Models\\Group" || message.user_id == user.id)
            ? message.messageable_id
            : message.user_id;

        //params of the query key from the reciver message
        const params = {
          type: message.messsageble_type == "App\\Models\\Group" ? "group" : "user",
          id: ReciverId,
        };
        // if(urlParams.id==ReciverId && urlParams.type==params.type){
        //   UpdateLatRead(ReciverId,urlParams.type,message.id)
        //   queryClient.invalidateQueries({queryKey:["lastRead",urlParams.type,urlParams.id],exact:true}) 
        // }
        //update the data in the chat query that are cashed
        queryClient.setQueryData( ["chat", params.type, params.id.toString()],

          (oldData) => {
            if (!oldData) return;

            //mutate the oldDtata
            return {
              ...oldData,
              pages: oldData.pages.map((page, index) =>
                index === 0
                  ? { ...page, messages: [message, ...page.messages] } // Update only the first page
                  : page
              ),
            };
          }
        );

        const groupOrUser = message.messsageble_type == "App\\Models\\User"; //true =>users ,false=>group

        //update the data of the contacts query that are cashed
        queryClient.setQueryData(["contact", groupOrUser ? true : false],
         
            (oldData) => {
                if (!oldData) return;

                //finde the contact first to update
                const contactThatGoingToChange = groupOrUser
                ? oldData.pages.map((page) => page.data.filter((d) => d.freinde_id == ReciverId))
                : oldData.pages.map((page) =>  page.data.filter((d) => d.group_id == ReciverId));

                const newContactInstance = ContactInstance( contactThatGoingToChange[0][0], groupOrUser,message, ReciverId);

                //mutate the oldDtata
                return {
                  ...oldData,
                  pages: oldData.pages.map((page, index) => {
                    //remove if it exist and upate it with the new
                    const p = { ...page,
                    data: page.data.filter((d) =>d[groupOrUser ? "freinde_id" : "group_id"] !== ReciverId),
                    };

                    return index === 0
                    ? { ...p, data: [newContactInstance, ...p.data] } // Update only the first page
                    : page;
                  }),
                };
          });
      });
    }
  }, [echo]);

  return (
    <main className="flex-grow flex flex-row min-h-0 relative">
      <Contact setDisplayCreateGroup={setDisplayCreateGroup} />
      {children}
      {displayCreateGroup && (
        <CreateGroup displayCreateGroup={displayCreateGroup}
          setDisplayCreateGroup={setDisplayCreateGroup}/>
      )}
    </main>
  );
}

export default Provider;
