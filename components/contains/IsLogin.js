import userStore from './../../store/userStore'
import { Button} from "react-native";
import React from 'react';
import Navigation from './../../store/navigation'

export default class IsLogin extends React.Component{

 
  render(){
    handle=function(){
      const { navigate } =Navigation.getNavigation();
      navigate('UserLogin')
    }
function IsLog(){
  let user=userStore.getUserInfo();
    if(user.isLogin===false){
      return <Button
      title="您尚未登录，登录体验更多功能"
      onPress={()=>{handle()}}
      color="rgba(0,0,0,0.5)"/>
    }else{
      return null;
    }
}
    
    return (
      <IsLog/>

    )
  }
    

}