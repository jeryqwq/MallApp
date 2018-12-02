import React from 'react';
 import {Text,View} from 'react-native';
 import NavFooter from './../NavFooter'
 import CateGory from "./../Category"
export default class Category extends React.Component{
constructor(){
    super()
}
render(){
    return(
        <View style={{height:'100%'}}>  
        
            <CateGory/>
            <NavFooter navigation={this.props.navigation} curIndex={2}/>
        </View>
    )
}

}