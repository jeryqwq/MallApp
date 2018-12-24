import React from 'react';
import {View,Text,Dimensions} from 'react-native';
import Return from './../Return';
import MyInput from './../contains/MyInput';
import UserInfo from './../../store/userStore';

const {width,height} = Dimensions.get('window')

export default class UserInfos extends React.Component{
    constructor(props){
        super(props);
       let user= UserInfo.getUserInfo();
        this.state={
            userName:user.username,
            email:user.email,
            phone:user.phone,
            question:user.question,
            answer:user.answer,
            createTime:user.createTime,
        }
    }

    MyInputWrap(that,key,holder,lins){//为了使input内的数据被React追踪到变化，使用wrap包装起来，封住成react组件内的函数
        return MyInput(that,key,holder,lins);
    }
    render(){
        return(
            <View style={{backgroundColor:'white',height:height}}>
               <Return title="我的信息" subtitle="保存"  returnPath="Person" returnDo={()=>{
               }} />
            {this.MyInputWrap(this,"userName",'用户名')}
            {this.MyInputWrap(this,"email",'邮箱')}
            {this.MyInputWrap(this,"phone",'电话')}
            {this.MyInputWrap(this,"question",'密保问题')}
            {this.MyInputWrap(this,"answer",'密保答案')}
            {this.MyInputWrap(this,"createTime",'创建时间')}
            </View>


        )
    }
}