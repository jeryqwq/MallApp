import React from 'react';
import {View,Text,Dimensions,Image,ScrollView} from 'react-native';
import config from './../../config/uriconfig'
import Return from './../Return'
import orderAjax from './../../ajax/orderAjax'
import Navigation from './../../store/navigation'
const {width,height} = Dimensions.get('window')

export default class AliPay extends React.Component{
    constructor(){
        super();
        this.state={
            payCodeImgUlr:'',
            isPayed:false,
            checkTimer:null
        }
    }
    componentDidMount(){
        this.pay();
        this.checkPayStatus();
    }
    componentWillUnmount(){
        clearInterval(this.state.checkTimer);
    }
    pay(){
        orderAjax.pay(global.orderInfo.orderNo).then((res)=>{
            const resObj=eval('('+res._bodyInit+")");
            if(resObj.status==0){
                this.setState({
                    payCodeImgUlr:resObj.data.qrUrl
                })
            }
        }).catch((err)=>{

        })
    }
    checkPayStatus(){
      this.setState({
          checkTimer: setInterval(()=>{
            orderAjax.queryPayStatus(global.orderInfo.orderNo).then((res)=>{
                const resObj=eval("("+res._bodyInit+")");
                if(resObj.status==0){
                   if(resObj.data==true){
                    this.setState({
                        isPayed:true
                    })
                    clearInterval(this.state.checkTimer);
                    const {navigate} =Navigation.getNavigation();
                    navigate("PaySuccess");
                   }
                }
            })
           },3000)
      })
    }
    render(){
        return(
            <View  >
            <Return returnPath="ShoppingCart"  title="等待付款" subtitle="我的订单" returnDo={()=>{
                      const {navigate} =Navigation.getNavigation();
                      navigate("OrderList");       
            }}/>
            <ScrollView  style={{backgroundColor:'white',marginLeft:10,marginRight:10,marginTop:10,borderRadius:20,height:height*0.5}}>
            <View style={{marginLeft:20,flexDirection:'row',alignItems:'center',justifyContent:'space-between',height:30}}>
                       <Text>订单号:{global.orderInfo.orderNo?global.orderInfo.orderNo:"0000"}</Text>
                       <Text style={{color:'red'}}>付款等待中</Text>
                   </View>
                  <View >
                  {
                      global.orderInfo.orderItemVoList.map((item,index)=>(
                           <View key={index}>
                        <View style={{flexDirection:'row',alignItems:"flex-start",justifyContent:'flex-start',margin:10}}>
                            <Image style={{width:width*0.3,height:width*0.3}} source={{uri:item.productImage.replace("ftp://127.0.0.1/",config.imgAddressFront)}}/>
                            <View style={{width:width*0.6,marginLeft:width*0.03}}>
                                <Text >{item.productName}</Text>
                                <View style={{flexDirection:'row'}}>
                                <Text style={{color:'red'}}>{item.currentUnitPrice?item.currentUnitPrice:0}</Text>
                                <Text style={{marginLeft:20}}>*{item.quantity?item.quantity:0}</Text>
                                </View>
                            </View>
                            </View>
                        </View>
                         ))
                     }
            <View style={{flexDirection:'row',justifyContent:"flex-end",alignItems:"flex-end"}}>
                <Text style={{marginRight:20}}>共{global.orderInfo.orderItemVoList.length?global.orderInfo.orderItemVoList.length:0}件商品</Text>
                <Text>总计:</Text>
                <Text style={{color:'red',fontSize:16,marginRight:20}}>{global.orderInfo.payment?global.orderInfo.payment:"未知"}</Text>
            </View>
          </View>
          </ScrollView>
        <View style={{backgroundColor:'#63B8FF',height:height*0.65}}>
        <Text style={{fontSize:25,textAlign:'center',color:'white'}}>请使用支付宝扫一扫付款</Text>
          <Image style={{width:width*0.5,height:width*0.5,marginLeft:width*0.25,marginTop:50}} source={{uri:this.state.payCodeImgUlr?this.state.payCodeImgUlr.replace("ftp://127.0.0.1/",config.imgAddressFront):undefined}}/>
        </View>
          </View>
        )
    }
}
