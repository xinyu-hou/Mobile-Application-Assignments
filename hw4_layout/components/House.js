import React from 'react';
import {View, ImageBackground, Text, StyleSheet, Image} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';


export default class House extends React.Component{
    render(){
    return(
        <View>
            <View style = {styles.container}>
                <ImageBackground source = {require("../assets/background.png")}
                    style = {styles.background}/>
                <Text style = {styles.title}>DinDin</Text>
                <Text style = {styles.sentence}>Connecting food lovers</Text>
            </View>
            <View style = {styles.bottom}>
                <Text style = {styles.start}>Get Started!</Text>     
            </View>
        </View>
    )
}}

const styles = StyleSheet.create(
    {
        container : {
            height : "93%",
            width : "100%",
            backgroundColor : "white",
            alignItems : 'center',
            justifyContent : 'center',
        },
        background : {
            height : 300,
            width : 300,
        },
        title : {
            fontFamily : "Helvetica",
            fontSize : 29,
            color : "black",
            letterSpacing : 0,
            textAlign : "center",
            marginTop : "20%",
        },
        sentence : {
            opacity : 0.5,
            fontFamily : "Helvetica",
            fontSize : 14,
            color : "#000000",
            letterSpacing : 0,
            textAlign: "center",
            marginTop : 10,
        },
        start : {
            fontFamily : "Helvetica",
            fontSize : 14,
            color : "#FFFFFF",
            textAlign : "center",
            letterSpacing : 0,
        },
        bottom : {
            height : "7%",
            width : "100%",
            backgroundColor : "#1AB9FF",
            alignItems : "center",
            justifyContent : "center",
        }
    }
)
