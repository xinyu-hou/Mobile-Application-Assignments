import React from 'react';
import {View, ImageBackground, Text, StyleSheet, Image} from 'react-native';

export default class TopBar extends React.Component{
    render(){
        return(
            <View style = {styles.container}>
                <Image source = {require("../assets/sidemenu_btn.png")}/>
                <Text>DinDin</Text>
                <Image source = {require("../assets/search_btn.png")}/>
            </View>
        )
    }
}

const styles = StyleSheet.create(
    {
        container : {
            height : "100%",
            width : "100%",
            backgroundColor : "white",
            flexDirection : "row",
            justifyContent : 'space-between',
            alignItems : 'center',
            paddingHorizontal : 10,
        },
        title : {
            fontFamily: "Helvetica",
            fontSize: 17,
            color: "#353535",
            letterSpacing: 0,
            textAlign: "center",
        },
    }
)