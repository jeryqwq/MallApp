import React from 'react';
import {View,Text,Image,Dimensions,StyleSheet} from "react-native";
const {width,height} = Dimensions.get('window')
import Navigation from './../store/navigation'
export default class ProductStatus extends React.Component{
    constructor(){
        super();
        this.state={

        }
    }
    render(){
        return(
            <View style={{backgroundColor:'white',borderRadius:20,width:width*0.96,marginLeft:width*0.02,marginTop:10}}>
                <View style={{height:height*0.05,flexDirection:'row',justifyContent:'space-between',alignItems:"center",borderBottomColor:'rgb(238, 238, 231)',borderBottomWidth:1,borderStyle:'solid'}}>
                    <Text style={{marginLeft:10,color:'black'}}>我的订单</Text>
                    <Text style={{color:'#999999',marginRight:10}} onPress={()=>{
                           const {navigate} =Navigation.getNavigation();
                           navigate("OrderList");
                    }}>查看全部订单></Text>
                </View>
                <View style={{flexDirection:'row',justifyContent:"space-around",alignItems:"center",marginTop:15,paddingBottom:10}}>
                    <View>
                         <View style={style.numwrap}>
                            <Text style={{color:'red'}}>1</Text>
                        </View>   
                        <View style={{alignItems:"center"}}>
                            <Image
                            style={style.img}
                            source={require('./../imgs/待付款.png')}
                            />
                            <Text style={{color:'#666666'}}>待付款</Text>
                        </View>
                    </View>
                    {/* 分割 */}
                <View>
                        <View style={style.numwrap}>
                            <Text style={{color:'red'}}>1</Text>
                        </View>    
                    <View style={{alignItems:"center"}}>
                        <Image
                        style={style.img}
                        source={require('./../imgs/待发货.png')}
                        />
                            <Text style={{color:'#666666'}}>待发货</Text>
                        </View>
                </View>
                    {/* 分割 */}
             <View>
                        <View style={style.numwrap}>
                            <Text style={{color:'red'}}>3</Text>
                        </View>       
                <View style={{alignItems:"center"}}>
                    <Image
                    style={style.img}
                    source={require('./../imgs/待收货.png')}
                    />
                    <Text style={{color:'#666666'}}>待收获</Text>
                </View>
            </View>

             <View>
                        <View style={style.numwrap}>
                            <Text style={{color:'red'}}>5</Text>
                        </View> 
                <View style={{alignItems:"center"}}>
                    <Image
                    style={style.img}
                    source={require('./../imgs/评价.png')}
                    />
                    <Text style={{color:'#666666'}}>待评价</Text>
                </View>
            </View>
                </View>
        </View>
        )
    }
}
const style=StyleSheet.create({
    img:{ width:35, height:35,resizeMode:"stretch",borderRadius:25},
    numwrap:{width:20,height:20,borderRadius:10,borderStyle:'solid',borderWidth:1,borderColor:'red',alignItems:'center',justifyContent:'center',position:'relative',top:10,left:25}
})
