import React, { useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';


export default function MonthScroll(props) {
    var months = ["January", "February", "March", "April", 
                "May", "June", "July", "August", "September",
                "October", "November", "December"]

    function monthsButtons(months){
            let things = []
            for(let i = 0; i < months.length; i++){ 
            let thing = (
                <TouchableOpacity 
                    onPress={() => {props.callBackOnPress(i)}}>
                    <Text 
                        style = {styles.monthText,
                        props.selectedMonth === i ? {opacity : 1} : {opacity : 0.3}}>
                        {"  " + months[i] + "   "}
                    </Text>
                </TouchableOpacity>
            )
            things.push(thing)
        }
        return things
    }

    return(
        <View style={styles.container}>
            <ScrollView horizontal 
                showsHorizontalScrollIndicator={false}>
                {monthsButtons(months)}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container : {
        height : "70%",
        width : "100%",
        alignItems : "center",
        justifyContent : "center",
        marginTop : "1%",
        borderBottomColor : "#D8D8D8",
        borderBottomWidth : 1,
    },
    monthText : {
        fontFamily : "Helvetica",
        fontSize : 14,
        color : "grey",
        letterSpacing: 0,
        textAlign: "center",
    },
})
