import React from 'react';
import Gameboard from './Gameboard.jsx';
import Howto from './Howto.jsx';

class App extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div>
      <Gameboard/>
      <Howto/>
      </div>
    )
  }
}

export default App;