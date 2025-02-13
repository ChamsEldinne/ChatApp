import axiosClient from "../../axiosClient"

export const fetchReciver =async (id,type,token)=>{
    const response= await axiosClient.get('/api/messages/reciver',
    {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    ,  
    params:{ 
        reciver_id:id,
        type:type,
    }
    })
    return  response.data
}



export const fetchMessages =async(c,token,type,reciver_id)=>{  
    const url=`/api/messages/${type=="user"?"frinde":"group"}?page=${c}`

    const response = await axiosClient.get(url, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        params: {
          reciver_id:reciver_id ,
        }
    })
    return response.data
}


export const fetchLastRead=async(reciverId,type,token)=>{
    const response =await axiosClient.get('/api/lastReadMessage',{
      params:{
        type:type ,
        reciver_id :reciverId,
      },
      headers:{
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    }) ;
    return response.data ;
}

