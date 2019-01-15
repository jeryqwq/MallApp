import React from 'react'
import {View,Text,Image,StyleSheet,Dimensions,ScrollView,TouchableOpacity,ToastAndroid} from 'react-native';
import Return from './../Return'
import OrderAjax from './../../ajax/orderAjax'
import emptyComponent from './../contains/EmptyComonent'
import config from './../../config/uriconfig'
import Navigation from './../../store/navigation'
const {width,height} = Dimensions.get('window')

export default class OrderList extends React.Component{
    constructor(props){
        super(props);
        this.state={
            curIndex:global.curIndex?global.curIndex:0,
            pageSize:50,
            pageNum:1,
            data:[],
        }
    }
    componentDidMount(){
    this.getData();
    }
    getData(){
        const self=this;
        OrderAjax.list(this.state.pageNum,this.state.pageSize).then((res) => {
            let resobj=eval("("+res._bodyInit+")");
            if(resobj.status==0){
                self.setState({
                    data:resobj.data.list
                },()=>{
                })
            }
        }).catch((err) => {

        });
    }
    OrderItem(paymentType){
        if(this.state!==undefined){
            return (
               this.state.data.map((item1,index)=>(
                item1.status==this.state.curIndex?<View  key={index}style={{backgroundColor:'white',margin:10,borderRadius:20,paddingBottom:20}}>
                     <View style={{marginLeft:20,flexDirection:'row',alignItems:'center',justifyContent:'space-between',height:30}}>
                                <Text>订单号:{item1.orderNo}</Text>
                                {paymentType(item1.status)}
                            </View>
                     {
                       item1.orderItemVoList.map((item,index)=>(
                           <View key={index}>
                        <View style={{flexDirection:'row',alignItems:"flex-start",justifyContent:'flex-start',margin:10}}>
                            <Image style={{width:width*0.3,height:width*0.3}} source={{uri:item.productImage.replace("ftp://127.0.0.1/",config.imgAddressFront)}}/>
                            <View style={{width:width*0.6,marginLeft:width*0.03}}>
                                <Text >{item.productName}</Text>
                                <View style={{flexDirection:'row'}}>
                                <Text style={{color:'red'}}>{item.currentUnitPrice}</Text>
                                <Text style={{marginLeft:20}}>*{item.quantity}</Text>
                                </View>
                            </View>
                            </View>
                        </View>
                         ))
                     }
                     <View style={{flexDirection:'row',justifyContent:"flex-end",alignItems:"center"}}>
                         <Text style={{marginRight:20}}>共{item1.orderItemVoList.length}件商品</Text>
                         <Text>总计:</Text>
                         <Text style={{color:'red',fontSize:16,marginRight:20}}>{item1.payment}</Text>
                         {isBtns(item1.status,item1)}
                     </View>
                   </View>:this.state.curIndex==0?<View style={{backgroundColor:'white',margin:10,borderRadius:20}}>
                     <View style={{marginLeft:20,flexDirection:'row',alignItems:'center',justifyContent:'space-between',height:30}}>
                                <Text>订单号:{item1.orderNo}</Text>
                                {paymentType(item1.status)}
                            </View>
                     {
                       item1.orderItemVoList.map((item,index)=>(
                           <View key={index}>
                        <View style={{flexDirection:'row',alignItems:"flex-start",justifyContent:'flex-start',margin:10}}>
                            <Image style={{width:width*0.3,height:width*0.3}} source={{uri:item.productImage.replace("ftp://127.0.0.1/",config.imgAddressFront)}}/>
                            <View style={{width:width*0.6,marginLeft:width*0.03}}>
                                <Text >{item.productName}</Text>
                                <View style={{flexDirection:'row'}}>
                                <Text style={{color:'red'}}>{item.currentUnitPrice}</Text>
                                <Text style={{marginLeft:20}}>*{item.quantity}</Text>
                                </View>
                            </View>
                            </View>
                        </View>
                         ))
                     }
                     <View style={{flexDirection:'row',justifyContent:"flex-end",alignItems:"center",paddingBottom:20}}>
                         <Text style={{marginRight:20}}>共{item1.orderItemVoList.length}件商品</Text>
                         <Text>总计:</Text>
                         <Text style={{color:'red',fontSize:16,marginRight:20}}>{item1.payment}</Text>
                        {isBtns(item1.status,item1)}
                     </View>
                   </View>:null
                   
               )
               )
            )
        }else{
            return emptyComponent("未获取到任何订单数据");
        }
    }
    render(){
        isBtns=function(status,item1){
               if(status==10){
                return(
                    <TouchableOpacity
                    style={{width:width*0.15,height:30,borderRadius:15,borderStyle:"solid",borderWidth:1,borderColor:'orangered',alignItems:"center",justifyContent:"center",marginRight:20}}
                    onPress={()=>{
                        global.orderInfo=item1;
                       const {navigate} =Navigation.getNavigation();
                       navigate("AliPay");
                    }}
                    >
                        <Text style={{color:'orangered'}}>点击付款</Text>
                    </TouchableOpacity>
                   )
               }
               if( status==50){
                   return(
                    <TouchableOpacity
                    style={{width:width*0.15,height:30,borderRadius:15,borderStyle:"solid",borderWidth:1,borderColor:'orangered',alignItems:"center",justifyContent:"center",marginRight:20}}
                    onPress={()=>{
                        global.orderInfo=item1;
                        const {navigate} =Navigation.getNavigation();
                        navigate("Comments");
                    }}
                    >
                        <Text style={{color:'orangered'}}>追加评价</Text>
                    </TouchableOpacity>
                   )
               }
               if( status==40){
                return(
                 <TouchableOpacity
                 style={{width:width*0.15,height:30,borderRadius:15,borderStyle:"solid",borderWidth:1,borderColor:'orangered',alignItems:"center",justifyContent:"center",marginRight:20}}
                 onPress={()=>{
                    global.orderInfo=item1;
                    const {navigate} =Navigation.getNavigation();
                    navigate("Comments");
                 }}
                 >
                     <Text style={{color:'orangered'}}>点击评价</Text>
                 </TouchableOpacity>
                )
            }
               if( status==30){
                return(
                 <TouchableOpacity
                 style={{width:width*0.15,height:30,borderRadius:15,borderStyle:"solid",borderWidth:1,borderColor:'orangered',alignItems:"center",justifyContent:"center",marginRight:20}}
                 onPress={()=>{
                    OrderAjax.setShipped(item1.orderNo).then((res)=>{
                        const resObj=eval("("+res._bodyInit+")");
                        if(resObj.status==0){
                            ToastAndroid.show("签收成功",500)
                        }
                    })
                 }}
                 >
                     <Text style={{color:'orangered'}}>点击签收</Text>
                 </TouchableOpacity>
                )
            }
            
        }
        paymentType=function(index){
            if(index==0){
                return(
                    <Text style={{color:'red',marginRight:20}}>已取消</Text>
                )
            }
            if(index==10){
                return(
                <Text style={{color:'red',marginRight:20}}>未付款/待付款</Text>
                )
            }
            if(index==20){
                return(
                <Text style={{color:'red',marginRight:20}}>已付款/等待发货</Text>
                )
            }
            if(index==30){
                return(
                <Text style={{color:'red',marginRight:20}}>已发货/待签收</Text>
                )
            }
            if(index==40){
                return(
                <Text style={{color:'red',marginRight:20}}>已签收/待评价</Text>
                )
            }
            if(index==50){
                return(
                <Text style={{color:'red',marginRight:20}}>交易成功/订单关闭</Text>
                )
            }
    
        }
        return (
            <View>
                <Return returnPath="Person" title="我的所有订单" subTitle=""/>
                <View style={{flexDirection:"row",alignItems:"center",justifyContent:'space-around',height:height*0.05,backgroundColor:'white'}}>
                    <Text style={this.state.curIndex==0?style.textcur:style.textnor} onPress={()=>{this.setState({curIndex:0});global.curIndex=0}}>全部</Text>
                    <Text style={this.state.curIndex==10?style.textcur:style.textnor} onPress={()=>{this.setState({curIndex:10});global.curIndex=10}}>待付款</Text>
                    <Text style={this.state.curIndex==30?style.textcur:style.textnor} onPress={()=>{this.setState({curIndex:30});global.curIndex=30}}>待收货</Text>
                    <Text style={this.state.curIndex==40?style.textcur:style.textnor} onPress={()=>{this.setState({curIndex:40});global.curIndex=40}}>已签收</Text>
                    <Text style={this.state.curIndex==50?style.textcur:style.textnor} onPress={()=>{this.setState({curIndex:50});global.curIndex=50}}>追加评价</Text>
                </View>
                <ScrollView style={{height:height*0.87}}>
                {this.OrderItem(paymentType)}
                </ScrollView>
            </View>
        )
    }
}
let style=StyleSheet.create({
    textnor:{borderBottomColor:'red',borderStyle:'solid',width:'20%',height:height*0.03,textAlign:"center"},
    textcur:{borderBottomColor:'red',borderBottomWidth:2,borderStyle:'solid',width:'20%',height:height*0.03,textAlign:"center",color:'red'}
})