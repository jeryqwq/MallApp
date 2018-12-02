import React from "react";
import { Image,Button,View,Text,StyleSheet,TextInput} from "react-native";
import userajax from './../../ajax/userAjax'
import userStore from '../../store/userStore'
export default class UserLogin extends React.Component{
    constructor(){
        super();
        this.state={
            userName:'',
            password:'',
            errtip:'',
        }
    }
    handleLogin=()=>{
      userajax.userLogin(this.state.userName,this.state.password).then(res=>{
         let resobj=eval("("+res._bodyInit+")");
       if(resobj.status===1){
           this.setState({
               errtip:"用户名或者帐号输入错误，请重新尝试"
           })
       }else{
        userStore.setUserInfo(resobj.data);
        this.setState({
            errtip:"登录成功"
        });
     setTimeout(()=>{
        const { navigate } = this.props.navigation;
        navigate('Home', { name: 'Home' })
     },500)
       }
     })
    }
    handleinPutPassword=(password)=>{
        this.setState({
            password:password
        })
    }
    handleinPutUsername=(userName)=>{
this.setState({
    userName:userName
})
    }
render(){
    const { navigate } = this.props.navigation;
    return(
<View style={style.wrap}>
    <Image source={require("./../../imgs/true.jpg")} style={{width:'100%',height:'40%'}}/>
<View style={style.titlewrap}>
<Text style={style.title}>
Welcome
</Text>
<Text style={style.subTitle}>欢迎使用多用户在线商城APP</Text>
</View>
<View>
<TextInput onChangeText={(userName)=>{this.handleinPutUsername(userName)}}
placeholder='请输入用户名'
style={style.text}
onFocus={()=>{this.setState({username:''})}}
/>
<TextInput onChangeText={(password)=>{this.handleinPutPassword(password)}}
placeholder="请输入密码"
secureTextEntry={true}
style={style.text}
onFocus={()=>{this.setState({password:''})}}
/>
<Text style={{color:"red",marginLeft:'10%'}}>{this.state.errtip}</Text>
</View>
<View style={{width:'80%',height:100,marginLeft:'10%',marginTop:20}}>
<View style={{marginBottom:10,flexDirection:"row",alignItems:"center",justifyContent:"space-between"}}>
    <Text style={style.register}>注册</Text>
<Text style={style.findPwd} onPress={()=>{
     navigate('FindPwd', { name: 'FindPwd' })
}}>忘记密码？找回密码</Text></View>
<Button style={style.btn} 
        title="登录"
        onPress={this.handleLogin}/>
</View>
</View>
    )
}
}
const style=StyleSheet.create({
    titlewrap:{
        position:'relative',
        top:-50,
        width:'80%'
    },
    title:{
fontSize:80,
color:"#A60000",
fontWeight:'100'
    },
    subTitle:{
        fontSize:18,
        color:"#A60000",
        fontWeight:'100',
        textAlign:"right"
    },
    wrap:{
        backgroundColor:'white',
        height:'100%',
        width:'100%',
    },
text:{
    marginLeft:'10%',
    width:"80%",
    marginBottom:10,
borderBottomWidth:1,
borderBottomColor:'gray',
borderStyle:"solid"
},
btn:{
    width:'80%',
    marginLeft:'10%',
},
findPwd:{
    color:'blue',
    fontSize:18,
    textAlign:"right"
},
register:{
    color:'blue',
    fontSize:18,
    textAlign:"left",
  
}
})