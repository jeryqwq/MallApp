import React from 'react';
import {View,Text,Dimensions,StyleSheet,TouchableOpacity} from 'react-native';
const {width,height} = Dimensions.get('window')
import Navigation from './../store/navigation';
export default class PersonItemCard extends React.Component{
    constructor(props){
        super(props);
    }
    routerLink(path){
        const {navigate} =Navigation.getNavigation();
        navigate(path);
    }

    render(){
        const that=this;
        const subInfos=this.props.cardInfos.subInfos;
        
        function SubCards(){
                   return subInfos.map((item,index)=>
                   <TouchableOpacity  activeOpacity={0.5} onPress={()=>{that.routerLink(item.path)}}>
                        <View style={style.item} key={index}>
                            <Text >{item.title}</Text>
                            <Text style={{fontSize:25,color:'#d7d7d7'}}>></Text>
                        </View>
                    </TouchableOpacity>

                    )               
            }
        return(
                <View style={style.wrap}>
                        <View style={style.item}>
                            <Text>{that.props.cardInfos.mainTitle}</Text>
                        </View>
                     <SubCards/>
                </View>
        )
    }
}
const style=StyleSheet.create({
    subitem:{paddingLeft:15,paddingRight:20,flexDirection:'row',justifyContent:'space-between',alignItems:"center",marginLeft:10,height:height*0.05,borderBottomColor:'#F4F4F4',borderStyle:'solid',borderBottomWidth:1},
    wrap:{backgroundColor:'white',marginTop:10,borderRadius:20,width:width*0.96,marginLeft:width*0.02},
    item:{paddingLeft:15,paddingRight:20,flexDirection:'row',justifyContent:'space-between',alignItems:"center",marginLeft:10,height:height*0.05,borderBottomColor:'#F4F4F4',borderStyle:'solid',borderBottomWidth:1},

})