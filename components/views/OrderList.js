import React from 'react'
import {View,Text,Image,StyleSheet,Dimensions,ScrollView} from 'react-native';
import Return from './../Return'
import OrderAjax from './../../ajax/orderAjax'
import emptyComponent from './../contains/EmptyComonent'
import config from './../../config/uriconfig'
const {width,height} = Dimensions.get('window')

export default class OrderList extends React.Component{
    constructor(){
        super();
        this.state={
            curIndex:0,
            pageSize:8,
            pageNum:1,
            data:[]
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
                    console.error(this.state.data)
                })
            }
        }).catch((err) => {
            
        });
    }
    OrderItem(paymentType){
        if(this.state!==undefined){
            return (
               this.state.data.map((item1,index)=>(
                 <View style={{backgroundColor:'white',margin:10,borderRadius:20}}>
                     <View style={{marginLeft:20,flexDirection:'row',alignItems:'center',justifyContent:'space-between',height:30}}>
                                <Text>订单号:{item1.orderNo}</Text>
                                {paymentType(item1.status)}
                            </View>
                     {
                       item1.orderItemVoList.map((item,index)=>(
                           <View>
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
                     <View style={{flexDirection:'row',justifyContent:"flex-end",alignItems:"flex-end"}}>
                         <Text style={{marginRight:20}}>共{item1.orderItemVoList.length}件商品</Text>
                         <Text>总计:</Text>
                         <Text style={{color:'black',fontSize:16,marginRight:20}}>{item1.payment}</Text>
                     </View>
                   </View>
               ))
            )
        }else{
            return emptyComponent("未获取到任何数据");
        }
    }
    render(){
        paymentType=function(index){
            if(index==0){
                return(
                    <Text style={{color:'red'}}>已取消</Text>
                )
            }
            if(index==10){
                return(
                <Text style={{color:'red'}}>未付款</Text>
                )
            }
            if(index==20){
                return(
                <Text style={{color:'red'}}>已付款/等待发货</Text>
                )
            }
            if(index==30){
                return(
                <Text style={{color:'red'}}>已发货</Text>
                )
            }
            if(index==40){
                return(
                <Text style={{color:'red'}}>已签收</Text>
                )
            }
            if(index==50){
                return(
                <Text style={{color:'red'}}>交易成功/待评价</Text>
                )
            }
            if(index==60){
                return(
                <Text style={{color:'red'}}>交易失败</Text>
                )
            }
        }
        return (
            <View>
                <Return returnPath="Person" title="我的所有订单" subTitle=""/>
                <View style={{flexDirection:"row",alignItems:"center",justifyContent:'space-around',height:height*0.05,backgroundColor:'white'}}>
                    <Text style={this.state.curIndex==0?style.textcur:style.textnor} onPress={()=>this.setState({curIndex:0})}>全部</Text>
                    <Text style={this.state.curIndex==1?style.textcur:style.textnor} onPress={()=>this.setState({curIndex:1})}>待付款</Text>
                    <Text style={this.state.curIndex==2?style.textcur:style.textnor} onPress={()=>this.setState({curIndex:2})}>待发货</Text>
                    <Text style={this.state.curIndex==3?style.textcur:style.textnor} onPress={()=>this.setState({curIndex:3})}>待评价</Text>
                </View>
                <ScrollView style={{height:height*0.9}}>
                {this.OrderItem(paymentType)}

                </ScrollView>
            </View>
        )
    }
}
let style=StyleSheet.create({
    textnor:{borderBottomColor:'red',borderStyle:'solid',width:'20%',height:height*0.03,textAlign:"center"},
    textcur:{borderBottomColor:'red',borderBottomWidth:2,borderStyle:'solid',width:'20%',height:height*0.03,textAlign:"center"}
})