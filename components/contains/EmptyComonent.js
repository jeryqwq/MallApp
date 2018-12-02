import React from 'react'
import {View,Text,Image} from 'react-native'
export default function(text){
    if(text===undefined){
        text="很抱歉,您的数据走丢了"
    }
    return(
<View style={{ alignItems: 'center',
      justifyContent: 'center',marginTop:200}}>
    <Text style={{color:'red',marginBottom:20,fontSize:20}} >{text}</Text>
    <Image source={require('./../../imgs/sorry.png')}/>
</View>

    )
}