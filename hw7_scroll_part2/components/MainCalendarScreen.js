import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity, ScrollView, Alert } from 'react-native';
import Constants from 'expo-constants';
import CaroselView from './CaroselView';
import MonthScroll from './MonthScroll';
import MonthEventsScroll from './MonthEventsScroll';
import { LinearGradient } from 'expo-linear-gradient';
import moment from 'moment';


export default function MainCalendarScreen(){
  const [month, setMonth] = useState(new Date().getMonth());
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      let response = await fetch(
        'https://www.cs.virginia.edu/~dgg6b/Mobile/ScrollLabJSON/cards.json'
      );
      let parseObject = await response.json();
      let eventArray = assignIDs(parseObject);
      setEvents(eventArray);
  }
  fetchData();
  }, [])

  function assignIDs(events) {
    return events.map((event, index) => {
      event.id = index;
      event.date = moment(event.date, 'DD-MM-YYYY hh:mm:ss');
      return event;
    });
  }

  function eventsPending(events) {
    return events.filter(event => {
      return event.accepted === undefined ? true : false;
    });
  }

  function eventsThatMonth(events, thatMonth){
    return events.filter((event) => {
      return event.date.month() === thatMonth & event.accepted === true ? true : false
    })
  }

  function callBackForSettingMonth(monthID){
    setMonth(monthID)
  }

  function acceptInvitation(eventID){
    setEvents(
      events.map(event => {
        if (event.id === eventID){
          event.accepted = true
          Alert.alert("This invitation has been accepted.")
        }
        return event
      })
    )
  }

  function declineInvitation(eventID){
    setEvents(
      events.filter(event => {
        if (event.id !== eventID){
          return true
        }
      })
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.topNavigationView}>
        {/* <TouchableOpacity onPress={()=>{this.props.navigation.openDrawer()}}> */}
        <TouchableOpacity>
          <Image source={require("../assets/sidemenu_btn.png")}/>
        </TouchableOpacity>
        <Text style={styles.topNavigationViewText}> DinDin </Text>
        <Image source={require("../assets/search_btn.png")}/>
      </View>
      <View style={{ height: 40, width: '100%' }}>
        <MonthScroll 
          selectedMonth={month}
          callBackOnPress={callBackForSettingMonth}
        />
      </View>
        <Text style={{marginLeft : 10}}>Pending ({eventsPending(events).length})</Text>
      <LinearGradient colors={['#FFFFFF', '#D3DAEB', '#FFFFFF']}>
        <CaroselView 
        eventsData={eventsPending(events)}
        acceptInvitationCallBack={acceptInvitation}
        declineInvitationCallBack={declineInvitation}
         />
      </LinearGradient>   
      <View style={{height:"65%"}}>  
        <MonthEventsScroll
          eventsThatMonth={eventsThatMonth(events, month)}
          month={month}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    width: '100%',
    justifyContent: 'flex-start',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: 'white',
  },
  topNavigationView: {
    height : "5%",
    width : "100%",
    backgroundColor : "white",
    flexDirection : "row",
    justifyContent : 'space-between',
    alignItems : 'center',
    paddingHorizontal : 10,
  },
  topNavigationViewText: {
    fontFamily: 'Helvetica',
    fontSize: 17,
    color: '#353535',
  },
});
