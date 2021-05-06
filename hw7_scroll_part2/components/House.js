import React from 'react';
import { View, ImageBackground, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import * as Facebook from 'expo-facebook';
import { NavigationContainer } from '@react-navigation/native';
import Splash from './Splash';
import HomeScreen from './HomeScreen'
import * as SecureStore from 'expo-secure-store';

export default class House extends React.Component{
    
    constructor(){
        super();
        this.state = {
            loading : true,
            token : null,
        }
    }

    UNSAFE_componentWillMount(){
        setTimeout(() => {this.checkForToken()}, 2000)
    }

    async checkForToken(){
        let token = await SecureStore.getItemAsync('token')
        console.log(token)
        this.setState({
            token : token,
            loading : false,
        })
    }

    async saveTokenToSecureStorage(token){
        SecureStore.setItemAsync('token', token)
        this.setState({
            token : token,
        })
    }

    render(){
        if (this.state.loading === true){
            return(<Splash/>)
        } else if (this.state.token === null){
            return(
                <View>
                    <View style = {styles.container}>
                        <ImageBackground source = {require("../assets/background.png")}
                            style = {styles.background}/>
                        <Text style = {styles.title}>DinDin</Text>
                        <Text style = {styles.sentence}>Connecting food lovers</Text>
                    </View>
                    <TouchableOpacity
                        style = {styles.loginButton}
                        onPress = {() => this.logIn()}
                    >
                      <Text style = {styles.loginText}>Login with Facebook</Text>
                    </TouchableOpacity> 
                </View>
            )
        } else if (this.state.token){
        //   return(<Events/>)
            return <HomeScreen/>
        }
    }

    async logIn() {
        try {
              //Seed documentation on course site at mobileappdev.teachable.com
              //For default user names and passwords.
            await Facebook.initializeAsync('821914811678666');
                const {
                    type,
                    token,
                    expires,
                    permissions,
                    declinedPermissions,
                } = await Facebook.logInWithReadPermissionsAsync({
                    permissions: ['public_profile'],
                });
                if (type === 'success') {
                    // Get the user's name using Facebook's Graph API
                    const response = await fetch(
                    `https://graph.facebook.com/me?access_token=${token}`
                    );
                    this.saveTokenToSecureStorage(token)
                    Alert.alert('Logged in!', `Hi ${(await response.json()).name} user!`);
                } else {
                    // type === 'cancel'
                }
        } catch ({ message }) {
            alert(`Facebook Login Error: ${message}`);
        }
    }
}

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
        loginText : {
            fontFamily : "Helvetica",
            fontWeight : "bold",
            color : "white",
            fontSize : 15,
        },
        loginButton : {
            height : "7%",
            width : "100%",
            backgroundColor : "#1AB9FF",
            alignItems : "center",
            justifyContent : "center",
        },
    }
)
