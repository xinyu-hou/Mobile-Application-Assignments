import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import CaroselView from './components/CaroselView'
import { LinearGradient } from 'expo-linear-gradient';
import moment from 'moment';
import InvationCard from './components/InvitationCard';
import TopBar from './components/TopBar';

//Keep the data at the highest level and then 
//have it flow to lower sub components. 

//converted to functional component 
export default class App extends React.Component {
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
        // MY CODE
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
        })
  }


 
render(){
  //Rember to pass your pending events to the Carosel View.
  //Using the correct Prop. 

    return (
      <View style={styles.container}>
      <View style={{height: "5%", width: "100%"}}>
        <TopBar/>        
      </View>
      <LinearGradient
        colors={['#FFFFFF', '#D3DAEB', '#FFFFFF']}>
        <CaroselView eventsData = {this.state.eventsData}/>
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
  }
});
