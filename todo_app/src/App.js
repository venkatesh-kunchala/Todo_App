import Button from '@material-ui/core/Button';
import {FormControl,InputLabel,Input} from '@material-ui/core';
import './App.css';
import React , { useState,useEffect } from 'react';
import Todo from './Todo';
import db from './firebase.js';
import firebase from 'firebase';

function App() {
  const [todos,setTodos]=useState([]);
  const [input,setInput]=useState('');

  //When the app loads, we need to listen to database and fetch new todos as they get added/removed
  useEffect(()=>{
    //this code here.... fires when the app.js loads
    db.collection('todos').orderBy('timestamp','desc').onSnapshot(snapshot => {
      //console.log(snapshot.docs.map(doc => doc.data().todo));
      setTodos(snapshot.docs.map(doc => ({id: doc.id,todo: doc.data().todo})))
    })
  },[]);

  const addTodo = (event) => {
    event.preventDefault();//will stop the refresh
    
    db.collection('todos').add({
      todo:input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });

    setInput('');//clear up the input
  }
  return (
    <div className="App">
    <form>
           <h1>Todo-App</h1>
           <FormControl>
           <InputLabel>
             Write a Todo
           </InputLabel>
           <Input value={input} onChange={event => setInput(event.target.value)}/>
         </FormControl>
         <Button disabled={!input} type="submit" onClick={addTodo} variant="contained" color="primary">
             Add todo
        </Button>
      </form>
      <ul>
      {todos.map( todo =>
        (
          <Todo text={todo}/>
        ))}
      </ul>
      
    </div>
  );
}

export default App;