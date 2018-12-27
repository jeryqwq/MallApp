import React from "react"
import {View,FlatList,Text,TextInput,StyleSheet,Dimensions,TouchableOpacity,Image,Button,ToastAndroid} from 'react-native'
import listAjax from './../ajax/productAjax';
import CateRenderItem from './contains/CategoryRenderItem'
import isLoad from './contains/IsLoading'
import config from './../config/uriconfig'
import emptyComponent from './contains/EmptyComonent'
import CartAjax from './../ajax/cartAjax'
import Navigation from './../store/navigation'
const {width} = Dimensions.get('window')
const cols = 2;
const vMargin = 10;
const cellWH = (width-2*vMargin-15)/cols;
export default class ProductList extends  React.Component{
constructor(props){
    super(props);
    this.state={
        data:[],
        loaded:false,
        pageNum:1,
        pageSize:8,
        keyword:'',
        orderBy:'',
        flag:true,
        orderIndex:1,
        cssType:true
    }
}
componentDidMount(){
this.handleSearch();
}
handleSearch(type){
    //type ：1 查询
    //type:2 排序
    this.setState({
        loaded:true
    })
    listAjax.productList(this.state.keyword,"",this.state.pageNum,this.state.pageSize,this.state.orderBy).then((res) => {
        let resobj=eval("("+res._bodyInit+")");
        setTimeout(()=>{
            this.setState({
                loaded:false
            })
           },800)
        if(resobj.status===0){
          if(type===1){
           if(this.state.pageNum===1){
            this.setState({
                data:resobj.data.list
            })
           }else{
            this.setState({
                data:this.state.data.concat(resobj.data.list)
            })
           }
          }
          else if(type===2){
            if(this.state.pageNum===1){
                this.setState({
                    data:resobj.data.list
                })
               }else{
                this.setState({
                    data:this.state.data.concat(resobj.data.list)
                })
          }
        }
          else{
            this.setState({
                data:this.state.data.concat(resobj.data.list)
            })
          }
        }
    }).catch((err) => {
        
    });

}
nextPage(){
    //阻止加载，滑动底部调用事件频率太高
        if(this.state.flag){
            this.setState({
                flag:false
            })
            this.setState({
                pageNum:this.state.pageNum+1
            },()=>{
                this.handleSearch();
            })
         }else{
             setTimeout(()=>{
                this.setState({
                    flag:true
                })
             },150)
         }
    }
searchKeyword(text){
    this.setState({keyword:text,
        pageNum:1});
}
handleOrder(index){
    this.refs.flatlist.scrollToIndex({viewPosition: 0, index: 0,animated: true});
    this.setState({
        orderIndex:index,
        pageNum:1
    })
    if(index===1){
        this.setState({
            orderBy:'',
        },()=>{
            this.handleSearch(2);
        })
    };
    if(index===2){
        this.state.orderBy==="price_desc"?this.setState({
            orderBy:'price_asc'
        },()=>{
            this.handleSearch(2);
        }):this.setState({
            orderBy:'price_desc'
        },()=>{
            this.handleSearch(2);
        }) 
    }
    if(index===3){
        this.state.orderBy==="stock_desc"?this.setState({
            orderBy:'stock_asc'
        },()=>{
            this.handleSearch(2);
        }):this.setState({
            orderBy:'stock_desc'
        },()=>{
            this.handleSearch(2);
        })  
    }
    
}
refresh(){
    this.setState({
        data:[],
        pageNum:1,
        pageSize:8,
        keyword:'',
        orderBy:'',
        orderIndex:1
    },()=>{
        this.handleSearch();
    })
}
_keyExtractor = (item, index) => item.id;
render(){
    const that= this;
function IsLoading(){
    return(
        isLoad(that.state.loaded)
    )
}
  RenderItem=({item})=>{
    let img= item.mainImage.replace("ftp://127.0.0.1/",config.imgAddressFront)
    addCart=(id)=>{
        CartAjax.addCart(id,1).then((res) => {
            const resobj=eval('('+res._bodyInit+")");
            if(resobj.status===0){
                ToastAndroid.show("加入购物车成功",500);
            }
        })
    }
    return (
        <View style={style.wrap1}  >
        <TouchableOpacity
        activeOpacity={0.5}
        onPress={() => {
            global.productId=item.id;
            const { navigate } =Navigation.getNavigation();
            navigate('ProductDesc')
        }}>
        <Image
         style={{ width:cellWH, height:200,resizeMode:"stretch",borderTopLeftRadius:20,borderTopRightRadius:20}}
         source={{uri:img}}
        />
        <Text style={{overflow:'hidden',height:20,fontSize:13,lineHeight:20,color:'black'}}>{item.name}</Text>
        <Text style={{overflow:'hidden',height:20,fontSize:10,lineHeight:10}}>{item.subtitle}</Text>
        <View style={style.btom}>
        <View style={{flexDirection:'row',alignItems:'flex-end'}}><Text style={{fontSize:18}}>￥</Text>
        <Text style={{color:'red',fontSize:20}}>{item.price}</Text></View>
        <View style={{width:'40%'}}><Button title="加入购物车" color='orange' onPress={()=>{addCart(item.id)}} /></View>
        </View>
        </TouchableOpacity>
        </View>
    )
}
    return(
        <View >
            <View style={style.wrap}>
            <TextInput
                style={style.textinput}
                placeholderTextColor="gray" 
                placeholder="请输入关键词"
                onChangeText={(text)=>{this.searchKeyword(text)}}
            />
            <Text style={{fontSize:17,marginLeft:5}} onPress={()=>{this.handleSearch(1);}}>搜索</Text>
        </View>
        <View style={style.order}>
        <Text style={this.state.orderIndex===1?style.active:{color:'black'}} onPress={()=>{this.handleOrder(1)}}>默认</Text>
        <Text style={this.state.orderIndex===2?style.active:{color:'black'}} onPress={()=>{this.handleOrder(2)}}>价格</Text>
        <Text style={this.state.orderIndex===3?style.active:{color:'black'}} onPress={()=>{this.handleOrder(3)}}>存货</Text>
        <TouchableOpacity  
        activeOpacity={0.5}
        onPress={()=>{
             this.setState({
                cssType:!this.state.cssType
             })
         }}>
        <Image
         style={{ width:width*0.05, height:width*0.05,resizeMode:"stretch"}}
         source={require("./../imgs/切换.png")}
       
        />
        </TouchableOpacity>
        </View>
            <FlatList
            ref='flatlist'
            refreshing={this.state.loaded}
            onRefresh={()=>{this.refresh()}}
            ListEmptyComponent={emptyComponent("很抱歉，您的数据走丢拉")}
            contentContainerStyle={style.flatList}
            data={this.state.data}
            keyExtractor={this._keyExtractor}
            renderItem={this.state.cssType?RenderItem:CateRenderItem}
            onEndReachedThreshold={0.3}
            onEndReached={()=>{setTimeout(()=>{
                this.nextPage()
            })}}
            />  
            <IsLoading/>
        </View>
    )}
}
let style=StyleSheet.create({
wrap:{
    backgroundColor:"orange",
    height:50,
    justifyContent:'center',
    alignItems:"center",
    flexDirection:"row"
},
textinput:{backgroundColor:'white',width:'90%',height:40,borderRadius:10},
flatList:{backgroundColor:'#EEECF4',width:'100%',flexDirection:"row",flexWrap:'wrap',alignItems:'center',justifyContent:"space-around",paddingBottom:150 },
order:{width:'100%',
height:35,
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
wrap1:{
    width:cellWH,
    height:280,
    marginTop:10,
    backgroundColor:'white',
    borderRadius:10
},
btom:{width:'100%',flexDirection:"row",justifyContent:'space-between'}
})