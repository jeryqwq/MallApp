import React from 'react'
import {View,Text,StyleSheet,Dimensions} from 'react-native'

const {width,height} = Dimensions.get('window');

export default class ShowInfo extends React.Component{
    constructor( props){
        props(props);
    }
    render(){
        return(
            <View style={this.props.isShow==true?style.modal:style.hideModal}>
                <Text>{this.props.title}</Text>

            </View>
        )
    }
}
const style=StyleSheet.create({
    modal:{
        height:height,
        width:width,
        backgroundColor:'rgba(0,0,0,0.3)',
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'column'
    },
    hideModal:{
        height:height,
        width:width,
        backgroundColor:'rgba(0,0,0,0)',
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'column'
    }
    
})