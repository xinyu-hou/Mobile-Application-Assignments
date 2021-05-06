import * as React from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import moment from "moment";

//Build out the invitation card component. 
//It will be passed 3 props: 
// prop.pic : last part of the url associated with the picture
//prop.name : the Name of person
//prop.date: The Date of the event
export default function InvationCard(props) {
  let imageBase =
    'https://www.cs.virginia.edu/~dgg6b/Mobile/ScrollLabJSON/Images/';
  let newURL = {
    uri: imageBase + props.event.pic}
  // const fetch = require("isomorphic-fetch")
  // let response = await fetch(newURL)

  //Implement the format Date function
  function formatDate(date) {
    let rightDate = moment(date).format("dddd DD MMM - LT")
    return rightDate
  }

  return (
    <View style = {styles.container}>
      <View style= {styles.topContainer}>
        <View style = {styles.topLeftContainer}>
      <Image source = {newURL}
        style = {styles.profilePic}/>
        </View>
        <View style = {styles.topRightContainer}>
      <Text style = {styles.personName}>{props.event.name}</Text>
      <Text style = {styles.eventDate}>{formatDate(props.event.date)}</Text>
      </View>
      </View>
      <View style = {styles.bottomContainer}>
        <View style = {styles.bottomLeftContainer}>
        <Image source = {require("../assets/declineIcon.png")}/>
        <Text style = {styles.declineText}>  Decline</Text>
        </View>
        <View style = {styles.bottomRightContainer}>
        <Image source = {require("../assets/acceptIcon.png")}/>
        <Text style = {styles.acceptText}>  Accept</Text>
        </View>
      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    width: 315,
    height: 133,
    shadowColor: 'grey',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,
    elevation: 11,
  },
  topContainer : {
    flexDirection : "row",
    height : "65%",
    borderWidth : 1,
    borderColor : "rgba(0,0,0,0.05)"
  },
  topLeftContainer : {
    height : "100%",
    width : "30%",
    justifyContent : "center",
    alignItems : "center",
  },
  topRightContainer : {
    height : "100%",
    width : "70%",
    justifyContent : "center",
    alignItems : "flex-start",
  },
  profilePic : {
    height : 50,
    width : 50,
  },
  personName : {
    fontFamily: "Helvetica", 
    fontSize: 14,
    color: "#000000",
    letterSpacing: 0,
  },
  eventDate : {
    opacity: 0.5,
    fontFamily: "Helvetica",
    fontSize: 14,
    color: "#000000",
    letterSpacing: 0,
  },
  bottomContainer : {
    flexDirection : "row",
    height : "35%",
    alignItems: "center",
  },
  bottomLeftContainer : {
    height : "100%",
    width : '50%',
    borderWidth : 1,
    borderColor : "rgba(0,0,0,0.05)",
    flexDirection : "row",
    justifyContent : "center",
    alignItems : "center",
  },
  bottomRightContainer : {
    height : "100%",
    width : '50%',
    borderWidth : 1,
    borderColor : "rgba(0,0,0,0.05)",
    flexDirection : "row",
    justifyContent : "center",
    alignItems : "center",
  },

  declineText : {
    fontFamily: "Helvetica",
    fontSize: 14,
    color: "#FF3B3B",
    letterSpacing: 0,
  },
  acceptText : {
    fontFamily: "Helvetica",
    fontSize: 14,
    color: "#38D459",
    letterSpacing: 0,
  },
});
