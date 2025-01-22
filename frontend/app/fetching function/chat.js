export const fetchMessages =async(c)=>{  
    const url=`/api/messages/${pathname.split("/")[2]=="user"?"frinde":"group"}?page=${c}`

    const response = await axiosClient.get(url, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        params: {
          reciver_id:urlParams.id ,
        }
    })
    return response.data
}
 