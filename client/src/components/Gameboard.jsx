import React from 'react';
import TargetsList from './TargetsList.jsx'

class Gameboard extends React.Component {
  constructor() {
    super();
    this.state = {
      ongoing: false,
      circles: [{id: 1},{id: 2},{id: 3}],
      timer: 0,
      actionbutton: 'Start'
    };
    this.actionbutton = this.actionbutton.bind(this);
    this.gameStart = this.gameStart.bind(this);
    this.gameStop = this.gameStop.bind(this);

    this.removeCircle = this.removeCircle.bind(this);
  }

  actionbutton() {
    if(this.state.actionbutton === 'Start') {
      this.gameStart();
    }
    if(this.state.actionbutton === 'Pause') {
      this.gameStop();
    }
  }

  gameStart() {
    this.setState({
      ongoing: true,
      actionbutton: 'Pause'
    })
  }
  gameStop() {
    this.setState({
      ongoing: false,
      actionbutton: 'Start'
    })
  }

  addCircle(newCircle) {
    this.setState({circles: [...this.state.circles, newCircle]})
  }

  removeCircle(targetCircle) {
    //take out the circle
    console.log('target', targetCircle)
    for(let i = 0; i < this.state.circles.length; i++) {
      // console.log(this.state.circles[i])
      if(this.state.circles[i].id === targetCircle) {
        let removed = this.state.circles.splice(i,1);
        // console.log('removed', this.state.circles[i])
        console.log('removed', removed)
      }
    }
    this.setState({circles: this.state.circles})
  }

  componentDidUpdate(prevProps) {
    if(this.Props !== prevProps) {
      while(this.state.ongoing === true) {
        var someNum = 4;
        setInterval(this.addCircle({id: someNum}),3000)
        someNum++;
        console.log(someNum)
      }
    }
  }

  render() {
    return(
      <div>
        <button onClick={this.actionbutton}>{this.state.actionbutton}</button>
        <div id='gameboard'>
          <div className='gameSpace'>
            {/* {console.log(TargetsList)} */}
            <TargetsList circles={this.state.circles} removeCircle={this.removeCircle}/>
          </div>
        </div>
      </div>
    )
  }
}


export default Gameboard;