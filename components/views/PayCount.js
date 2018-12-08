import React from "react";
import {View,Text,StyleSheet,Dimensions,Image,TouchableOpacity,ScrollView} from "react-native"
import Return from './../Return'
import Navigation from "./../../store/navigation"
import OrderAjax from './../../ajax/orderAjax'
import config from './../../config/uriconfig'
const {width,height} = Dimensions.get('window')

export default class PayCount extends React.Component{
    constructor(){
        super();
        this.state={
            data:{orderItemVoList:[]}
        }
    }
    componentDidMount(){
        this.getData();
    }
    getData(){
        OrderAjax.getOrderCartProduct().then((res)=>{
            let resobj=eval("("+res._bodyInit+")")
            if(resobj.status===0){
                this.setState({
                    data:resobj.data
                },()=>{
                    console.warn(this.state.data)
                })
            }
        })
    }
    ProductInfos(){
        if(this.state!==undefined){
        return (
            this.state.data.orderItemVoList.map((item,index)=>(
            <View key={index} style={{flexDirection:"row",alignItems:"center",justifyContent:"center",backgroundColor:'white'}}>
                <Image source={{uri:item.productImage.replace("ftp://127.0.0.1/",config.imgAddressFront)}} style={{width:width*0.23,height:width*0.23}} />
                <View style={{marginLeft:width*0.03,width:width*0.68,height:width*0.25,justifyContent:'space-around'}}>
                    <Text style={{color:'#141414',fontSize:15}}>{item.productName}</Text>
                    <Text style={{color:"#CD0000",fontSize:13,borderStyle:'solid',borderWidth:1,borderRadius:4,borderColor:'#CD0000',width:width*0.28,textAlign:"center"}}>免运费，支持运费险</Text>
                    <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                    <Text style={{color:'red'}}>￥{item.currentUnitPrice} </Text>
                    <Text>*{item.quantity}</Text>
                    </View>
                    <Text>合计:{item.totalPrice}</Text>
                </View>
            </View>
                )
            ))               
        }else{
            return<Text>未获取到数据</Text>;
        }
    }
    render(){
        AddressInfo=function(){
            return (
                <View style={style.wrap}>
                <View style={style.partLeft}>
                    <View style={style.nameWrap}>
                    <Text style={{color:'white',fontSize:20}}>陈杰</Text>
                    </View>
                </View>
                <View style={{width:width*0.75}}>
                    <View style={style.line1}>
                        <Text style={{fontSize:18,color:'black'}}>陈杰</Text>
                        <Text style={{color:"gray",marginLeft:20}}>13799418338</Text>
                    </View>
                    <View style={style.line2}>
                    <Text style={{lineHeight:18,width:width*0.69}}><Text style={style.inlineText}>默认地址</Text>福建省福州市撒旦阿萨德阿萨德爱色打撒打撒打撒阿萨德阿萨德 求安慰多群无vqc七点起床清除去错误</Text>
                    <Text style={style.inlineText}>(此收获地址为默认地址，如需更换请点击右侧图标)</Text>
                    </View>
                </View>
                <Text style={style.line3} onPress={()=>{
                const {navigate} =Navigation.getNavigation();
                navigate("address");
                }}>></Text>
            </View>
            )
        }
      
        return(
            <View >
                <Return title="确认订单" subtitle="" returnPath="ShoppingCart"/>
                <AddressInfo/>
                <ScrollView style={{height:height*0.75}}>
                {this.ProductInfos()}               
                </ScrollView>

                <View style={{width:width,flexDirection:'row',height:height*0.055,alignItems:"center",justifyContent:'flex-end',backgroundColor:'white',borderTopColor:'#f5f5f5',borderTopWidth:1,borderStyle:'solid'}}>
                    <Text style={{fontSize:16,color:'black'}}>合计:</Text>
                    <Text style={{color:'red',fontSize:14,marginRight:5}}>￥:{this.state.data.productTotalPrice}</Text>
                    <TouchableOpacity activeOpacity={0.5} onPress={()=>{
                 }} >
                <View style={{alignItems:"center",justifyContent:'center',width:width*0.25,height:40,backgroundColor:'#ff6100',borderRadius:20}}>
                <Text style={{color:'white',fontSize:17}}>提交订单</Text>
                </View>
                </TouchableOpacity>
                </View>

           
            </View>
        )
    }
}
const style=StyleSheet.create({
    wrap:{backgroundColor:'white',flexDirection:'row',justifyContent:"center",alignItems:"center",width:width,borderBottomWidth:1,borderStyle:'solid',borderBottomColor:'#f5f5f5'},
    partLeft:{width:width*0.15,height:height*0.12,flexDirection:'row',alignItems:"center",justifyContent:'center'},
    nameWrap:{width:width*0.1,height:width*0.1,borderRadius:width*0.05,backgroundColor:'grey',alignItems:"center",justifyContent:'center'},
    line1:{flexDirection:'row',alignItems:'flex-end',justifyContent:"flex-start"},
    line2:{flexDirection:"column",alignItems:'center',justifyContent:"flex-start"},
    line3:{fontSize:30,width:width*0.1,paddingLeft:10,borderLeftColor:'gray',borderLeftWidth:2,borderStyle:'solid',color:'#999999'},
    inlineText:{color:'orange',backgroundColor:'#FFF0F5'}
})