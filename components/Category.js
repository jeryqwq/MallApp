import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  Text,
  ScrollView
} from "react-native";


const {width,height} = Dimensions.get('window')

export default class App extends Component {
    constructor(props){
        super(props);
        this.state={
            opacity:1
        }
    }
  render() {
    return (
        <View style={{height:height*2}}>
      <ScrollView style={styles.container}
      onScroll = {(event)=>{{
        if(event.nativeEvent.contentOffset.y<=100){

        }
      }}}
      >

        </ScrollView>
        </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {

  }
});