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

export const UpdateLatRead= async (reciverId,type, messageId,token)=>{
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

export const updateMessage=async(id,token)=>{
        
  const response=await axiosClient.put(`/api/message/${id}`,{
      'message' : updateVlaue,
  },{
      headers:{
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }             
  })
  return response ;
}

export const deleteMessage=async (id,token)=>{
  await axiosClient.delete(`/api/message/${id}`,{
      headers:{
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }             
  })
}


export const    ScrollToBottomn=(ref)=>{
    if(ref.current){
      ref.current.scrollTop=ref.current.scrollHeight ;
      // setScrollToBottomn(false) ;
    }
  }

