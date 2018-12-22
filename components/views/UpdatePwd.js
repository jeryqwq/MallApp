import React from 'react'
import {View,Text,StyleSheet,Button,TextInput,Dimensions,ToastAndroid } from 'react-native'
import Return  from './../Return'
import userAjax from './../../ajax/userAjax'

const {width,height} = Dimensions.get('window')

export default class UpdatePwd extends React.Component{
    constructor(props){
        super(props);
        this.state={
            step:0,
            type:0,
            reNewPwd:'',
            oldPwd:'',
            newPwd:'',
            userName:'',
            answer:'',
            token:'',
            tip:'',
            question:''
        }
    }
    componentDidMount(){
       
    }
    isFindPwdType(){
     return   this.state.type==0?(
            <View style={style.contentWrap}>
                <Text>请输入原始密码：</Text>
                <TextInput 
                autoComplete="password"
                style={style.button}
                onChangeText={(value)=>{
                 this.setState({oldPwd:value})
                }}/>
                <Text>请输入新密码：</Text>
                <TextInput
                autoComplete="password"
                style={style.button}
                onChangeText={(value)=>{
                  this.setState({newPwd:value},()=>{
                    this.state.newPwd===this.state.reNewPwd?this.setState({tip:'密码一致'}):this.setState({tip:'两次输入不一致'})
                  })
                }}/>
                 <Text>再次输入新密码：</Text>
                <TextInput 
                 style={style.button}
                onChangeText={(value)=>{
                  this.setState({reNewPwd:value},()=>{
                    this.state.newPwd===this.state.reNewPwd?this.setState({tip:'密码一致'}):this.setState({tip:'两次输入不一致'})
                  });
                }}/>
                <Text style={{color:'red'}}>{this.state.tip}</Text>
                <Button title="确定"
                disabled={this.state.newPwd==''||this.state.oldPwd==''||this.state.reNewPwd==''}
                onPress={()=>{
                    if(this.state.newPwd===this.state.reNewPwd){
                        userAjax.resetPassword(this.state.newPwd,this.state.oldPwd).then((res)=>{
                            let resObj=eval("("+res+")");

                            console.warn(resObj);

                        }).catch((err)=>{

                        })
                    }
                }}
                />

            </View>
        ):(
            <View style={style.contentWrap}>
                <Text>请输入用户名:</Text>
                <TextInput 
                style={style.button}
                value={this.state.userName}
                onChangeText={(value)=>{
                  this.setState({userName:value,step:1});
                }}/>
            <Button title="获取用户密保问题"
             disabled={!(this.state.step==1)}
            onPress={()=>{
                userAjax.forgetGetAnswer(this.state.userName).then((res)=>{
                    const resObj=eval('('+res._bodyInit+')');
                    if(resObj.status==0){
                        this.setState({
                            question:resObj.data
                        })
                        this.setState({step:2});
                    }else{
                        ToastAndroid.show('没有该用户',500)
                    }
                })
            }}/>
             <Text style={{textAlign:"center",marginTop:20}}>密保问题是:<Text style={{color:'red'}}>{this.state.question}</Text></Text>
             <Text>请输入密保答案:</Text>
                <TextInput 
                value={this.state.answer}
                 style={style.button}
                autoComplete="password"
                onChangeText={(value)=>{
                  this.setState({answer:value})
                }}/>
                <Button title="检查密保答案"
                disabled={!(this.state.step==2)}
                onPress={()=>{
                    userAjax.forgetCheckAnswer(this.state.userName,this.state.question,this.state.answer).then((res)=>{
                        const resObj=eval("("+res._bodyInit+")");
                       if(resObj.status==0){
                           this.setState({
                               token:resObj.data
                           })
                       }else{
                           ToastAndroid.show('Token获取失败，答案错误',500)
                       }
                    })

                    this.setState({step:3});
                }}/>
                <Text>请输入新密码:</Text>
                <TextInput 
                 style={style.button}
                autoComplete="password"
                onChangeText={(value)=>{
                  this.setState({newPwd:value})
                }}/>
                <Button 
                 disabled={!(this.state.step==3)}
                style={style.pd10}
                title="确认修改"
                onPress={()=>{
                    userAjax.forgetResetPassword(this.state.userName,this.state.newPwd,this.state.token).then((res)=>{
                        console.error(res)

                        const resObj=eval("("+res._bodyInit+")");
                        if(resObj.status==0){

                        }
                    })
                }}/>
            </View>
        )
    }
    render(){
        return(
            <View style={{backgroundColor:'white',height:height}}>
                <Return title="修改密码" subtitle="确定" returnPath="Person" />
                <View style={{flexDirection:'row',justifyContent:'center',marginTop:30}}>
                   <View><Button onPress={()=>{this.setState({type:0})}}
                        title="根据密码找回"
                        accessibilityLabel=""/></View>
                    <View style={{marginLeft:20}}><Button onPress={()=>{this.setState({type:1})}}
                        title="根据密保问题找回"
                        accessibilityLabel=""/></View>
                </View>
                {this.isFindPwdType()}
            </View>
        )
    }
}
let style=StyleSheet.create({
    titleItem:{height:30,alignItems:'center',justifyContent:"center",paddingLeft:25,paddingRight:25},
    contentWrap:{width:width*0.9,marginLeft:width*0.05,paddingBottom:20},
    pd10:{paddingBottom:15},
    button:{borderBottomColor:'gray',borderBottomWidth:1,borderStyle:'solid',marginBottom:10}
})