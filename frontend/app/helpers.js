export const getToken=()=>{
    let token = window.localStorage.getItem("token");
  if (token != null) {
    return token[0] === `"` ? JSON.parse(token) : token;
  }
  token=window.sessionStorage.getItem('token') ;
  if(token!=null){
    return token[0] === `"` ? JSON.parse(token) : token;
  }
  return null;
}
export const getUser = () => {
    let user = window.localStorage.getItem("user");
    if (user != null) {
      return JSON.parse(user) 
    }
    user=window.sessionStorage.getItem('token') ;
    if(user!=null){
      return  JSON.parse(user) 
    }
    return null;
};

export const getDifrnecInMinuts=(d1,d2)=>{
  const date1 =d1==null? new Date() :  new Date(d1);
  const date2 = new Date(d2);
  const differenceInTime = date1.getTime() - date2.getTime();
  return  differenceInTime / (1000 * 60);
}


export const formateMinutes=(minutes)=>{ 
  if(minutes >60*20){   
    return `${Math.floor( minutes/(60*24) )}d` ;
  }else if (minutes > 60){
    return `${Math.floor( minutes/60)}h`
  }else if(minutes>=1){
    `${Math.floor( minutes)}m`
  }else{
    `${Math.floor(minutes*60)}s`
  }
  return null ;
}

export const checkForCircularReferences = (obj) => {
  try {
    JSON.stringify(obj);
  } catch (error) {
    if (error.message.includes('Converting circular structure to JSON')) {
      console.error('Circular reference detected:', obj);
    }
  }
};