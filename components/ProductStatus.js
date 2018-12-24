import React from 'react';
import {View,Text,Image,Dimensions,StyleSheet,TouchableOpacity} from "react-native";
const {width,height} = Dimensions.get('window')
import Navigation from './../store/navigation'
import OrderAjax from './../ajax/orderAjax'
export default class ProductStatus extends React.Component{

    constructor(){
        super();
        this.state={
            data:[],
            item0:0,
            item1:0,
            item2:0,
            item3:0
        }
    }
    componentDidMount(){
            OrderAjax.list(1,50).then((res) => {
                let resobj=eval("("+res._bodyInit+")");
                if(resobj.status==0){
                    this.setState({
                        data:resobj.data.list
                    },()=>{
                        this.state.data.map((item,index)=>{
                            if(item.status==10)this.setState({item0:this.state.item0+1});
                            if(item.status==20)this.setState({item1:this.state.item1+1});
                            if(item.status==30)this.setState({item2:this.state.item2+1});
                            if(item.status==50)this.setState({item3:this.state.item3+1});
                        })
                    })
                }
            }).catch((err) => {
    
            });
        
    }
    render(){
        function  toList (){
            const {navigate} =Navigation.getNavigation();
            navigate("OrderList");
        }
        return(
            <View style={{backgroundColor:'white',borderRadius:20,width:width*0.96,marginLeft:width*0.02,marginTop:10}}>
                <View style={{height:height*0.05,flexDirection:'row',justifyContent:'space-between',alignItems:"center",borderBottomColor:'rgb(238, 238, 231)',borderBottomWidth:1,borderStyle:'solid'}}>
                    <Text style={{marginLeft:10,color:'black'}}>我的订单</Text>
                    <Text style={{color:'#999999',marginRight:10}} onPress={()=>{
                        global.curIndex=0;
                        toList();
                    }}>查看全部订单></Text>
                </View>
                <View style={{flexDirection:'row',justifyContent:"space-around",alignItems:"center",marginTop:15,paddingBottom:10}}>
                    <TouchableOpacity onPress={()=>{global.curIndex=0;toList()}}>
                         <View style={style.numwrap}>
                            <Text style={{color:'red'}}>{this.state.item0?this.state.item0:0}</Text>
                        </View>   
                        <View style={{alignItems:"center"}}>
                            <Image
                            style={style.img}
                            source={require('./../imgs/待付款.png')}
                            />
                            <Text style={{color:'#666666'}}>待付款</Text>
                        </View>
                    </TouchableOpacity>
                    {/* 分割 */}
                <TouchableOpacity onPress={()=>{global.curIndex=10;toList()}}>
                        <View style={style.numwrap}>
                            <Text style={{color:'red'}}>{this.state.item1?this.state.item1:0}</Text>
                        </View>    
                    <View style={{alignItems:"center"}}>
                        <Image
                        style={style.img}
                        source={require('./../imgs/待发货.png')}
                        />
                            <Text style={{color:'#666666'}}>待发货</Text>
                        </View>
                </TouchableOpacity>
                    {/* 分割 */}
             <TouchableOpacity onPress={()=>{global.curIndex=30;toList()}}>
                        <View style={style.numwrap}>
                            <Text style={{color:'red'}}>{this.state.item2?this.state.item2:0}</Text>
                        </View>       
                <View style={{alignItems:"center"}}>
                    <Image
                    style={style.img}
                    source={require('./../imgs/待收货.png')}
                    />
                    <Text style={{color:'#666666'}}>待收获</Text>
                </View>
            </TouchableOpacity>

             <TouchableOpacity onPress={()=>{global.curIndex=50;toList()}}>
                        <View style={style.numwrap}>
                            <Text style={{color:'red'}}>{this.state.item3?this.state.item3:0}</Text>
                        </View> 
                <View style={{alignItems:"center"}}>
                    <Image
                    style={style.img}
                    source={require('./../imgs/评价.png')}
                    />
                    <Text style={{color:'#666666'}}>待评价</Text>
                </View>
            </TouchableOpacity>
                </View>
        </View>
        )
    }
}
const style=StyleSheet.create({
    img:{ width:35, height:35,resizeMode:"stretch",borderRadius:25},
    numwrap:{width:20,height:20,borderRadius:10,borderStyle:'solid',borderWidth:1,borderColor:'red',alignItems:'center',justifyContent:'center',position:'relative',top:10,left:25}
})
