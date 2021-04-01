import React from 'react';
import TargetsList from './TargetsList.jsx'

class Gameboard extends React.Component {
  constructor() {
    super();
    this.state = {
      ongoing: false,
      circles: [],
      timer: 0,
      actionbutton: 'Start',
      idHolder: 1,
      goTime: 'null',
      mode:'Custom',
      timeleft: 10,
      gametimer: 'null'
    };
    this.actionbutton = this.actionbutton.bind(this);
    this.gameStart = this.gameStart.bind(this);
    this.gameStop = this.gameStop.bind(this);
    this.addCircle = this.addCircle.bind(this);
    this.removeCircle = this.removeCircle.bind(this);
    this.timerAdd = this.timerAdd.bind(this);
    this.gamereset = this.gamereset.bind(this);
    this.changeMode = this.changeMode.bind(this);
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
    if(this.state.timeleft !== 0) {
      this.setState({
        ongoing: true,
        actionbutton: 'Pause'
      })
      this.timerAdd();
    }
  }

  gameStop() {
    this.setState({
      ongoing: false,
      actionbutton: 'Start'
    })
    clearInterval(this.state.goTime)
    clearInterval(this.state.gametimer)
  }

  addCircle() {
    var newCircle = {
      id: this.state.idHolder,
      left: Math.floor(Math.random()*90),
      top: Math.floor(Math.random()*85)
    }
    this.setState({
      circles: [...this.state.circles, newCircle],
      idHolder: this.state.idHolder + 1
    })
  }

  timerAdd() {
    var mode = {Easy: 1000, Normal: 500, Hard: 350, Custom: 60000}
    var goTime = setInterval(function() {
      this.addCircle()
    }.bind(this), mode[this.state.mode])

    var timetick = setInterval(function() {
      // console.log(this.state.timeleft)
      // this.state.timeleft = this.state.timeleft - 1
      this.setState({timeleft: this.state.timeleft-1})
      if(this.state.timeleft === 0) {
        this.gameStop();
      }
    }.bind(this), 1000)
    this.setState({
      goTime: goTime,
      gametimer: timetick
    })
  }

  removeCircle(targetCircle) {
    if(this.state.ongoing === true){
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
      //take out the circle
    }

  }

  gamereset() {
    this.gameStop()
    this.setState({
      circles: [],
      idHolder: 1,
      timeleft: 10
    })
  }

  changeMode(e) {
    console.log(e.target.outerText)
    this.setState({mode: e.target.outerText})

  }
  // componentDidUpdate(prevProps) {
  //   if(this.Props !== prevProps) {
  //     while(this.state.ongoing === true) {
  //       var someNum = 4;
  //       setInterval(this.addCircle({id: someNum}),3000)
  //       someNum++;
  //       console.log(someNum)
  //     }
  //   }
  // }

  render() {
    return(
      <div>
        <div id='buttonholderholder'>
          <div id='buttonholder'>
        <div id='actionbutton' onClick={this.actionbutton}>{this.state.actionbutton}</div>
        <div id='resetbutton' onClick={this.gamereset}>Reset</div>
        <div id='modedisplay'>Mode: {this.state.mode}</div>
        <div> Time Remaining: {this.state.timeleft}</div>
        <div className='modebutton' onClick={this.changeMode}>Easy</div>
        <div className='modebutton' onClick={this.changeMode}>Normal</div>
        <div className='modebutton' onClick={this.changeMode}>Hard</div>
          </div>
        </div>
        <div id='gameboard'>
          <div className='gameSpace'>
            {/* {console.log(TargetsList)} */}
            <TargetsList circles={this.state.circles} ongoing={this.state.ongoing} removeCircle={this.removeCircle}/>
          </div>
        </div>
      </div>
    )
  }
}


export default Gameboard;

