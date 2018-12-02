import React from "react";
import {View,Text,Dimensions,StyleSheet,ScrollView} from "react-native"
import Return from './../Return'

const {width,height} = Dimensions.get('window')

export default class Address extends React.Component{
    constructor(props){
        super(props);
    }
    
    render(){
        routerLink=function(path){
            const {navigate} =Navigation.getNavigation();
            navigate(path);
        }
        AddressItem=function(){
            return(
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
                        <Text style={{lineHeight:18,width:width*0.65}}><Text style={style.inlineText}>默认</Text>福建省福州市撒旦阿萨德阿萨德爱色打撒打撒打撒阿萨德阿萨德 求安慰多群无vqc七点起床清除去错误</Text>
                        </View>
                    </View>
                    <Text style={style.line3}>编辑</Text>
                </View>
            )
        }
        return(
            <View>
                <Return  returnPath="Person"
                 title="我的收货地址" subtitle="添加新地址"
                 returnDo={()=>{
                     routerLink("AddAddress");
                 }}/>
                    <ScrollView>
                        <AddressItem/>
                        <AddressItem/>
                        <AddressItem/>
                        <AddressItem/>
                        <AddressItem/>
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