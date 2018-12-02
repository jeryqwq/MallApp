import React from 'react';
 import {Text,View} from 'react-native';
 import NavFooter from './../NavFooter'
 import store from './../../store/userStore'
 import IsLogin from './../contains/IsLogin';
 import EmptyComponent from './../contains/EmptyComonent'
 import PersonInfo from './../PersonInfo'
export default class Category extends React.Component{
constructor(){
    super()
}
render(){
    function IsShowPerson(){
        if(store.getUserInfo().isLogin){
            return <PersonInfo/>
        }else{
            return EmptyComponent("您当前未登录，请先登录")
        }
    }
    return(
        <View style={{height:'100%',backgroundColor:'#f2f2f2'}}>  
        <IsLogin/>
        <IsShowPerson/>
        <NavFooter navigation={this.props.navigation} curIndex={4}/>
        </View>
    )
}

}