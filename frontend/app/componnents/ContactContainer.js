import { useMemo ,memo } from 'react'
import { getUser } from '../helpers';

const ContactContainer=memo (
function ContactContainer ({cont=null,setDisplayedContact })  {
  
    const randomNumber=useMemo(()=> Math.floor(Math.random() * (100 )) + 1,[])

    const formatter = new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'short',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    });
    const user=getUser() ;

  return (
    cont==null ? null :
    <div onClick={()=>{
            setDisplayedContact({reciver_id:cont.freinde_id,group_or_friend:1})}}
        className="flex justify-between items-center p-3 cursor-pointer hover:bg-gray-800 rounded-lg relative">
        <div className="w-16 h-16 relative flex flex-shrink-0">
            <img className="shadow-md rounded-full w-full h-full object-cover"
                    src={`https://randomuser.me/api/portraits/men/${randomNumber}.jpg`}
                    alt=""
            />
        </div>
        <div className="flex-auto min-w-0 ml-4 mr-2 block">
            <p className={`font-bold`} >{cont.freinde_name}</p>
            <div className="flex items-center justify-between w-full text-sm text-gray-600">
                <div className="min-w-0">
                    <p className="truncate font-bold">{cont.user_id=user.id ? `You :${cont.message}`:cont.message } </p>
                </div>
                 <p className="ml-2 whitespace-no-wrap">{formatter.format(new Date(cont.lates_message_date)) } </p> 
            </div>
        </div>
    </div>
  )
}
) ;
export default ContactContainer