import React from 'react'
import {View,Text,Image,StyleSheet,Dimensions,ScrollView} from 'react-native';
import Return from './../Return'
import OrderAjax from './../../ajax/orderAjax'
import emptyComponent from './../contains/EmptyComonent'
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
                    console.warn(this.state.data)
                })
            }
        }).catch((err) => {
            
        });
    }
    OrderItem(){
        if(this.state!==undefined){
            return (
               this.state.data.map((item,index)=>(
                   <Text>
                     123123
                   </Text>
               ))
            )
        }else{
            return emptyComponent("未获取到任何数据")
        }
    }
    render(){
        return (
            <View>
                <Return returnPath="Person" title="我的所有订单" subTitle=""/>
                <View style={{flexDirection:"row",alignItems:"center",justifyContent:'space-around',height:height*0.05}}>
                    <Text style={this.state.curIndex==0?style.textcur:style.textnor} onPress={()=>this.setState({curIndex:0})}>全部</Text>
                    <Text style={this.state.curIndex==1?style.textcur:style.textnor} onPress={()=>this.setState({curIndex:1})}>待付款</Text>
                    <Text style={this.state.curIndex==2?style.textcur:style.textnor} onPress={()=>this.setState({curIndex:2})}>待发货</Text>
                    <Text style={this.state.curIndex==3?style.textcur:style.textnor} onPress={()=>this.setState({curIndex:3})}>待评价</Text>
                </View>
                <ScrollView>
                {this.OrderItem()}

                </ScrollView>
            </View>
        )
    }
}
let style=StyleSheet.create({
    textnor:{borderBottomColor:'red',borderStyle:'solid',width:'20%',height:height*0.03,textAlign:"center"},
    textcur:{borderBottomColor:'red',borderBottomWidth:2,borderStyle:'solid',width:'20%',height:height*0.03,textAlign:"center"}
})