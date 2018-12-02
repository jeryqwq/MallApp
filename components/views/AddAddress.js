import React from "react";
import {View,Text,TextInput,Dimensions,Image,StyleSheet,Switch} from "react-native"
import Return from './../Return'

const {width,height} = Dimensions.get('window')

export default class AddADdress extends React.Component{
    constructor(props){
        super(props);
        this.state={
            name:'',
            phonenum:'',
            isDefault:false
        }
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
                    console.warn(1)
                }}/>                
                {this.MyInput('name',"收货人",1)}
                {this.MyInput('phonenum',"手机号码",1)}
                {this.MyInput('phonenum',"邮政编码",1)}
                {this.MyInput('name',"所在地区",1)}
                {this.MyInput('detail',"详细地址",3)}
                <View style={{marginTop:20}}>
                {this.MyInput('',"地址标签，方便记住",1)}
                <View style={{flexDirection:"row",height:50,backgroundColor:"white",alignItems:"center",justifyContent:'space-between'}}>
                <Text style={{marginLeft:20}}>是否设为默认</Text>
                <Switch value={this.state.isDefault} onValueChange={(val)=>{this.setState({isDefault:val})}}/>
                </View>
                </View>
            </View>
        )
    }
}
let style=StyleSheet.create({
    wrap:{flexDirection:'row', justifyContent:"space-between",alignItems:"center",backgroundColor:'white',borderBottomWidth:1,borderStyle:'solid',borderBottomColor:'#f5f5f5'},
})