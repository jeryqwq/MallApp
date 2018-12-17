import React from 'react'
import {View,Text,StyleSheet,Button} from 'react-native'
import Return  from './../Return'
export default class UpdatePwd extends React.Component{
    constructor(props){
        super(props);
        this.state={
            step:0,
        }
    }
    render(){
        return(
            <View>
                <Return title="修改密码" subtitle="" returnPath="Person" />
                <View style={{flexDirection:'row',justifyContent:'center',marginTop:30}}>
                   <View><Button onPress={()=>{}}
  title="根据密码找回"
  color="#841584"
  accessibilityLabel="Learn more about this purple button"/></View>
                <View style={{marginLeft:20}}><Button onPress={()=>{}}
  title="根据密保问题找回"
  color="#841584"
  accessibilityLabel="Learn more about this purple button"/></View>
 </View>
        </View>
        )
    }
}
let style=StyleSheet.create({
    titleItem:{height:30,alignItems:'center',justifyContent:"center",paddingLeft:25,paddingRight:25}
})