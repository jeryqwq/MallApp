import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  Text,
  ScrollView
} from "react-native";
const {width,height} = Dimensions.get('window');

export default class App extends Component {
    constructor(props){
        super(props);
        this.state={
            opacity:1,
            category:[1,2,34,5,6,7,76,889,9],
            catIndex:-1
        }
    }
    AllCategory(){
     return this.state.category?(
       this.state.category.map((item,index)=>(
        <View style={index==this.state.catIndex?styles.ActiveCategory:styles.categoryItem}>
        <Text onPress={()=>{
          this.setState({catIndex:index})
        }}>分类{item}</Text>
      </View>
       ))
     ):(
       <Text>No Data</Text>
     )
    }
  render() {
    return (
        <View style={{flexDirection:'row'}}>

      <ScrollView style={styles.container}
      onScroll = {(event)=>{{
        if(event.nativeEvent.contentOffset.y<=100){

        }
      }}}
      >
        <View style={-1==this.state.catIndex?styles.ActiveCategory:styles.categoryItem}>
        <Text onPress={()=>{this.setState({catIndex:-1})}}>全部分类</Text>
      </View>
     {this.AllCategory()}
        </ScrollView>
        <ScrollView style={styles.containerRight}>
          
        </ScrollView>
        </View>

    );
  }
}

let styles = StyleSheet.create({
  container: {
    width:width*0.15,
    height:height*0.2,
    backgroundColor:'#EDEDED',

  },
  containerRight:{
    width:width*0.85,
    height:height*0.92,
    backgroundColor:'white',
  },
  categoryItem:{height:height*0.04,
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