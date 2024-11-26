import {useState,useEffect} from 'react' ;
import Echo from "laravel-echo";
import Pusher from "pusher-js";
import axiosClient from "../axiosClient";

window.Pusher = Pusher;

const useEcho=()=>{
   const [echoInstnce,setEchoInstance]=useState(null) ;
   useEffect(()=>{
    const echo = new Echo({
      broadcaster: "reverb",
      key: 'dhkm4ldpg6faoshw5gnu',
      authorizer: (channel) => {
        return {
            authorize: (socketId, callback) => {
              axiosClient.post('/api/broadcasting/auth', {
                socket_id: socketId,
                channel_name: channel.name
              })
              .then(response => {
                callback(false, response.data);
              })
              .catch(error => {
                callback(true, error);
              });
            }
        };
      },
      wsHost: 'localhost',
      wsPort: 8080 ,
      wssPort: 8080 ,
      forceTLS: false,
      enabledTransports: ["ws", "wss"],
    });

    setEchoInstance(echo) ;
   },[])
   
   return echoInstnce ;
}
export default useEcho ;