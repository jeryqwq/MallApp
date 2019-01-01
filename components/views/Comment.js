import React from 'react';
import {View,Text,ScrollView,Dimensions,Image,TouchableOpacity,TextInput,ToastAndroid} from 'react-native';
import Return from './../Return';
import CommentItem from './../CommentItem'
export default class Comment extends React.Component{
    constructor(){
        super();
        this.state={
         
        }
    }
 
    render(){
        return(
            <View>
            <Return returnPath="OrderList"  title="评论商品" subtitle="" returnDo={()=>{
            }}/>
            <ScrollView  style={{backgroundColor:'white',marginLeft:10,marginRight:10,marginTop:10,borderRadius:20}}>
            <View style={{marginLeft:20,flexDirection:'row',alignItems:'center',justifyContent:'space-between',height:30}}>
                       <Text>订单号:{global.orderInfo.orderNo?global.orderInfo.orderNo:"0000"}</Text>

                   </View>
                  <View >
                  {
                      global.orderInfo.orderItemVoList.map((item,index)=>(
                      <CommentItem key={index} commentItem={item}/>
                         ))
                     }
           
          </View>
          </ScrollView>
   
          </View>
        )
    }
}