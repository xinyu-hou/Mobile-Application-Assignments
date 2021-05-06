import * as React from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import moment from "moment";

export default function InvationCard(props) {
  let imageBase =
    'https://www.cs.virginia.edu/~dgg6b/Mobile/ScrollLabJSON/Images/';

  function formatDate(date) {
    return date.format('dddd DD MMM - LT')
  }

  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <Image
          style={styles.profileImage}
          source={{ uri: imageBase + props.pic }}
        />
        <View style={styles.textSection}>
          <Text>{props.name}</Text>
          <Text>{formatDate(props.date)}</Text>
        </View>
      </View>
      <View style={styles.bottomSection}>
        <View style={styles.bottomLeftSection}>
        <TouchableOpacity

          onPress={()=>{props.declineInvitationCallBack(props.id)}} // NEW CODE

          style={styles.buttonStyle}>
          <Image source = {require("../assets/declineIcon.png")}/>
          <Text
            style={{
              fontFamily: 'Helvetica',
              fontSize: 14,
              color: '#FF3B3B',
            }}> Decline
          </Text>
        </TouchableOpacity>
        </View>
        <TouchableOpacity

          onPress={()=>{props.acceptInvitationCallBack(props.id)}} // NEW CODE

          style={styles.buttonStyle}>
          <Image source = {require("../assets/acceptIcon.png")}/>
          <Text
            style={{
              fontFamily: 'Helvetica',
              fontSize: 14,
              color: '#38D459',
            }}> Accept
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
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
  profileImage: {
    width: 50,
    height: 50,
    margin: 10,
  },
  topSection: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
    height: 50,
  },
  buttonStyle: {
    width: '50%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomSection: {
    flexDirection: 'row',
    borderTopColor: '#D8D8D8',
    borderTopWidth: 1,
    height: 52,
    width: '100%',
    fontFamily: "Helvetica",
  },
  bottomLeftSection: {
    borderRightColor: "#D8D8D8",
    borderRightWidth: 1,
    width:"50%",
    flexDirection:"row",
    justifyContent:"center",
  },
});
