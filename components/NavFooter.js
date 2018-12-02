import React from 'react'
import {Text, View,StyleSheet,Image,TouchableOpacity} from "react-native";


export default class NavFooter extends React.Component {
    constructor(props){
        super(props)
        this.state={
          curIndex:this.props.curIndex,
        }
      }
      handleChangeBgImg=(router)=>{
        const { navigate } = this.props.navigation;
        navigate(router, { name:router })
      }
    render() {
        const that =this;
        function IsRedText1(){
            if(that.state.curIndex==1){
                return  <TouchableOpacity style={style.item} onPress={()=>{that.handleChangeBgImg("Home")}}>
                <Image style={style.img} source={require('./../imgs/主页(1).png')} />
                    <Text style={{color:"red"}}>主页</Text>
            </TouchableOpacity>
            }else{
                return <TouchableOpacity style={style.item} onPress={()=>{that.handleChangeBgImg("Home")}}>
                <Image style={style.img} source={require('./../imgs/主页.png')} />
                <Text >主页</Text>
            </TouchableOpacity>
            }
        }
        function IsRedText2(){
            if(that.state.curIndex==2){
                return  <TouchableOpacity style={style.item} onPress={()=>{that.handleChangeBgImg("Category")}}>
                <Image style={style.img} source={require('./../imgs/分类(1).png')} />
                    <Text style={{color:"red"}}>分类</Text>
            </TouchableOpacity>
            }else{
                return <TouchableOpacity style={style.item} onPress={()=>{that.handleChangeBgImg("Category")}}>
                <Image style={style.img} source={require('./../imgs/分类.png')} />
                <Text >分类</Text>
            </TouchableOpacity>
            }
        }
        function IsRedText3(){
            if(that.state.curIndex==3){
                return  <TouchableOpacity style={style.item} onPress={()=>{that.handleChangeBgImg("ShoppingCart")}}>
                <Image style={style.img} source={require('./../imgs/购物车(1).png')} />
                    <Text style={{color:"red"}}>购物车</Text>
            </TouchableOpacity>
            }else{
                return <TouchableOpacity style={style.item} onPress={()=>{that.handleChangeBgImg("ShoppingCart")}}>
                <Image style={style.img} source={require('./../imgs/购物车.png')} />
                <Text >购物车</Text>
            </TouchableOpacity>
            }
        }
        function IsRedText4(){
            if(that.state.curIndex==4){
                return  <TouchableOpacity style={style.item} onPress={()=>{that.handleChangeBgImg("Person")}}>
                <Image style={style.img} source={require('./../imgs/个人中心(1).png')} />
                    <Text style={{color:"red"}}>个人中心</Text>
            </TouchableOpacity>
            }else{
                return <TouchableOpacity style={style.item} onPress={()=>{that.handleChangeBgImg("Person")}}>
                <Image style={style.img} source={require('./../imgs/个人中心.png')} />
                <Text >个人中心</Text>
            </TouchableOpacity>
            }
        }
        return ( <View style = {style.wrap} >
                   <IsRedText1/>
                   <IsRedText2/>
                   <IsRedText3/>
                   <IsRedText4/>
                 </View>
        )
    }
}
const style=StyleSheet.create({
    img:{
        width:30,
        height:30
    },
    wrap:{
        position:"absolute",
        bottom:0,
        flexDirection:"row",
        borderTopColor:'#C9C9C9',
        borderStyle:'solid',
        borderTopWidth:1,
        backgroundColor:'white'
    },
    item:{
        flex:1,
        height:60,
       alignItems:"center",
       justifyContent:"center"
    }
})