import React from 'react';
import {View,Text,ScrollView,Dimensions,Image,TouchableOpacity,TextInput} from 'react-native';
import Return from './../Return';
import config from './../../config/uriconfig';
import productAjax from './../../ajax/productAjax';
const {width,height} = Dimensions.get('window')

export default class Comment extends React.Component{
    constructor(){
        super();
        this.state={
            starts:[{item:1,isCur:true},
                {item:2,isCur:true},
                {item:3,isCur:true},
                {item:4,isCur:true},
                {item:5,isCur:true},
        ],
            startNum:4,
            content:''
        }
    }
  comment(productId){
    productAjax.comment(this.state.content,this.state.startNum,productId).then((res)=>{
        const resObj=eval("("+res._bodyInit+")");
        if(resObj==0){

        }
    })
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
                           <View key={index}>
                        <View style={{width:width*0.8,flexDirection:'row',alignItems:"flex-start",justifyContent:'flex-start',margin:10,borderStyle:'solid',borderBottomColor:'#f5f5f5',borderBottomWidth:1,paddingBottom:5,marginLeft:width*0.05}}>
                            <Image style={{width:width*0.2,height:width*0.2}} source={{uri:item.productImage.replace("ftp://127.0.0.1/",config.imgAddressFront)}}/>
                            <View style={{width:width*0.7,marginLeft:width*0.03}}>
                                <Text >{item.productName}</Text>
                                <View style={{flexDirection:'row'}}>
                                <Text style={{color:'red'}}>{item.currentUnitPrice?item.currentUnitPrice:0}</Text>
                                <Text style={{marginLeft:20}}>*{item.quantity?item.quantity:0}</Text>
                                </View>
                            </View>
                            </View>
                            <View style={{flexDirection:'row',marginLeft:20,justifyContent:'flex-start'}}>
                            <Text>描述相符:</Text><View style={{flexDirection:"row",marginLeft:20}}>
                   {
                      this.state.starts? this.state.starts.map((item,index)=>(
                        <TouchableOpacity key={index} onPress={()=>{
                            let starts=this.state.starts;
                            starts.forEach((ele,idx) => {
                                if(idx>index){
                                    starts[idx].isCur=false;
                                }else{
                                    starts[idx].isCur=true;
                                }
                            });
                         
                            this.setState({
                                startNum:index,
                                starts:starts
                            })
                        }}>
                        
                           {
                                item.isCur?<Image  style={{width:20,height:20,marginLeft:10}} source={require("./../../imgs/星.png")}/>:<Image   style={{width:20,height:20,marginLeft:10}} source={require("./../../imgs/星星.png")}/>
                           }
                        </TouchableOpacity>
                       )):undefined
                   }
                        <Text style={{marginLeft:20}}>{this.state.startNum==4?"非常好":this.state.startNum==3?"好":this.state.startNum==3?"一般":this.state.startNum==2?"中等":this.state.startNum==1?"差":this.state.startNum==0?"非常差":undefined}</Text>
                    </View>
                </View>
                <View style={{borderBottomColor:'#f5f5f5',borderStyle:'solid',borderBottomWidth:1,alignItems:'flex-end'}}>
                        <TextInput style={{width:width,paddingLeft:40}}
                        numberOfLines={2}
                        multiline={true}
                        placeholder="宝贝收到您还满意吗？说下您的使用心得！！"
                        placeholderTextColor="gray"
                        onChangeText={(value)=>{
                            this.setState({
                                content:value
                            })
                        }}
                        />
                        <View style={{height:height*0.03,width:width*0.12,borderRadius:15,borderColor:'orangered',borderStyle:'solid',borderWidth:1,alignItems:"center",justifyContent:"center",marginRight:30}}>
                        <Text style={{color:'orangered'}} onPress={()=>{
                            this.comment(item.productId);
                        }}>发布</Text></View>
                        <View><Text style={{color:'gray',fontSize:12,textAlign:'right'}}>您的评价能帮到其他伙伴哟！</Text></View>
                </View>
            </View>
                         ))
                     }
           
          </View>
          </ScrollView>
   
          </View>
        )
    }
}