import React, { useState } from 'react';
import TodoApp from './components/TodoApp'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

const initialState = {
  value: "",
  todos: []
}

function getKey(){
  return Date.now()
}

//Implement your reducers 
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CHANGE_VALUE':
      return {
        value : action.payload, 
        todos : state.todos,
      }
    case 'ADD_TODO':
      return {
        value :  " ", 
        todos : [...state.todos, {text : action.payload, key: getKey(), checked : false}],
      }
    case 'DELETE_TODO':
      return {
        value :  " ", 
        todos : state.todos.filter(thing => {
          if (thing.key !== action.payload.key){
            return true
          }
        })
      }
    case 'CHECK_TODO':
      return { 
        value : " ",
        todos : state.todos.map(thing => {
          if (thing.key === action.payload.key){
            thing.checked = true
          }
          return thing
        })
      }
  }
  return state
}

const store = createStore(reducer)

export default function App() {
  return (
    <Provider store={store}>
      <TodoApp/>
    </Provider>
  );
}
