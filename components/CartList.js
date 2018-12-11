import React from 'react';
import {Text,View,FlatList,StyleSheet,Dimensions,TouchableOpacity,Image} from 'react-native'
import emptyComponent from './contains/EmptyComonent'
import config from './../config/uriconfig'
import NumCount from './NumCount'
import Navigation from './../store/navigation'
// import CartRenderItem from './contains/CartRenderItem';
import cartAjax  from './../ajax/cartAjax';
const {width,height} = Dimensions.get('window')
export default class Cartlist extends React.Component{
    constructor(props){
        super(props)
        this.state={
            loaded:false,
            data:{},
            cartStatus:false,//0 购买状态，1修改状态
        }
    }
    componentDidMount(){
        this.catchData();
    }
    catchData(){           

        cartAjax.getCartList().then((res) => {
            let resobj=eval("("+res._bodyInit+")");
            if(resobj.status===0){
                this.setState({
                    data:resobj.data
                })
            }
        })
    }
     unSelectAll(){
         if(this.state.data.allChecked===true){
            cartAjax.unSelectAll().then((res)=>{
                let resobj=eval("("+res._bodyInit+")")
                if(resobj.status===0){
                    this.setState({
                        data:resobj.data
                    })
                }
        })
    }
    else{
        cartAjax.selectAll().then((res)=>{
            let resobj=eval("("+res._bodyInit+")")
            if(resobj.status===0){
                this.setState({
                    data:resobj.data
                })
            }
    })
    }
   
    }
    changeStatus(){
        this.setState({
            cartStatus:!this.state.cartStatus
        })
    }
    delCart(){
        let ids="";
        let data=this.state.data.cartProductVoList
        for(let i =0;i<data.length;i++){
        if(data[i].productChecked===1){
            ids=ids+data[i].id+','
        }
      }
        cartAjax.deleteProduct(ids).then((res) => {
            console.warn(res)
            const resobj=eval("("+res._bodyInit+")")
            if(resobj.status===0){
                this.setState({
                    data:resobj.data
                })
            }
        }).catch((err) => {
            console.warn(err)
        });
    }
     IsDelOrCount(){
        if(this.state.cartStatus===false){
            return(
                <TouchableOpacity activeOpacity={0.5} onPress={()=>{
                    const {navigate} =Navigation.getNavigation();
                    navigate("PayCount");
                 }} >
                <View style={{alignItems:"center",justifyContent:'center',width:width*0.25,height:40,backgroundColor:'#ff6100',borderRadius:20}}>
                <Text style={{color:'white',fontSize:17}}>结算</Text>
                </View>
                </TouchableOpacity>
            )
        }else {
            return(
                <TouchableOpacity activeOpacity={0.5} onPress={()=>{this.delCart()}} >
                <View  style={{alignItems:"center",justifyContent:'center',width:width*0.25,height:40,borderRadius:20,borderStyle:'solid',borderColor:'red',borderWidth:1}}>
                 <Text style={{color:'red',fontSize:17}}>删除</Text>
                </View>
                </TouchableOpacity>
            )
        }
    }
    render(){
        const that=this;
       
        function CartRenderItem({item}){
            function selectOrUnselect(id){
                if(item.productChecked==0){
                    cartAjax.select(id).then((res) => {
                        const data=eval('('+res._bodyInit+')');
                        if(data.status===0){
                            //todo 刷新数据
                            that.setState({
                                data:data.data
                            })
                        }
                    })
                }
                if(item.productChecked==1){
                    cartAjax.unSelect(id).then((res) => {
                        const data=eval('('+res._bodyInit+')');                       
                        if(data.status===0){
                            //todo 刷新数据
                            that.setState({
                                data:data.data
                            })
                        }
                    })
                }
            }
            function changNumAjax(num){
               cartAjax.update(item.id,num).then((res) => {
                   const data=eval('('+res._bodyInit+')');
                   if(data.status===0){
                       //todo 刷新数据
                       that.setState({
                           data:data.data
                       })
                   }
               })
            }
        
            let img= item.productMainImg.replace("ftp://127.0.0.1/",config.imgAddressFront)
        return(
            <View style={style.subwrap}>
            <View style={style.left}>
            <TouchableOpacity activeOpacity={0.5} onPress={()=>{selectOrUnselect(item.productId)}}>
            <View style={item.productChecked==0?style.norradis:style.actradis}></View>
            </TouchableOpacity>
            </View>
            <View  style={style.img}>
            <Image style={style.img}
            source={{uri:img}}
            />
            </View>
            <View style={style.title}><Text style={{color:'#424242',fontSize:13}}>{item.productName}</Text>
            <View style={{flexDirection:'row',alignItems:'flex-end'}}><Text style={{color:'red',fontSize:15}}>$</Text><Text style={{color:'red',fontSize:14,marginLeft:5}}>{item.productPrice}<Text style={{color:'black',fontSize:16,marginLeft:10,color:'gray'}}>*{item.quantity}</Text></Text>
            </View>
            <View style={{flexDirection:'row'}}>
            <View style={{flexDirection:'row',justifyContent:'center',alignItems:'flex-end'}}><Text style={{color:'black',fontSize:16,color:'gray'}}>共计:</Text><Text style={{color:'red',fontSize:15}}>{item.productPrice*item.quantity}</Text></View>
            <NumCount num={item.quantity} maxNum={item.productStock} changNum={(num)=>{changNumAjax(num)}} />
            </View>
            </View>
        </View>
        )
        }
        return(
          <View style={{height:'100%'}}>
                <View style={style.wrap}>
                <View style={{flexDirection:'row'}}><Text style={style.title1}>购物车</Text>
                <Text style={style.manage}
                 onPress={()=>{this.changeStatus()}}
                 >{this.state.cartStatus==false?"管理":"完成"}</Text></View>
                <Text style={style.desc}>共有{this.state.data.cartProductVoList===undefined?0:this.state.data.cartProductVoList.length}件宝贝</Text>
            </View>
            <View style={style.whitewrap}>
            <FlatList
            ref='flatlist'
                refreshing={this.state.loaded}
            // onRefresh={()=>{console.warn('refresh')}}
             ListEmptyComponent={emptyComponent("很抱歉，您的购物车空空如也")}
                contentContainerStyle={style.flatList}
                data={this.state.data.cartProductVoList}
                renderItem={CartRenderItem}
                onEndReachedThreshold={0.3}
                onEndReached={()=>{setTimeout(()=>{
                    
                })}}
            />  
            </View>
            <View style={style.bottom}>
            <TouchableOpacity activeOpacity={0.5} onPress={()=>{this.unSelectAll()}}>
                <View style={style.bottomleft}>
               
                <View style={this.state.data.allChecked==false?style.norradis:style.allactradis}></View><Text style={{marginLeft:10}}>全选</Text>
                
                </View>
                </TouchableOpacity>
                <View style={{width:width*0.5,flexDirection:'row',height:50,alignItems:"center",justifyContent:'flex-end'}}>
                    <Text style={{fontSize:16,color:'black'}}>合计:</Text>
                    <Text style={{color:'red',fontSize:14,marginRight:5}}>￥:{this.state.data.cartTotalPrice}</Text>
                    {this.IsDelOrCount()}
                </View>
            </View>
          </View>
        )
    }
}
let style=StyleSheet.create({
    subwrap:{width:width*0.9,height:150,borderBottomColor:'gray',
    borderBottomWidth:1,borderStyle:'solid',borderRadius:15,
    flexDirection:'row',alignItems:"center",justifyContent:"center"
},
actradis :{width:20,height:20,borderRadius:10,backgroundColor:'red',borderStyle:'solid',borderWidth:1,borderColor:'white'},
norradis:{width:20,height:20,borderRadius:10,backgroundColor:'white',borderStyle:'solid',borderWidth:1,borderColor:'gray'},
allactradis:{width:24,height:24,borderRadius:12,backgroundColor:'red',borderStyle:'solid',borderWidth:1,borderColor:'white'},
bottom:{flexDirection:'row',justifyContent:'space-between',width:width,height:50,backgroundColor:'white',position:'absolute',bottom:60,
borderColor:'#c9c9c9',borderStyle:'solid',borderTopWidth:1
},
wrap:{width:width,backgroundColor:'#ff6100'},
bottomleft:{width:width*0.3,flexDirection:"row",alignItems:"center",height:50,marginLeft:width*0.05},
whitewrap:{height:height*0.75,width:width*0.9,marginLeft:width*0.05,position:"relative",bottom:50,backgroundColor:'#EEECF4',borderRadius:15},
title1:{color:'white',fontSize:23,marginTop:30,marginLeft:20,fontWeight:'700'},
manage:{color:'white',fontSize:20,fontWeight:'400',position:'absolute',right:30,top:30},
desc:{marginTop:10,marginLeft:20,color:'white',paddingBottom:70},
flatList:{backgroundColor:'white',width:width*0.9,alignItems:'center',justifyContent:"space-around",borderRadius:15 },
img:{
    width:width*0.3,height:120
},
left:{
    width:width*0.1,alignItems:"center"
},
title:{
    width:width*0.4,marginLeft:width*0.03
},
    leftradis:{width:20,height:20,borderRadius:10,backgroundColor:'red',borderColor:'gray',borderWidth:1,borderStyle:'solid'}

})