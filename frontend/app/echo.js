import Echo from "laravel-echo";
import Pusher from "pusher-js";
import axiosClient from "./axiosClient";

window.Pusher = Pusher;

const echo = new Echo({
  broadcaster: "reverb",
  key: process.env.REVERB_APP_KEY,
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
  wsHost: process.env.REVERB_HOST,
  wsPort: process.env.REVERB_PORT ?? 80,
  wssPort: process.env.REVERB_PORT ?? 443,
  forceTLS: (process.env.REVERB_SCHEME ?? "https") === "https",
  enabledTransports: ["ws", "wss"],
});
