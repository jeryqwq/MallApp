import React from "react"
import {View,Text,Button,TextInput,StyleSheet} from 'react-native'
export default class FindPwd extends React.Component{
    constructor(){
        super();
 this.state={
    userName:'',
    question:'',
    answer:'',
    statas:2,
    token:''
 }
    }
render(){
    return(
        <View>
            <View style={style.item}>
             <Text>用户名：</Text>
             <TextInput onChangeText={(userName)=>{this.setState({userName:userName})}}
placeholder='请输入用户名'
style={style.text}
/>
</View>
<View style={{width:'90%',marginLeft:'5%' }}>
<Button disabled={this.state.statas>=0}
        title="获取密保问题"
        />
</View>
{/* 验证区 */}
 <Text style={{marginLeft:'5%',marginTop:'5%'}}>您的密保问题是：‘你的生日是多少？’</Text>
   <View style={style.item}>
             <Text>问题答案：</Text>
             <TextInput onChangeText={(userName)=>{this.setState({userName:userName})}}
placeholder='请输入问题答案'
style={style.text}
/>
</View>
<View style={{width:'90%',marginLeft:'5%' }}>
<Button disabled={this.state.statas>=1}
        title="验证密保答案"
        />
</View>

{/* 改密 */}
 <Text style={{marginLeft:'5%',marginTop:'5%'}}>密保验证成功，请修改密码</Text>
   <View style={style.item}>
             <Text>请输入新密码：</Text>
             <TextInput onChangeText={(userName)=>{this.setState({userName:userName})}}
placeholder='请输入您的新密码'
style={style.text}
/>
</View>

<View style={{width:'90%',marginLeft:'5%' }}>
<Button 
disabled={this.state.statas>=2}
        title="确认修改"
        />
</View>


        </View>
    )
}
}
let style=StyleSheet.create({
 
item:{
    width:'90%',
    height:60,
    marginLeft:'5%',
    display:'flex',
    flexDirection:"row",
    justifyContent:"center",
    alignItems:"center"
},
text:{
    width:"80%",
    marginBottom:10,
    borderBottomWidth:1,
    borderBottomColor:'gray',
    borderStyle:"solid",

},


})