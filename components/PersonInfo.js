import React from 'react';
import {View,Text,Dimensions,Image} from 'react-native';
import ProductStatus from './ProductStatus'
import Store from './../store/userStore'
import PersonItemCard from './PersonItemCard';
import {UserMenuInfos,AppInfoMenu} from './../config/menu'
const {width,height} = Dimensions.get('window')
export default class PersonInfo extends React.Component{
    constructor(props){
        super(props);
}
render(){
    const user=Store.getUserInfo();
    return(
        <View>
            <View style={{height:height*0.2,backgroundColor:'#ff6100'}}>
            <View style={{flexDirection:'row',marginLeft:30,marginTop:30}}>
                <Image 
                style={{width:80,height:80,borderRadius:40}}
                source={{uri:"http://gw.alicdn.com/sns_logo/i2/2220876650/TB2li_XlFXXXXXBXXXXXXXXXXXX_!!0-mytaobao.jpg_.webp"}}
                />
                <View style={{marginLeft:20}}>
                    <Text style={{color:'white',fontSize:35}}>{user.username}</Text>
                    <Text style={{color:'white',fontSize:20,backgroundColor:'rgba(0,0,0,0.2)',paddingLeft:10,paddingRight:10,borderRadius:10}}>>{user.email}</Text>
                </View>
            </View>
            </View>
            <ProductStatus/>
            <PersonItemCard cardInfos={UserMenuInfos}/>
            <PersonItemCard cardInfos={AppInfoMenu}/>
            <View style={{height:height*0.04,width:width,alignItems:"center",justifyContent:"center",backgroundColor:'#ff6100'}}>
            <Text style={{color:'white'}}>退出当前账户</Text></View>
        </View>
    )
}
}