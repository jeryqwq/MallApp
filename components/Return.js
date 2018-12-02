import React from 'react';
import {Text,View} from 'react-native';
import Navigation from './../store/navigation'
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
    <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:"center",backgroundColor:'#EAEAEA',height:50}}>
        <Text onPress={()=>{ routerLink(this.props.returnPath)}} style={{marginLeft:20,fontSize:30,color:'gray'}}>{">".toString()}</Text>
        <Text style={{fontSize:20}}>{this.props.title}</Text>
        <Text onPress={()=>{this.props.returnDo()}} style={{fontSize:15,marginRight:10}}  >{this.props.subtitle}</Text>
    </View>
    )
}

}