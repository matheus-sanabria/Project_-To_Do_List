import React, { Fragment } from 'react'
import './App.css';
// components
import InputTodo from './components/Input';


function App() {
  return (
    <Fragment>
      <div clasName='container'>
        <InputTodo></InputTodo>
      </div>
    </Fragment>
  )
}

export default App;
