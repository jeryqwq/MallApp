import React from 'react';
import {View,Text,FlatList,StyleSheet,Dimensions
,ImageBackground,WebView,ScrollView,Button,TouchableOpacity } from "react-native"
import ProductAjax from './../../ajax/productAjax'
import NumCount from './../NumCount'
import config from './../../config/uriconfig'
const {width,height} = Dimensions.get('window')

export default class ProductDesc extends React.Component{
constructor(props){
    super(props)
    this.state={
        data:{},
        arrImg:[],
        i:0,
        interval:null,
        height:500,
        num:1,
        curIndexTitle:1,
        opactiy:0
    }
}
componentDidMount(){
    this.getProductDesc();
}
componentWillUnmount(){
    clearInterval(this.state.interval);
}
getProductDesc(){
    that=this;
    ProductAjax.getDetail(global.productId).then((result) => {
        let resobj=eval("("+result._bodyInit+")");
        if(resobj.status===0){
             let subImgs=new Array(resobj.data.mainImage).concat(resobj.data.subImages.split(','))
              this.setState({
                  data:resobj.data,
                  arrImg:subImgs
              },()=>{
                  this.setState({i:0})
                this.setState({interval: setInterval(()=>{
                    that._flatList.scrollToIndex({viewPosition: 0, index: this.state.i});
                    this.setState({i:this.state.i+1})
                    if(this.state.i===this.state.arrImg.length){
                        this.setState({i:0})
                    }
                    },3000)})
              })
        }
    }).catch((err) => {
        
    });
}
    _getRef = (flatList) => {
        this._flatList = flatList; const reObj = this._flatList; return reObj; }
    onMessage (event) {
            try {
              const action = JSON.parse(event.nativeEvent.data)
              if (action.type === 'setHeight' && action.height > 0) {
                this.setState({ height: action.height })
              }
            } catch (error) {
              // pass
        }
    }
    changNumHandle(num){
        this.setState({
            num:num
        })
    }
    isShowTitle(){
        const that=this;
        if(that.state.opactiy>0){
            return (
                <View style={{ backgroundColor:"rgba(255,69,0,"+that.state.opactiy+")"}}>
                <View style={style.titleView}>
                    <Text onPress={()=>{that.refs.scroll.scrollTo({x: 0, y: 0, animated: true});this.setState({curIndexTitle:1})}} style={that.state.curIndexTitle===1?style.actTitle:style.title}>宝贝</Text>
                    <Text onPress={()=>{that.refs.scroll.scrollTo({x: 0, y: 520, animated: true});this.setState({curIndexTitle:2})}} style={that.state.curIndexTitle===2?style.actTitle:style.title}>评论</Text>
                    <Text onPress={()=>{that.refs.scroll.scrollTo({x: 0, y: 600, animated: true});this.setState({curIndexTitle:3})}} style={that.state.curIndexTitle===3?style.actTitle:style.title}>详情</Text>
                </View>
            </View>
            )
        }else{

            return(
                null
            )
        }
    }
render(){
    const that=this;
 
    Swiper=function({item}){
        return(
            <View >
                <ImageBackground
             style={style.img}
             source={{uri:item.replace("ftp://127.0.0.1/",config.imgAddressFront)}}
                >
              <Text style={style.text}>{that.state.i+1}/{that.state.arrImg.length}</Text>
                </ImageBackground>
            </View>
        )  
    }
    productInfos=function(data){
        return(
        <View style={{width:'94%',marginLeft:'3%',marginTop:10}}>
        <View style={{flexDirection:'row',alignItems:'flex-end'}}><Text style={{fontSize:18,color:'red'}}>￥</Text>
        <Text style={{color:'red',fontSize:22}}>{data.price}</Text></View>                
        <Text style={{color:'black',fontSize:18}}>{data.name}</Text>
                <Text style={{color:'black',fontSize:13,marginTop:5}}>{data.subtitle}</Text>
                <View style={{flexDirection:"row",justifyContent:"space-between",marginTop:15,paddingBottom:10}}>
                    <Text style={{fontSize:12}}>快递:包邮</Text>
                    <Text style={{fontSize:12}}>存货:{data.stock}</Text>
                    <Text style={{color:'red',fontSize:12}}>状态:热售中</Text>
                </View>
            </View>
            )
    } 

    return(
        <View style={{height:'100%'}}>
       {this.isShowTitle()}
        <ScrollView ref="scroll" style={{backgroundColor:'white',flex: 1,height:'90%'}}
        onScroll = {(event)=>{
            if(event.nativeEvent.contentOffset.y<=1000&&event.nativeEvent.contentOffset.y>=0){
                this.setState({
                    opactiy:event.nativeEvent.contentOffset.y/1000
                }) //垂直滚动距离 
                if(event.nativeEvent.contentOffset.y<=500){
                    this.setState({
                        curIndexTitle:1
                    })
                }else if(event.nativeEvent.contentOffset.y<=800){
                    this.setState({
                        curIndexTitle:2
                    })
                }else if(event.nativeEvent.contentOffset.y<=1000){
                    this.setState({
                        curIndexTitle:3
                    })
                }
            }
        }}
        >
        <FlatList
                injectedJavaScript={BaseScript}
                ref={this._getRef}
                contentContainerStyle={style.flatList}
                extraData={this.state}
                data={this.state.arrImg}
                renderItem={Swiper}
                onEndReachedThreshold={0.3}
                horizontal={true}
                showsHorizontalScrollIndicator={true}
                onEndReached={()=>{setTimeout(()=>{
                },100)}}
        />
        {productInfos(this.state.data)}
        <NumCount  num={this.state.num} maxNum={this.state.data.stock} changNum={(num)=>{this.changNumHandle(num)}} />
        <View style={{height:this.state.height}}>
        <WebView
        originWhitelist={['*']}
        source={{ html: this.state.data.detail, baseUrl: '' }}
        injectedJavaScript={BaseScript}
        decelerationRate='normal'
        scalesPageToFit
        javaScriptEnabled // 仅限Android平台。iOS平台JavaScript是默认开启的。
        domStorageEnabled // 适用于安卓
        scrollEnabled={false}
        onMessage={this.onMessage.bind(this)}
        />
        </View>
        </ScrollView>
        <View style={{height:height*0.05,flexDirection:'row',alignItems:'center',justifyContent:'flex-end',backgroundColor:'#F0FFFF'}}>
        <TouchableOpacity  activeOpacity={0.5} >
        <View style={style.radisBtnView}>
        <Text style={style.fontBuy} >加入购物车</Text>
        </View>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.5} >
        <View style={style.radisbtnRight}>
        <Text style={style.fontBuy} >立即购买</Text>
        </View>
        </TouchableOpacity>
        </View>
        </View>
    )
}
}
let style=StyleSheet.create({
    title:{color:'black',paddingLeft:10,paddingRight:10},
    actTitle:{color:'yellow',borderStyle:'solid',borderBottomColor:'yellow',borderBottomWidth:1,marginLeft:10,marginRight:10},
    titleView:{flexDirection:"row",height:height*0.04,width:width,justifyContent:"center",alignItems:'center'},
    fontBuy:{color:'white',fontSize:16},
    radisBtnView:{backgroundColor:'#FF8C00',width:width*0.3,height:height*0.04,borderTopLeftRadius:20,borderBottomLeftRadius:20,alignItems:"center",justifyContent:"center"},
   radisbtnRight:{backgroundColor:'#FF4500',width:width*0.3,height:height*0.04,borderTopRightRadius:20,borderBottomRightRadius:20,alignItems:"center",justifyContent:"center"},
    wrap:{
        backgroundColor:"orange",
        height:50,
        justifyContent:'center',
        alignItems:"center",
        flexDirection:"row"
    },
    textinput:{backgroundColor:'white',width:'90%',height:40,borderRadius:10},
    flatList:{flexDirection:"row",alignItems:'center',justifyContent:"space-around"},
    order:{width:'100%',
    height:30,
    backgroundColor:'white',
    flexDirection:'row',
    justifyContent:"space-around",
    alignItems:'center'
    },
    active:{
        color:'red',
        borderBottomColor:'red',
        borderBottomWidth:2,
        borderStyle:'solid'
    },
    img:{ width:width, height:400,resizeMode:"stretch"},
text:{color:'white',fontSize:15,position:'absolute',bottom:30,right:30,
backgroundColor:'rgba(0,0,0,0.5)',paddingLeft:10,paddingRight:10,borderRadius:5
}
    })
    const BaseScript = `(function () {
        document.getElementsByTagName('body')[0].style.zoom=0.6;
        var height = null;
        function changeHeight() {
          if (document.body.scrollHeight != height) {
            height = document.body.scrollHeight;
            if (window.postMessage) {
              window.postMessage(JSON.stringify({
                type: 'setHeight',
                height: height,
              }))
            }
          }
        }
        setInterval(changeHeight, 100);
    } ())
    `