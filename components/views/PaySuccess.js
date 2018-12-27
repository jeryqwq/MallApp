import React from 'react'
import {View,Text,Image,Dimensions,StyleSheet} from 'react-native'
import Return from './../Return'
import Navigation from './../../store/navigation'
const {width,height} = Dimensions.get('window')

export default class PaySuccess extends React.Component{
    constructor(){
        super()
        this.state={

        }
    }
    render(){
        return(
            <View style={{backgroundColor:"white",height:width,flexDirection:"column",height:height}}>
                <Return returnPath="ShoppingCart"  title="付款成功" subtitle="查看订单" returnDo={()=>{
                    
                }}/>
                <Text style={{fontSize:25,textAlign:'center',color:'red',marginTop:40}}>恭喜您！付款成功！请耐心等待商品发货</Text>
                <Text style={{fontSize:20,textAlign:'center',color:'red',marginTop:40}}>订单号:{global.orderInfo.orderNo?global.orderInfo.orderNo:"0000"}</Text>
                <View style={{alignItems:'center'}}>
                <Image style={{width:width*0.8,height:width*0.8,marginTop:60}} source={require('./../../imgs/smile.jpg')}/>
                <View style={{flexDirection:'row',width:width*0.8,justifyContent:"space-around",marginTop:50}}>
                    <View style={style.btnWrap}><Text style={{color:'white'}} onPress={()=>{
                        const {navigate} =Navigation.getNavigation();
                        navigate("ShoppingCart");
                    }}>返回我的购物车</Text></View>
                    <View style={style.btnWrap}><Text style={{color:'white'}} onPress={()=>{
                          global.curIndex=0;
                        const {navigate} =Navigation.getNavigation();
                        navigate("OrderList");
                    }}>查看我的订单历史</Text></View>
                </View>
                {/* {console.error(global.orderInfos)} */}
                </View>
            </View>
        )
    }
}
const style=StyleSheet.create({
    btnWrap:{
        width:width*0.3,
        height:40,
        backgroundColor:'orange',
        alignItems:'center',
        justifyContent:'center',
        borderRadius:10
    }
})