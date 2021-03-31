import React from 'react';

class HowTo extends React.Component {
  constructor() {
    super()
    this.state = {};
  }

  render() {
    return(
      <div id='instructionSpace'>
      <div className='instructionsheader'>How to play</div>
      <div className='instructions'>Some words</div>
    </div>
    )
  }
}

export default HowTo;