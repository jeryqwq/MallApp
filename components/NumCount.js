import React from 'react';
import {Dimensions,View,Text,TextInput,StyleSheet,TouchableOpacity} from 'react-native';
const {width,height} = Dimensions.get('window')



export default class NumCount extends React.Component{
constructor(props){
    super(props);
}
//数字改变调用函数处理事件，父组件接收并处理。
changeNumHandle(num){
if(num>=this.props.maxNum){
    this.props.changNum(1);
}else{
    this.props.changNum(new Number(num.replace(/[^0-9]/g, '')));
}
}
addnum(){
    if(this.props.num>=this.props.maxNum){
        this.props.changNum(1);
    }else{
        this.props.changNum(new Number(this.props.num+1))  
    }
}
cur(){
    if(this.props.num<=1){
        this.props.changNum(1)  
    }else{
        this.props.changNum(new Number(this.props.num-1))
    }
}
render(){
    return (
        <View style={style.wrap}>
            <View style={style.btn}>
            <TouchableOpacity activeOpacity={0.5} onPress={()=>{this.cur()}} >
            <View style={{width:30,height:30,backgroundColor:'#F5F5F5',borderStyle:'solid',borderColor:'#D3D3D3',borderWidth:1,alignItems:'center',justifyContent:'center'}}><Text style={{fontSize:25,color:'#8B8B83'}}>-</Text></View>
            </TouchableOpacity>
            </View>
            <View style={{width:width*0.1,borderColor:'#D3D3D3',borderBottomWidth:1,borderTopWidth:1}}>
            <TextInput style={{top:5,height:28,textAlign:'left'}}  keyboardType='numeric' maxLength={4}  value={this.props.num.toString()} onChangeText={(num)=>{this.changeNumHandle(num)}}/></View>
            <View style={style.btn}>
            <TouchableOpacity activeOpacity={0.5} onPress={()=>{this.addnum()}} >
            <View style={{width:30,height:30,backgroundColor:'#F5F5F5',borderStyle:'solid',borderColor:'#D3D3D3',borderWidth:1,alignItems:'center',justifyContent:'center'}}><Text style={{fontSize:22,color:'#8B8B83'}}>+</Text></View>
            </TouchableOpacity>
            </View>
        </View>
        )
    }
}
const style=StyleSheet.create({
    btn:{width:30,backgroundColor:'#EEE9E9'},
    wrap:{width:width*0.9,marginLeft:width*0.05,height:30,flexDirection:"row",alignItems:"center",justifyContent:"flex-start"}
})