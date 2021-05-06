import React, {useState} from 'react';
import { Text, View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import DayCard from './DayCard';
import moment from 'moment';

export default function MonthEventsScroll(props) {
    let year = 2019

    function getEvents(month, eventsThatMonth) {
        let DayArray = [];
        eventsThatMonth.map(event => {
            DayArray[event.date.date() - 1] = event;
        });
        if (month === 3 || month === 5 || month === 8 || month === 10){
            for (let i = 0; i < 30; i++){
                if (DayArray[i] == undefined){
                    DayArray[i] = {
                        id : i,
                        date : moment([year, month, i + 1]),
                    }
                } else {
                    DayArray[i].id = i
                }
            }
            return DayArray
        } else if (month === 0 || month === 2 || month === 4 || month === 0 || month === 6 ||
            month === 7 || month === 9 || month === 11){
            for (let i = 0; i < 31; i++){
                if (DayArray[i] == undefined){
                    DayArray[i] = {
                        id : i,
                        date : moment([year, month, i + 1]),
                    }
                } else {
                    DayArray[i].id = i
                }
            }
            return DayArray
        } else if (month === 1){ // numOfDay == 28
            for (let i = 0; i < 28; i++){
                if (DayArray[i] == undefined){
                    DayArray[i] = {
                        id : i,
                        date : moment([year, month, i + 1]),
                    }
                } else {
                    DayArray[i].id = i
                }
            }
            return DayArray
        }
    }

    return(
        <View style={styles.container}>
            {/* <Text>{numOfDays}</Text> */}
            <FlatList
                data={getEvents(props.month, props.eventsThatMonth)}
                renderItem={({item}) => (
                    <DayCard
                        pic={item.pic}
                        name={item.name}
                        date={item.date}
                        accepted={item.accepted}
                    />
                )}
                keyExtractor={item => item.id}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container : {
        flexGrow: 1,
        height : "100%",
        width : "100%",
        backgroundColor : "white",
    },
})