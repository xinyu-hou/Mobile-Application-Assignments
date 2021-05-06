import * as React from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';

export default function DayCard(props){
    let imageBase = 'https://www.cs.virginia.edu/~dgg6b/Mobile/ScrollLabJSON/Images/';

    function formatTime(date){
        return date.format('LT')
    }

    function formatDate(date){
        return date.format('dddd DD MMM')
    }

    let _accepted =
        ( // may need to change position
            <View style={styles.bottomContainer}>
                <Image 
                    source={{uri : imageBase + props.pic}}
                    style={styles.profileImage}/>
                <View style={styles.textContainer}>
                    <Text>{props.name}</Text>
                    <Text>{formatTime(props.date)}</Text>
                </View>
                <Image source={require('../assets/call.png')}
                    style={{margin: 5}}/>
                <Image source={require('../assets/email.png')}
                    style={{margin: 5}}/>
            </View>
        )

    let _declined =
        (
            <View style={styles.addAnEventContainer}> 
                <Image source={require('../assets/addNewEventButton.png')}/>
            </View>
        )

    return (
        <View style={styles.container}>
            <View style={styles.topContainer}>
                <Text style={styles.dateText}>{formatDate(props.date)}</Text>
            </View>
            {props.accepted === true ? _accepted : _declined}
        </View>
    )
}

const styles = StyleSheet.create({
    container : {
        height : 120,
        width : "100%",
    },
    topContainer : {
        height : "30%",
        width : "100%",
        borderBottomColor : "#F3F0EF",
        borderBottomWidth : 1,
        paddingTop : 10,
        flexDirection : "column",
        alignContent : "center",
        justifyContent : "flex-start",
    },
    dateText : {
        fontFamily: "Helvetica",
        fontSize: 13,
        color: "#000000",
        letterSpacing: 0,
        marginLeft : 10, 
    },
    bottomContainer : {
        height : "70%",
        width : "100%",
        borderBottomColor : "#F3F0EF",
        borderBottomWidth : 1,
        flexDirection : "row",
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    addAnEventContainer : {
        height : "70%",
        width : "100%",
        borderBottomColor : "#F3F0EF",
        borderBottomWidth : 1,
        alignItems : "center",
        justifyContent : "center",
    },
    profileImage : {
        width: 50,
        height: 50,
        margin: 10,
    },
    textContainer : {
        width : "57%",
    },
})