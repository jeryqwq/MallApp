import React from 'react';
 import {Text,View} from 'react-native';
 import NavFooter from './../NavFooter'
 import store from './../../store/userStore'
import IsLogin from './../contains/IsLogin';
import EmptyComponent from './../contains/EmptyComonent'
import CartList from './../CartList'
export default class Category extends React.Component{
constructor(){
    super()
}
render(){
    function IsShowCart(){
        if(store.getUserInfo().isLogin){
            return<CartList></CartList>
        }else{
            return EmptyComponent("您当前未登录，无法查看购物车信息，请先登录")
        }
    }
    return(
        <View style={{height:'100%'}}>  
        <IsLogin/>
        <IsShowCart/>
        <NavFooter navigation={this.props.navigation} curIndex={3}/>
        </View>
    )
}

}