import config from "./../config/uriconfig"
const apiFront=config.apiAddressFront+"/user/";

userLogin=(username,password)=>{
  let parameters=new FormData();
  parameters.append("username",username);
  parameters.append("password",password);
    return fetch(apiFront+"/appUserLogin.do", {
        method: "POST",
        mode : 'cors',//跨域限制，后台已经处理，rn本身没有跨域限制
        credentials: 'include',//允许存取cookie信息
        body:parameters
      })
}

userLogout=()=>{//用户退出
  return fetch(apiFront+"/logout.do",{
method:'POST',
mode:'cors',
credentials: 'include',//允许存取cookie信息
  })
}
getUserInfo=()=>{// 获取用户信息
  return fetch(apiFront+"/get_user_info.do",{
    method:"POST",
    mode:"cors",
    credentials:"include"
  })
}
checkValid=(str,type)=>{
  let params= new FormData();
  params.append('str',str);
  params.append('type',type);
  return fetch(apiFront+'/check_valid.do'),{
    method:"POST",
    mode:"cors",
    credentials:"include",
    body:params
  }
}
//忘记密码,密保问题找回答案  ,返回密保问题
forgetGetAnswer=(username)=>{
  let parameters=new FormData();
  parameters.append("username",username);
    return fetch(apiFront+"/forget_and_question.do", {
        method: "POST",
        mode : 'cors',//跨域限制，后台已经处理，rn本身没有跨域限制
        credentials: 'include',//允许存取cookie信息
        body:parameters
      })
}
//忘记密码，检查答案是否一致
forgetCheckAnswer=(username,question,answer)=>{
  let parameters=new FormData();
  parameters.append("username",username);
  parameters.append("question",question);
  parameters.append("answer",answer);
    return fetch(apiFront+"/forget_check_answer.do", {
        method: "POST",
        mode : 'cors',//跨域限制，后台已经处理，rn本身没有跨域限制
        credentials: 'include',//允许存取cookie信息
        body:parameters
      })
}
//验证通过重置密码；需要带上token，失效期两个小时
resetPassword=(username,newPassword,token)=>{
  let parameters=new FormData();
  parameters.append("username",username);
  parameters.append("newPassword",newPassword);
  parameters.append("token",token);
  return fetch(apiFront+"/reset_password.do", {
    method: "POST",
    mode : 'cors',//跨域限制，后台已经处理，rn本身没有跨域限制
    credentials: 'include',//允许存取cookie信息
    body:parameters
  })
}

//更新用户信息
updateInfo=(username,email,phone,question,answer)=>{
  let parameters=new FormData();
  parameters.append("username",username);
  parameters.append("email",email);
  parameters.append("phone",phone);
  parameters.append("question",question);
  parameters.append("answer",answer);
  return fetch(apiFront+"/update_info.do", {
    method: "POST",
    mode : 'cors',//跨域限制，后台已经处理，rn本身没有跨域限制
    credentials: 'include',//允许存取cookie信息
    body:parameters
  })
}



module.exports={
    userLogin,
    userLogout,
    updateInfo,
    forgetCheckAnswer,
    resetPassword,
    forgetGetAnswer,
    getUserInfo,
    checkValid
}