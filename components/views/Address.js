import React from "react";
import {View,Text,Dimensions,StyleSheet,ScrollView} from "react-native"
import Return from './../Return'
import AddressAjax from './../../ajax/addressAjax'
import Navigation from "./../../store/navigation"
const {width,height} = Dimensions.get('window')
const {navigate} =Navigation.getNavigation();

export default class Address extends React.Component{
    constructor(props){
        super(props);
        this.state={
            data:{list:[]},
        }
    }
    componentDidMount(){
        this.getData(1,20);
    }
    getData(pageNum,pageSize){
        AddressAjax.list(pageNum,pageSize).then((res)=>{
            let resobj=eval("("+res._bodyInit+")")
            if(resobj.status===0){
                this.setState({
                    data:resobj.data
                })
            }
        })
    }
    AddressItem(){
       function isDefalut(val){
           if(val==1){
            return (
                <Text style={style.inlineText}>默认</Text>
               )
           }else{
               return null;
           }
       }
if(this.state!==undefined){
    return(
        this.state.data.list.map((item,index) => (
            <View style={style.wrap} key={index}>
            <View style={style.partLeft}>
                <View style={style.nameWrap}>
                <Text style={{color:'white',fontSize:20}}>{item.receiverProvince}</Text>
                </View>
            </View>
            <View style={{width:width*0.75}}>
                <View style={style.line1}>
                    <Text style={{fontSize:18,color:'black'}}>{item.receiverName}</Text>
                    <Text style={{color:"gray",marginLeft:20}}>{item.receiverPhone}</Text>
                </View>
                <View style={style.line2}>
                <Text style={{lineHeight:18,width:width*0.65}}> {isDefalut(item.receiverCity)} {item.receiverAddress}</Text>
                </View>
            </View>
            <Text style={style.line3} onPress={()=>{
                 global.addressId=item.id;
                 navigate("AddAddress");
            }}>编辑</Text>
        </View>
        ))
    )
}else{
    return <Text>组件初始化中</Text>;
}
          
        
    }
    render(){
        routerLink=function(path){
            navigate(path);
        }
        return(
            <View>
                <Return  returnPath="Person"
                 title="我的收货地址" subtitle="添加新地址"
                 returnDo={()=>{
                     routerLink("AddAddress");
                 }}/>
                    <ScrollView>
                      {this.AddressItem()}
                   
                    </ScrollView>
            </View>
        )
    }
}
const style=StyleSheet.create({
    wrap:{backgroundColor:'white',flexDirection:'row',justifyContent:"center",alignItems:"center",width:width,borderBottomWidth:1,borderStyle:'solid',borderBottomColor:'#f5f5f5'},
    partLeft:{width:width*0.15,height:100,flexDirection:'row',alignItems:"center",justifyContent:'center'},
    nameWrap:{width:width*0.1,height:width*0.1,borderRadius:width*0.05,backgroundColor:'grey',alignItems:"center",justifyContent:'center'},
    line1:{flexDirection:'row',alignItems:'flex-end',justifyContent:"flex-start"},
    line2:{flexDirection:'row',alignItems:'center',justifyContent:"flex-start"},
    line3:{fontSize:15,width:width*0.1,paddingLeft:10,borderLeftColor:'gray',borderLeftWidth:2,borderStyle:'solid',color:'#999999'},
    inlineText:{color:'orange',backgroundColor:'#FFF0F5'}
})