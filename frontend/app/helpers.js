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