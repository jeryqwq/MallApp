
import React from 'react'
import {View,Text,StyleSheet,Dimensions,Image,Button,TouchableOpacity} from "react-native"
import config from "./../../config/uriconfig"
import Navigation from './../../store/navigation'
import CartAjax from './../../ajax/cartAjax'
import ToastExampl from './../../native_methods/Toast'
const {width} = Dimensions.get('window')
export default function({item}){
    let img= item.mainImage.replace("ftp://127.0.0.1/",config.imgAddressFront)
    addCart=(id)=>{
        CartAjax.addCart(id,1).then((res) => {
            const resobj=eval('('+res._bodyInit+")");
            if(resobj.status===0){
                ToastExampl.show("加入购物车成功",500);
            }
        })
    }
    return (
        <View style={style.wrap}  >
        <TouchableOpacity
        activeOpacity={0.5}
        onPress={() => {
            global.productId=item.id;
            const { navigate } =Navigation.getNavigation();
            navigate('ProductDesc')
        }}
        style={{flexDirection:'row'}}>
        <Image
         style={{ width:width*0.3, height:150,resizeMode:"stretch",borderTopLeftRadius:20,borderTopRightRadius:20}}
         source={{uri:img}}
        />
       <View>
       <Text style={{marginLeft:10,overflow:'hidden',width:width*0.50,height:20,fontSize:15,color:'black',marginTop:10}}>{item.name}</Text>
        <Text style={{marginLeft:10,width:width*0.50,height:33,fontSize:13,marginTop:10}}>{item.subtitle}</Text>
        <View style={style.btom}>
        <View style={{flexDirection:'row',alignItems:'flex-end'}}><Text style={{fontSize:18}}>￥</Text>
        <Text style={{color:'red',fontSize:20}}>{item.price}</Text></View>
        </View>
        <View style={{width:'35%',position:'absolute',bottom:0,left:10}}><Button title="加入购物车" color='orange' onPress={()=>{addCart(item.id)}} /></View>
       </View>
        </TouchableOpacity>
        </View>
    )
}
style=StyleSheet.create({
    wrap:{
        width:width*0.8,
        height:160,
        marginTop:10,
        backgroundColor:'white',
        borderRadius:10,
        position:'relative'
    },
    btom:{marginTop:10,width:'100%',flexDirection:"row",justifyContent:'space-between'}
})