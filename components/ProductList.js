import React from "react"
import {View,FlatList,Text,TextInput,StyleSheet,Dimensions,TouchableOpacity,Image,Button} from 'react-native'
import listAjax from './../ajax/productAjax';
import RenderItem from './contains/RendItem'
import isLoad from './contains/IsLoading'
import emptyComponent from './contains/EmptyComonent'
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
        orederIndex:1
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
                // this.refs.flatlist.scrollToIndex({viewPosition: 0, index: 0});
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
        orederIndex:index,
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
        orederIndex:1
    },()=>{
        this.handleSearch();
    })
}
render(){
    const that= this;
function IsLoading(){
    return(
        isLoad(that.state.loaded)
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
        <Text style={this.state.orederIndex===1?style.active:{color:'black'}} onPress={()=>{this.handleOrder(1)}}>默认</Text>
        <Text style={this.state.orederIndex===2?style.active:{color:'black'}} onPress={()=>{this.handleOrder(2)}}>价格</Text>
        <Text style={this.state.orederIndex===3?style.active:{color:'black'}} onPress={()=>{this.handleOrder(3)}}>存货</Text>
        </View>
            <FlatList
            ref='flatlist'
            refreshing={this.state.loaded}
            onRefresh={()=>{this.refresh()}}
            ListEmptyComponent={emptyComponent("很抱歉，您的数据走丢拉")}
            contentContainerStyle={style.flatList}
            data={this.state.data}
            // keyExtractor={(item, index) => index}
            renderItem={RenderItem}
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
flatList:{backgroundColor:'#EEECF4',width:'100%',flexDirection:"row",flexWrap:'wrap',alignItems:'center',justifyContent:"space-around",paddingBottom:180 },
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

})