import React, {Component} from "react";
import {ActivityIndicator,  StyleSheet,  View} from "react-native";

export default function IsLoading(isload)  {

        return (
            <View style={styles.container}>
                <ActivityIndicator
                    animating={isload}
                    color='red'
                    size="large"
                />
            </View>
        );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
});
