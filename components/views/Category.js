import React from 'react';
 import {Text,View} from 'react-native';
 import NavFooter from './../NavFooter'
 import CategoryList from "./../Category"
export default class Category extends React.Component{
constructor(){
    super()
}
render(){
    return(
        <View style={{height:'100%'}}>  
        
            <CategoryList/>
            <NavFooter navigation={this.props.navigation} curIndex={2}/>
        </View>
    )
}

}