import React, { Fragment } from 'react'
import './App.css';
// components
import InputTodo from './components/Input';
import ListTodo from './components/List';


function App() {
  return (
    <Fragment>
      <div clasName='container'>
        <InputTodo />
        <ListTodo />
      </div>
    </Fragment>
  )
}

export default App;
