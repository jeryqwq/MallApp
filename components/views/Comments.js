import React from 'react'
import {View,Text,ScrollView,Dimensions} from 'react-native';
import Retrun from './../Return'
import startsRender from './../contains/StartsComment'
import ProductAjax from './../../ajax/productAjax'
const {width,height} = Dimensions.get('window')

export default class Comments extends React.Component{
    constructor(props){
        super();
        this.state={
            comments:[],
            pageSize:8,
            pageNum:1
        }
    }
    componentDidMount(){
        this.getCommentsData();
    }
    getCommentsData(){
        ProductAjax.getComment(global.productId,this.state.pageNum,this.state.pageSize).then((result) => {
            const resObj=eval("("+result._bodyInit+")");
            this.setState({
                comments:resObj.data.list
            })
        }).catch((err) => {
            
        });
    }
    render(){
        return(
            <View>
                <Retrun title="当前所有评论" returnPath="ProductDesc"/>
                    <ScrollView style={{backgroundColor:'white',height:height*0.92}}>
            {
                this.state.comments?this.state.comments.length!=0?this.state.comments.map((item,index)=>(
                    <View key={index} style={{margin:10,borderStyle:'solid',borderBottomWidth:1,borderBottomColor:'#f5f5f5'}}>
                    <View style={{flexDirection:"row",justifyContent:"flex-start"}}>
                        <Text>用户:{item.username}</Text>
                        {startsRender(item.cStarts)}
                        {/* RenderStarts */}
                    </View>
                    <View><Text style={{color:"gray",fontSize:12,marginTop:5}}>日期:{item.cTime}</Text></View>
                    <Text style={{marginTop:8,fontSize:15,paddingBottom:10}}>{"    ".toString()}{item.cContent}</Text>
                </View>
                )):<Text style={{color:'red'}}>该商品暂无评论</Text>:undefined
            }
                </ScrollView>
            
            </View>
        )
    }
}