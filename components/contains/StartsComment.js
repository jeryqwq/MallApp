import React from 'react';
import {View,Image} from 'react-native';


export default function (cStarts){
    let arrs=[];
    for(let i=0;i<cStarts;i++){
        arrs.push(i);
    }
   return(
    <View style={{flexDirection:"row",marginLeft:30,paddingBottom:5}}>
        {
            arrs.map(((item,index) => (
                <Image kye={index} style={{width:20,height:20}} source={require("./../../imgs/星.png")}/>
            ))
            )
        }
    </View>
   )
  
}