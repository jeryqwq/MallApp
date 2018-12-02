import React from 'react'
import {View,Text,StyleSheet,ImageBackground,Dimensions} from 'react-native';
import config from './../config/uriconfig'
const {width} = Dimensions.get('window')

export default function({item}){
    return(
        <View >
            <ImageBackground
         style={styles.img}
         source={{uri:item.replace("ftp://127.0.0.1/",config.imgAddressFront)}}
            >
          <Text style={styles.text}>1/5</Text>
            </ImageBackground>
        </View>
    )  
}
styles=StyleSheet.create({
img:{ width:width, height:400,resizeMode:"stretch"},
text:{color:'white',fontSize:15,position:'absolute',bottom:30,right:30,
backgroundColor:'rgba(0,0,0,0.5)',paddingLeft:10,paddingRight:10,borderRadius:5
}
})