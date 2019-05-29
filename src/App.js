import React, { Component } from 'react';
import Machine from './Machine';
import Box from './Machine.module.css'

class App extends Component {
  render() {
    return (
      <div>
        <Machine name="tsway" className={Box.box}/>
      </div>
    );
  }
}

export default App;
