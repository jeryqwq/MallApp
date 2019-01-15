import React from 'react'
import {View,Text} from 'react-native';
import Retrun from './../Return'
import startsRender from './../contains/StartsComment'
import ProductAjax from './../../ajax/productAjax'
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
        ProductAjax.getComment(global.productId).then((result) => {
            const resObj=eval("("+result._bodyInit+")");
            console.warn(resObj);
        }).catch((err) => {
            
        });
    }
    render(){
        return(
            <View>
            <Retrun title="当前所有评论" returnPath="ProductDesc"/>
            <View>

            </View>
            </View>
        )
    }
}