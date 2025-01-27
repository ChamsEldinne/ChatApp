// export default class ContactInstance{
    
  function ContactInstance(contactThatGoingToChange,groupOrUser,message,ReciverId){
      return contactThatGoingToChange ?   //contactThatGoingToChange !=undifinde
      {
        ...contactThatGoingToChange,
        message:message.message ,
        lates_message_date:message.time ,
        user_id:message.user_id ,
      } :
   
      groupOrUser?
     {
      //user contact form
        message:message.message,
        lates_message_date:message.time,
        user_id:message.user_id ,
        freinde_id:ReciverId,
        freinde_name:null,
        messsageble_type: "App\\Models\\User",
      
      }
      :{
        //group contact form
        message:message.message,
        lates_message_date:message.time,
        user_id:message.user_id ,
        user_name:"Anymos",
        messsageble_type: "App\\Models\\Group",
        group_name:reciver?.name,
        group_id:ReciverId ,
      }

    }
    export default  ContactInstance ;
  
// }