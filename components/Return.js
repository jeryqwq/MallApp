import React from 'react';
import {Text,View,Dimensions} from 'react-native';
import Navigation from './../store/navigation'

const {width,height} = Dimensions.get('window')

export default class Return extends React.Component{
constructor(props){
    super(props)
}
render(){
    routerLink=function(path){
        const {navigate} =Navigation.getNavigation();
        navigate(path);
    }
    return(
    <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:"center",backgroundColor:'#FF4500',height:height*0.05}}>
        <Text onPress={()=>{ routerLink(this.props.returnPath)}} style={{marginLeft:20,fontSize:30,color:'white'}}>{">".toString()}</Text>
        <Text style={{fontSize:20,color:"white"}}>{this.props.title}</Text>
        <Text onPress={()=>{this.props.returnDo()}} style={{fontSize:15,marginRight:10,color:'white'}}  >{this.props.subtitle}</Text>
    </View>
    )
}

}