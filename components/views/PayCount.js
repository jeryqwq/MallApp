import React from "react";
import {View,Text,StyleSheet,Dimensions,Image,TouchableOpacity,ScrollView} from "react-native"
import Return from './../Return'

const {width,height} = Dimensions.get('window')

export default class PayCount extends React.Component{
    constructor(props){
        super(props);
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
                <Text style={style.line3}>></Text>
            </View>
            )
        }
        ProductInfos=function(){
            return (
                <View style={{flexDirection:"row",alignItems:"center",justifyContent:"center",backgroundColor:'#EAEAEA'}}>
                    <Image source={{uri:'https://gss0.bdstatic.com/-4o3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike92%2C5%2C5%2C92%2C30/sign=62d46c39067b020818c437b303b099b6/d4628535e5dde7119c3d076aabefce1b9c1661ba.jpg'}} style={{width:width*0.25,height:width*0.25}} />
                    <View style={{marginLeft:width*0.03,width:width*0.68,height:width*0.3,justifyContent:'space-around'}}>
                        <Text style={{color:'#141414',fontSize:15}}>asdas asdasdaagf阿萨德爱色  阿萨德爱色啊爱色爱色aasdasdaagfsd as </Text>
                        <Text style={{color:'gray'}}>这是结算阿萨德静安寺接扫凯撒奖的快乐</Text>
                        <Text style={{color:"#CD0000",fontSize:13,borderStyle:'solid',borderWidth:1,borderRadius:4,borderColor:'#CD0000',width:width*0.28,textAlign:"center"}}>免运费，支持运费险</Text>
                        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                        <Text style={{color:'red'}}>￥ 158 </Text>
                        <Text>*1</Text>
                        </View>
                    </View>
                </View>
            )
        }
        return(
            <View >
                <Return title="确认订单" subtitle="" returnPath="ShoppingCart"/>
                <AddressInfo/>
                <ScrollView style={{height:height*0.71}}>
                <ProductInfos/>
                <ProductInfos/>
                </ScrollView>

                <View style={{width:width,flexDirection:'row',height:50,alignItems:"center",justifyContent:'flex-end',backgroundColor:'white'}}>
                    <Text style={{fontSize:16,color:'black'}}>合计:</Text>
                    <Text style={{color:'red',fontSize:14,marginRight:5}}>￥:513</Text>
                    <TouchableOpacity activeOpacity={0.5} onPress={()=>{
                 }} >
                <View style={{alignItems:"center",justifyContent:'center',width:width*0.25,height:40,backgroundColor:'#ff6100',borderRadius:20}}>
                <Text style={{color:'white',fontSize:17}}>结算</Text>
                </View>
                </TouchableOpacity>
                </View>

           
            </View>
        )
    }
}
const style=StyleSheet.create({
    wrap:{backgroundColor:'white',flexDirection:'row',justifyContent:"center",alignItems:"center",width:width,borderBottomWidth:1,borderStyle:'solid',borderBottomColor:'#f5f5f5'},
    partLeft:{width:width*0.15,height:120,flexDirection:'row',alignItems:"center",justifyContent:'center'},
    nameWrap:{width:width*0.1,height:width*0.1,borderRadius:width*0.05,backgroundColor:'grey',alignItems:"center",justifyContent:'center'},
    line1:{flexDirection:'row',alignItems:'flex-end',justifyContent:"flex-start"},
    line2:{flexDirection:"column",alignItems:'center',justifyContent:"flex-start"},
    line3:{fontSize:30,width:width*0.1,paddingLeft:10,borderLeftColor:'gray',borderLeftWidth:2,borderStyle:'solid',color:'#999999'},
    inlineText:{color:'orange',backgroundColor:'#FFF0F5'}
})