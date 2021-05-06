import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';

import Icon from 'react-native-vector-icons/Feather';
import TodoList from './TodoList';
import { connect } from 'react-redux'

function TodoApp(props) {
    return (
      <View style={styles.container}>
      <Text style={styles.header}>Todo List</Text>
      <View style={styles.textInputContainer}>
        <TextInput
          style={styles.textInput}
          multiline={true}
          placeholder="What do you want to do today?"
          placeholderTextColor="#abbabb"
          onChangeText={(text)=>{props.changeValue(text)}}
        />
        <TouchableOpacity onPress={() => {
          //You need to implement on press
          props.addTodo(props.value)
        }}>
          <Icon name="plus" size={30} color="blue" style={{ marginLeft: 15 }} />
        </TouchableOpacity>
      </View>
      <ScrollView style={{ width: '100%'}}>
          { //Once your impmlement the map functions edit these
          // You will also need to edit the deleteTodo and setCheckedFunciton Pointers 
           props.todos.map(item => (
            <TodoList
              text={item.text}
              key={item.key}
              checked={item.checked}
              deleteTodo={()=>{props.deleteTodo(item)}}
              setChecked={()=>{props.setChecked(item)}}
             />
            ))
            }
      </ScrollView>
    </View>
    )
  }


function mapStateToProps(state) {
  return {
    value : state.value,
    todos : state.todos,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    changeValue : (text) => dispatch({type : 'CHANGE_VALUE', payload : text}),
    addTodo : (text) => dispatch({type : 'ADD_TODO', payload : text}),
    deleteTodo : (thing) => dispatch({type : 'DELETE_TODO', payload : thing}),
    setChecked : (thing) => dispatch({type : 'CHECK_TODO',  payload : thing}),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoApp);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  header: {
    marginTop: '15%',
    fontSize: 20,
    color: 'red',
    paddingBottom: 10,
  },
  textInputContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    borderColor: 'black',
    borderBottomWidth: 1,
    paddingRight: 10,
    paddingBottom: 10,
  },
  textInput: {
    flex: 1,
    height: 20,
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    paddingLeft: 10,
    minHeight: '3%',
  },
});