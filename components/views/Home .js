import React from 'react';
import { View} from "react-native";
import NavFooter from './../NavFooter'
import ProductList from "./../ProductList";
import Navigation from './../../store/navigation'
import userAjax from './../../ajax/userAjax'
import userStore from './../../store/userStore'
class HomeScreen extends React.Component {
 
    handle=()=>{
      const { navigate } = this.props.navigation;
        // ToastExampl.show("123",500);
        navigate('UserLogin')
    }
    componentDidMount(){
      Navigation.setNavigation(this.props.navigation);
      this.autoLogin();//禁用自动登陆
    }
    autoLogin(){//查询cookie值，没过期自动登陆，避免重复操作，测试阶段请禁用
      userAjax.getUserInfo().then((res) => {
        let resobj=eval("("+res._bodyInit+")");
        if(resobj.status===0){
          userStore.setUserInfo(resobj.data);
          const { navigate } = this.props.navigation;
          // ToastExampl.show("123",500);
          navigate('Person')//自动登录获取信息后跳转页面，开发使用
        }else{
          userStore.userLogout();
        }
      }).catch((err) => {
        userStore.userLogout();
      });
    }
    render() {
      return (
 <View style={{height:'100%'}}>
<ProductList ></ProductList>
<NavFooter navigation={this.props.navigation} curIndex={1}/>
 </View>
      );
    }
  }
  export default HomeScreen ;