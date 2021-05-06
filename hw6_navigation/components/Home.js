import * as React from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';
import { LinearGradient } from 'expo-linear-gradient';
import moment from "moment";
import Events_CaroselView from './Events_CaroselView';

export default class Home extends React.Component {
  //Screen really only has two states
  //Month and events 
  constructor(props){
      super(props)
      this.state = {
        month : "",
        eventsData : "",
      }
  }
 
  componentDidMount(){
        const fetchData = async () => {
        let response = await fetch(
          'https://www.cs.virginia.edu/~dgg6b/Mobile/ScrollLabJSON/cards.json'
        );
        let parseObject = await response.json();
        //Setup call set State,
        var things = this.assignIDs(parseObject);
        var finalThings = this.eventsPending(things);
        this.setState({
          eventsData : finalThings
        }) 
      };
      fetchData();
    }
    
    //AssignIDs and formats dates 
    assignIDs(events){
        return events.map((event, index)=>{
            event.id = index
            event.date = moment(event.date, "DD-MM-YYYY hh:mm:ss")
            return event
        })
    }

    ////Method that filters Events Pending
    eventsPending(events){
        return events.filter(event => {
            return event.accepted === undefined ? true : false
            }
        )
    }

    render(){
        return (
        <View style={styles.container}>
            <View style = {styles.topBar}>
        <TouchableOpacity onPress={() => this.props.navigation.openDrawer()}>
            <Image source = {require("../assets/sidemenu_btn.png")}/>
        </TouchableOpacity>
        <Text>DinDin</Text>
        <Image source = {require("../assets/search_btn.png")}/>
        </View>

        <LinearGradient
            colors={['#FFFFFF', '#D3DAEB', '#FFFFFF']}>
        <Events_CaroselView eventsData = {this.state.eventsData}/>
        </LinearGradient>
        </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    width: "100%",
    justifyContent: 'flex-start',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: 'white',
  },
  topBar : {
    height : "5%",
    width : "100%",
    backgroundColor : "white",
    flexDirection : "row",
    justifyContent : 'space-between',
    alignItems : 'center',
    paddingHorizontal : 10,
  },
});
