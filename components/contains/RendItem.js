
import React from 'react'
import {View,Text,StyleSheet,Dimensions,Image,Button,TouchableOpacity} from "react-native"
import config from "./../../config/uriconfig"
import Navigation from './../../store/navigation'
import CartAjax from './../../ajax/cartAjax'
import ToastExampl from './../../native_methods/Toast'
const {width} = Dimensions.get('window')

const cols = 2;
const vMargin = 10;
const cellWH = (width-2*vMargin-15)/cols;
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
        }}>
        <Image
         style={{ width:cellWH, height:200,resizeMode:"stretch",borderTopLeftRadius:20,borderTopRightRadius:20}}
         source={{uri:img}}
        />
        <Text style={{overflow:'hidden',height:20,fontSize:13,lineHeight:20,color:'black'}}>{item.name}</Text>
        <Text style={{overflow:'hidden',height:20,fontSize:10,lineHeight:10}}>{item.subtitle}</Text>
        <View style={style.btom}>
        <View style={{flexDirection:'row',alignItems:'flex-end'}}><Text style={{fontSize:18}}>￥</Text>
        <Text style={{color:'red',fontSize:20}}>{item.price}</Text></View>
        <View style={{width:'40%'}}><Button title="加入购物车" color='orange' onPress={()=>{addCart(item.id)}} /></View>
        </View>
        </TouchableOpacity>
        </View>
    )
}
style=StyleSheet.create({
    wrap:{
        width:cellWH,
        height:280,
        marginTop:10,
        backgroundColor:'white',
        borderRadius:10
    },
    btom:{width:'100%',flexDirection:"row",justifyContent:'space-between'}
})