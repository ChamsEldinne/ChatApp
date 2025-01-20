import axiosClient from "../axiosClient";
import { useQuery } from "@tanstack/react-query";

const useAuthorize = (socketId, channelName, token) => {
    return useQuery(
      ['authorize', socketId, channelName],
      async () => {
        const response = await axiosClient.post(
          '/api/broadcasting/auth',
          { socket_id: socketId, channel_name: channelName },
          {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );
        return response.data;
      },
      {
        enabled: !!socketId && !!channelName && !!token, // Ensures the query runs only when these values are available
        retry: 2, // Retry the request in case of failure
      }
    );
};

export default useAuthorize ;
