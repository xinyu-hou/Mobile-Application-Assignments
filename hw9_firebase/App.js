import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import * as firebaseApp from 'firebase';
import * as SecureStore from 'expo-secure-store';
import * as Facebook from 'expo-facebook';
import thunk from 'redux-thunk';
import TodoApp from './components/ToDoApp';

var firebaseConfig = {
    apiKey: "AIzaSyAJST8ROArjoEZmxEa2H_edAnLEIBdK6vo",
    authDomain: "hw9-firebase.firebaseapp.com",
    databaseURL: "https://hw9-firebase.firebaseio.com",
    projectId: "hw9-firebase",
    storageBucket: "hw9-firebase.appspot.com",
    messagingSenderId: "951396450068",
    appId: "1:951396450068:web:10f9407d3ba8b112748c01",
    measurementId: "G-EB4FVQ05QG"
  };
// Initialize Firebase
if (firebaseApp.apps.length == 0) {
  firebaseApp.initializeApp(firebaseConfig);
}

const initialState = {
  todos: [],
  uid: null,
};

function setupTodoListener(userID) {
  firebaseApp
    .database()
    .ref('users/' + userID)
    .on('value', snapshot => {
      if (snapshot.val() !== null) {
        console.log(snapshot.val())
        store.dispatch({
          type: 'LOAD_TODO',
          payload: { todos: snapshot.val().todos },
        });
      } else {
        store.dispatch({
          type: 'LOAD_TODO',
          payload: { todos: [] },
        });
      }
    });
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOAD_TODO':
      return { ...state, todos: action.payload.todos };
    case 'ADD_TODO':
      return { ...state, todos: [...state.todos, action.payload.add] };
    case 'DELETE_TODO':
      return { ...state, todos: deleteHelper(state.todos, action.payload.key) };
    case 'TOGGLE_CHECKED':
      return { ...state, todos: toggleHelper(state.todos, action.payload.key) }; 
    case 'UID_UPDATE':
      return { ...state, uid: action.payload.uid}
  }

  return state;
};

const store = createStore(reducer, applyMiddleware(thunk));

let deleteHelper = (todo, id) => {
  return todo.filter(todo => {
    if (todo.key !== id) return true;
  });
};

let toggleHelper = (todo, id) => {
  return todo.map(todo => {
    if (todo.key === id) todo.checked = !todo.checked;
    return todo;
  });
};

function storeTodo(userID, todo) {
  //Write this score to the database
  firebaseApp
    .database()
    .ref('users/' + userID)
    .set({
      todos: todo,
    });
}

export default function App() {
  const [loading, setLoading] = React.useState(true);
  const [token, setToken] = React.useState(null);
  var [uid, setuid] = React.useState(null);

  useEffect(() => {
    checkForToken();
    checkForFirebaseCredential();
    firebaseApp.auth().onAuthStateChanged(user => {
      if (user != null) {
        setuid(user.uid);
        console.log('We are authenticated now!', `Hi ${user.uid}`);
        setupTodoListener(user.uid);
        store.dispatch({
          type: 'UID_UPDATE',
          payload: { uid: user.uid },
        });
      }
    });
  }, []);

  async function checkForToken() {
    let token = await SecureStore.getItemAsync('token');
    setToken(token);
    setLoading(false);
  }

  async function checkForFirebaseCredential() {
    let credential = await SecureStore.getItemAsync('firebaseCredential');
    if (credential) {
      firebaseApp
        .auth()
        .signInWithCredential(credential)
        .catch(error => {
          console.log('Auth failed and here the error' + JSON.stringify(error));
        });
    }
  }

  let saveTokenToSecureStorage = async (token, credential) => {
    SecureStore.setItemAsync('token', token);
    SecureStore.setItemAsync('firebaseCredential', credential);
    setToken(token);
  };

  let logIn = async () => {
    try {
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
        const response = await fetch(
          `https://graph.facebook.com/me?access_token=${token}`
        );
        let credential = firebaseApp.auth.FacebookAuthProvider.credential(
          token
        );
        firebaseApp
          .auth()
          .signInWithCredential(credential)
          .catch(error => {
            console.log(
              'Auth failed and here is the error ' + JSON.stringify(error)
            );
          });
        saveTokenToSecureStorage(token, credential);
      } else {
        // type === 'cancel'
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  };

  if (loading === true){
    return (
      <View style={styles.container}>
        <Text style={{fontSize : 35}}>Please wait...</Text>
      </View>
    )
  } else if (token === null){
    return (
      <View style={styles.container}>
        <View style={{height : "93%"}}>
          <Text style={styles.title}>This is a todo list =)</Text>
        </View>
        <TouchableOpacity
          style = {styles.loginButton}
          onPress = {() => logIn()}>
          <Text style = {styles.loginText}>Login with Facebook</Text>
        </TouchableOpacity>
      </View>
    )
  } else if (token){
    return (
      <Provider store={store}>
        <TodoApp/>
      </Provider>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title : {
    fontFamily : "Helvetica",
    fontSize : 25,
    color : "black",
    letterSpacing : 0,
    textAlign : "center",
    marginTop : "50%",    
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
});
