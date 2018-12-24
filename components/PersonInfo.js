import React from 'react';
import {View,Text,Dimensions,Image,ToastAndroid} from 'react-native';
import ProductStatus from './ProductStatus'
import Store from './../store/userStore'
import PersonItemCard from './PersonItemCard';
import {UserMenuInfos,AppInfoMenu} from './../config/menu'
const {width,height} = Dimensions.get('window')
import userAjax from './../ajax/userAjax'
export default class PersonInfo extends React.Component{
    constructor(props){
        super(props);
        this.state={
            user:Store.getUserInfo()
        }
}
render(){
    return(
        <View>
            <View style={{height:height*0.2,backgroundColor:'#ff6100'}}>
            <View style={{flexDirection:'row',marginLeft:30,marginTop:30}}>
                <Image 
                style={{width:80,height:80,borderRadius:40}}
                source={{uri:"http://gw.alicdn.com/sns_logo/i2/2220876650/TB2li_XlFXXXXXBXXXXXXXXXXXX_!!0-mytaobao.jpg_.webp"}}
                />
                <View style={{marginLeft:20}}>
                    <Text style={{color:'white',fontSize:35}}>{this.state.user.username}</Text>
                    <Text style={{color:'white',fontSize:20,backgroundColor:'rgba(0,0,0,0.2)',paddingLeft:10,paddingRight:10,borderRadius:10}}>>{this.state.user.email}</Text>
                </View>
            </View>
            </View>
            <ProductStatus/>
            <PersonItemCard cardInfos={UserMenuInfos}/>
            <PersonItemCard cardInfos={AppInfoMenu}/>
            <View style={{height:height*0.04,width:width,alignItems:"center",justifyContent:"center",backgroundColor:'#ff6100'}}>
            <Text style={{color:'white'}} onPress={()=>{
                userAjax.userLogout().then((res) => {
                    const resobj=eval("("+res._bodyInit+")");
                    if(resobj.status==0){
                        resobj.status==0?ToastAndroid.show("退出成功!",500):undefined;
                        Store.userLogout();
                        
                    }
                }).catch((err) => {
                    
                });
            }}>退出当前账户</Text></View>
        </View>
    )
}
}