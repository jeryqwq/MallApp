import React from "react";
import {View,Text,TextInput,Dimensions,Alert,StyleSheet,Switch} from "react-native"
import Return from './../Return'
import AddressAjax from './../../ajax/addressAjax'
import ToastExampl from './../../native_methods/Toast'
import MyInput from './../contains/MyInput'

export default class AddADdress extends React.Component{
    constructor(props){
        super(props);
        this.state={
            receiverName:'',
            receiverPhone:'',
            receiverProvince:"",//地址标签
            receiverAddress:'',//地址详情
            receiverCity:0,//是否默认
            receiverZip:'',//邮编
            id:0,
        }
    }
    componentDidMount(){
        if(global.addressId!=undefined){
            AddressAjax.select(global.addressId).then((result) => {
                let resobj=eval("("+result._bodyInit+")");
                if(resobj.status===0){
                   this.setState({
                    id:resobj.data.id,
                    receiverName:resobj.data.receiverName,
                    receiverPhone:resobj.data.receiverPhone,
                    receiverProvince:resobj.data.receiverProvince,//地址标签
                    receiverAddress:resobj.data.receiverAddress,//地址详情
                    receiverCity:resobj.data.receiverCity,//是否默认
                    receiverZip:resobj.data.receiverZip,//邮编
                   })
                }
            });
        }
    }
    componentWillUnmount(){
        global.addressId=undefined;
    }
    delAddress(){
        AddressAjax.delAddress(global.addressId).then((result) => {
            let resobj=eval("("+result._bodyInit+")");
                    if(resobj.status===0){
                        ToastExampl.show("删除成功!!!",500);
                        global.addressId=undefined;
                        this.setState({
                            receiverName:'',
                            receiverPhone:'',
                            receiverProvince:"",//地址标签
                            receiverAddress:'',//地址详情
                            receiverCity:0,//是否默认
                            receiverZip:'',//邮编
                })
            }
        })
    }
    addaddress(){
        let self=this;
       for(let i in this.state){
        if(this.state[i]===""){
            ToastExampl.show("请完整填写表单",500);
            return;
            }
       }
       if(global.addressId==undefined){
        AddressAjax.addAddress(this.state.receiverName,this.state.receiverPhone,this.state.receiverZip
            ,this.state.receiverProvince,this.state.receiverAddress,this.state.receiverCity).then((res)=>{
                    let resobj=eval("("+res._bodyInit+")");
                    if(resobj.status===0){
                        ToastExampl.show("新增地址成功",500);
                        self.setState({
                            receiverName:'',
                            receiverPhone:'',
                            receiverProvince:"",//地址标签
                            receiverAddress:'',//地址详情
                            receiverCity:0,//是否默认
                            receiverZip:'',//邮编
                        })
                    }else{
                        ToastExampl.show("发生了一个异常，请稍后重试",500);
                    }
                })
       }else{
        AddressAjax.update(this.state.id,this.state.receiverName,this.state.receiverPhone,this.state.receiverZip
            ,this.state.receiverProvince,this.state.receiverAddress,this.state.receiverCity).then((res) => {
                let resobj=eval("("+res._bodyInit+")");
                if(resobj.status==1){
                    ToastExampl.show("修改地址成功",500);
                }else{
                    ToastExampl.show("发生了一个异常，请稍后重试",500);
                }
            }).catch((err) => {
                
            });

       }

    }
    MyInputWrap(that,key,holder,lins){
        return MyInput(that,key,holder,lins)

    }
    render(){
        return(
            <View >
                <Return  returnPath="address" title="添加收货地址" 
                subtitle="保存" returnDo={()=>{
                    this.addaddress();
                }}/>                
                {this.MyInputWrap(this,'receiverName',"收货人",1)}
                {this.MyInputWrap(this,'receiverPhone',"手机号码",1)}
                {this.MyInputWrap(this,'receiverZip',"邮政编码",1)}
                {this.MyInputWrap(this,'receiverAddress',"详细地址",3)}
                <View style={{marginTop:20}}>
                {this.MyInputWrap(this,'receiverProvince',"地址标签，方便记住",1)}
                <View style={{flexDirection:"row",height:50,backgroundColor:"white",alignItems:"center",justifyContent:'space-between'}}>
                <Text style={{marginLeft:20}}>是否设为默认</Text>
                <Switch value={this.state.receiverCity==0?false:true} onValueChange={(val)=>{this.setState({receiverCity:val==true?1:0})}}/>
                </View>
                <View style={{marginTop:20,height:50,backgroundColor:'white',alignItems:"center",justifyContent:"center"}}><Text style={{color:'red',fontSize:20}} onPress={()=>{
                    Alert.alert(
                        '提示信息',
                        '您确定要删除该地址信息吗？',
                        [
                          {text: '取消'},
                          {text: '确定', onPress: () => this.delAddress()},
                        ],
                        { cancelable: true }
                      )
                }}>删除此地址信息</Text></View>
                </View>
            </View>
        )
    }
}
let style=StyleSheet.create({
    wrap:{flexDirection:'row', justifyContent:"space-between",alignItems:"center",backgroundColor:'white',borderBottomWidth:1,borderStyle:'solid',borderBottomColor:'#f5f5f5'},
})