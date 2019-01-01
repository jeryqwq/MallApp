import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  Text,
  ScrollView,
  FlatList,
  TextInput,
  Image,
  TouchableOpacity
} from "react-native";
import listAjax from './../ajax/productAjax';
import emptyComponent from './contains/EmptyComonent'
import categoryAjax from './../ajax/categoryAjax'
import CategoryRenderItem from './contains/CategoryRenderItem'
import isLoad from './contains/IsLoading'
const {width,height} = Dimensions.get('window');

export default class CategoryList extends Component {
    constructor(props){
        super(props);
        this.state={
            opacity:1,
            catIndex:-1,
            curCateId:0,
            loaded:false,
            pageNum:1,
            pageSize:8,
            keyword:'',
            orderBy:'',
            flag:true,
            orderIndex:1,
            category:[],
            data:[],
            subCategory:[]
        }
    }
componentDidMount(){
    categoryAjax.getChildrenCategory(0).then((res) => {
        let resobj=eval("("+res._bodyInit+")");
        if(resobj.status==0){
          this.setState({
            category:resobj.data
          },()=>{
              this.state.category
          })
        }
      }).catch((err) => {
        
      });
      this.handleSearch(1);
  }
  refresh(){
    this.setState({
        data:[],
        pageNum:1,
        pageSize:8,
        keyword:'',
        orderBy:'',
        orderIndex:1,
        curCateId:0,
        catIndex:-1
    },()=>{
        this.handleSearch();
    })
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
handleSearch(type){
      //type ：1 查询
      //type:2 排序
      this.setState({
          loaded:true
      })
      listAjax.productList(this.state.keyword,this.state.curCateId,this.state.pageNum,this.state.pageSize,this.state.orderBy).then((res) => {
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
  _keyExtractor = (item, index) => item.id;
    catchData(id){
      categoryAjax.getChildrenCategory(id).then((res) => {
        let resobj=eval("("+res._bodyInit+")");
        if(resobj.status==0){
          this.setState({
            subCategory:resobj.data
          })
        }
      }).catch((err) => {
        
      });
    }
    subCategory(){
        return this.state.subCategory?(
            this.state.subCategory.map((item,index)=>(
                <TouchableOpacity 
                key={index} style={styles.categoryItem}
                onPress={()=>{
                    this.catchData(item.id)
                    this.setState({curCateId:item.id,pageNum:1,data:[]},()=>{
                      this.handleSearch(2);
                    });
                  }}>
                <View >
                <Text >{item.name}</Text>
              </View> 
              </TouchableOpacity>
            ))
        ):(
            <Text>无子项</Text>
        )
    }
    AllCategory(){
     return this.state.category?(
       this.state.category.map((item,index)=>(
        <TouchableOpacity 
        key={index}
        onPress={()=>{
            this.catchData(item.id)
            this.setState({catIndex:index,curCateId:item.id,pageNum:1,data:[]},()=>{
              this.handleSearch(2);
            });
          }}>
        <View key={index} style={index==this.state.catIndex?styles.ActiveCategory:styles.categoryItem}>
        <Text >{item.name}</Text>
      </View>
      </TouchableOpacity>
       ))
     ):(
       <Text>No Data</Text>
     )
    }
  render() {
    const that= this;
    function IsLoading(){
        return(
            isLoad(that.state.loaded)
        )
    }
    return (
        <View style={{flexDirection:"row",justifyContent:'space-around'}}>
      <ScrollView style={styles.container}
      onScroll = {(event)=>{{
        if(event.nativeEvent.contentOffset.y<=100){

        }
      }}}
      >
        <View style={-1==this.state.catIndex?styles.ActiveCategory:styles.categoryItem}>
        <Text onPress={()=>{
          this.setState({catIndex:-1,curCateId:0,pageNum:1,data:[]},()=>{this.handleSearch(2)});this.catchData(0);
          }}>全部分类</Text>
      </View>
     {this.AllCategory()}
     <View  style={{height:height*0.04,flexDirection:'row',alignItems:"center",backgroundColor:'white'}}>
        <Text >当前子分类:</Text>
      </View>
     {this.subCategory()}
        </ScrollView>
        <View style={{width:width*0.8,paddingBottom:90}}> 
          <View style={{flexDirection:'row',position:'relative'}}>
              <Image
              style={{width:20,height:20,marginTop:10,marginLeft:5}}
              source={require('./../imgs/搜索.png')}
              />
          <TextInput style={{height:40,position:'absolute',left:10}}
          value={this.state.keyword}
          onChangeText={(value)=>{
            this.setState({
                data:[],
                keyword:value,
                pageNum:1
            },()=>{
                this.handleSearch(1);
            })
          }}
        
        placeholder="指定分类关键字查询"
        placeholderTextColor='gray'
        selectTextOnFocus ={true}
        />
          </View>
        <FlatList
            ref='cateFlatlist'
            refreshing={this.state.loaded}
            onRefresh={()=>{this.refresh()}}
            ListEmptyComponent={emptyComponent("该分类下没有任何商品")}
            contentContainerStyle={style.flatlist}
            data={this.state.data}
            keyExtractor={this._keyExtractor}
            renderItem={CategoryRenderItem}
            onEndReachedThreshold={0.3}
            onEndReached={()=>{setTimeout(()=>{
                this.nextPage();
            })}}
            />  
        </View>
            <IsLoading/>
 
        </View>

    );
  }
}

let styles = StyleSheet.create({
  container: {
    width:width*0.2,
    height:height,
    backgroundColor:'#F7F7F7',
  },
  flatlist:{
    width:width*0.8,backgroundColor:'#EEECF4',flexDirection:"row",flexWrap:'wrap',alignItems:'center',justifyContent:"space-around"
  },

  categoryItem:{
    height:height*0.04,
    flexDirection:'row',
    justifyContent:"center",
    alignItems:'center'
  },
  ActiveCategory:{
    height:height*0.04,
    backgroundColor:'rgba(0,0,0,0.3)',
    flexDirection:'row',
    justifyContent:"center",
    alignItems:'center',
    borderLeftWidth:5,
    borderStyle:'solid',
    borderLeftColor:'red',
  }
});