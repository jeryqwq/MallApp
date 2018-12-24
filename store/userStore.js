

class userStore{
   static _user={
    username:'',
    password:'',
    email:'',
    phone:'',
    role:'',
    isLogin:false
};
static setUserInfo(user){
    this._user=user;
    this._user.isLogin=true;
}
static getUserInfo(){
    return this._user;
}
static  userLogout(){
    this._user={};
    this._user.isLogin=false;
}
}
export default userStore;
