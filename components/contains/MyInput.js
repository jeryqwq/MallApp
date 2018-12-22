import React from 'react';
import {View,TextInput,Dimensions,StyleSheet,Text} from 'react-native'
const {width,height} = Dimensions.get('window')

export default MyInput=(that,key,holder,lins)=>{
    return(
    <View style={style.wrap}>
         <View style={{width:width*0.2,flexDirection:"row",justifyContent:'flex-end'}}><Text>{holder}:</Text>
        </View>
        <TextInput placeholder={holder?holder:''} placeholderTextColor="gray" 
        style={{width:width*0.8}}
        multiline={true}
        clearTextOnFocus={true}
        numberOfLines={lins==undefined?1:lins}
        value={that.state[key]}
        onChangeText={(val)=>{
            that.setState({
                [key]:val
            })
        }}
        />
    </View>
    )
}
let style=StyleSheet.create({
    wrap:{flexDirection:'row', justifyContent:"space-between",alignItems:"center",backgroundColor:'white',borderBottomWidth:1,borderStyle:'solid',borderBottomColor:'#f5f5f5'},
})