import React from "react";
import {View,Text,TextInput,Dimensions,Image,StyleSheet,Switch} from "react-native"
import Return from './../Return'
import AddressAjax from './../../ajax/addressAjax'
import ToastExampl from './../../native_methods/Toast'
const {width,height} = Dimensions.get('window')

export default class AddADdress extends React.Component{
    constructor(props){
        super(props);
        this.state={
            receiverName:'',
            receiverPhone:'',
            receiverProvince:"",//地址标签
            receiverAddress:'',//地址详情
            receiverCity:false,//是否默认
            receiverZip:'000000',//邮编
        }
    }

    addaddress(){
        AddressAjax.addAddress(this.state.receiverName,this.state.receiverPhone,this.state.receiverZip
            ,this.state.receiverProvince,this.state.receiverAddress,this.state.receiverCity).then((res)=>{
                    let resobj=eval("("+res._bodyInit+")");
                    if(resobj.status===0){
                        ToastExampl.show("新增地址成功",500);
                        this.setState({
                            receiverName:'',
                            receiverPhone:'',
                            receiverProvince:"",//地址标签
                            receiverAddress:'',//地址详情
                            receiverCity:0,//是否默认
                            receiverZip:'000000',//邮编
                        })
                    }else{
                        ToastExampl.show("发生了一个异常，请稍后重试",500);
                    }
                })
    }
    MyInput(key,holder,lins){
        return(
        <View style={style.wrap}>
            <TextInput placeholder={holder} placeholderTextColor="gray" 
            style={{width:width*0.8}}
            multiline={true}
            numberOfLines={lins}
            onChangeText={(val)=>{
                this.setState({
                    [key]:val
                })
            }}
            />
            <View style={{width:width*0.2}}>
            </View>
        </View>
        )
    }
    render(){
        return(
            <View >
                <Return  returnPath="address" title="添加收货地址" 
                subtitle="保存" returnDo={()=>{
                    this.addaddress();
                }}/>                
                {this.MyInput('receiverName',"收货人",1)}
                {this.MyInput('receiverPhone',"手机号码",1)}
                {this.MyInput('receiverZip',"邮政编码",1)}
                {this.MyInput('receiverAddress',"详细地址",3)}
                <View style={{marginTop:20}}>
                {this.MyInput('receiverProvince',"地址标签，方便记住",1)}
                <View style={{flexDirection:"row",height:50,backgroundColor:"white",alignItems:"center",justifyContent:'space-between'}}>
                <Text style={{marginLeft:20}}>是否设为默认</Text>
                <Switch value={this.state.receiverCity==0?false:true} onValueChange={(val)=>{this.setState({receiverCity:val==true?1:0})}}/>
                </View>
                </View>
            </View>
        )
    }
}
let style=StyleSheet.create({
    wrap:{flexDirection:'row', justifyContent:"space-between",alignItems:"center",backgroundColor:'white',borderBottomWidth:1,borderStyle:'solid',borderBottomColor:'#f5f5f5'},
})