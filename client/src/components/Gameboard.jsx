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
      mode:'Normal',
      timeleft: 10,
      gametimer: 'null',
      circlesRemoved: 0,
      freshgame: true,
      gameOver: false,
      gameStatus: 'Setup',
      prevSelectedTime: '',
    };
    this.actionbutton = this.actionbutton.bind(this);
    this.gameStart = this.gameStart.bind(this);
    this.gameStop = this.gameStop.bind(this);
    this.addCircle = this.addCircle.bind(this);
    this.removeCircle = this.removeCircle.bind(this);
    this.timerAdd = this.timerAdd.bind(this);
    this.gamereset = this.gamereset.bind(this);
    this.changeMode = this.changeMode.bind(this);
    this.changeTimer = this.changeTimer.bind(this);
    this.circleOverflow = this.circleOverflow.bind(this);
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
    if(this.state.gameOver === false) {
      if(this.state.timeleft !== 0) {
        this.setState({
          ongoing: true,
          actionbutton: 'Pause',
          freshgame: false,
          gameStatus: 'In Progress'
        })
        this.timerAdd();
      }
    }
  }


  gameStop() {
    this.setState({
      ongoing: false,
      actionbutton: 'Start',
      gameStatus: 'Paused'
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
    var mode = {Easy: 1000, Normal: 500, Hard: 350, Custom: 100}
    var goTime = setInterval(function() {
      this.addCircle()
      this.circleOverflow()
    }.bind(this), mode[this.state.mode])

    var timetick = setInterval(function() {
      // console.log(this.state.timeleft)
      // this.state.timeleft = this.state.timeleft - 1
      this.setState({timeleft: Math.round((this.state.timeleft-.1)*10)/10})
      if(this.state.timeleft === 0) {
        this.gameStop();
        this.setState({gameStatus: 'Times up! Great work!'})
      }
    }.bind(this), 100)
    this.setState({
      goTime: goTime,
      gametimer: timetick
    })
  }

  removeCircle(targetCircle) {
    if(this.state.ongoing === true){
      // console.log('target', targetCircle)
      for(let i = 0; i < this.state.circles.length; i++) {
        // console.log(this.state.circles[i])
        if(this.state.circles[i].id === targetCircle) {
          let removed = this.state.circles.splice(i,1);
          // console.log('removed', this.state.circles[i])
          // console.log('removed', removed)
        }
      }
      this.setState({
        circles: this.state.circles,
        circlesRemoved: this.state.circlesRemoved + 1
      })
      //take out the circle
    }

  }

  gamereset() {
    this.gameStop()
    this.setState({
      circles: [],
      idHolder: 1,
      timeleft:this.state.prevSelectedTime,
      circlesRemoved: 0,
      freshgame: true,
      gameOver: false,
      gameStatus: 'Setup'
    })
  }

  changeMode(e) {
    if(this.state.freshgame === true) {
      // console.log(e.target.outerText)
      this.setState({mode: e.target.outerText})
    } else {
      console.log('Finish the game first')
    }
  }

  changeTimer(e) {
    if(this.state.freshgame === true) {
      // console.log(e.target.outerText)
      this.setState({
      timeleft: Number(e.target.outerText.slice(0,e.target.outerText.length-1)),
      prevSelectedTime: Number(e.target.outerText.slice(0,e.target.outerText.length-1))
      })
    }
  }

  circleOverflow() {
    // console.log('overflowstate', this.state.circles.length)
    if(this.state.mode === 'Easy') {
      let threshold = 5;
      if(this.state.circles.length > threshold) {
        this.gameStop();
        this.setState({
          gameOver: true,
          gameStatus: `Circle Overflow. Need to keep the circle count below ${threshold+1}`
        })
      }
    }
    if(this.state.mode === 'Normal') {
      let threshold = 7;
      if(this.state.circles.length > threshold) {
        this.gameStop();
        this.setState({
          gameOver: true,
          gameStatus: `Circle Overflow. Need to keep the circle count below ${threshold+1}`
        })
      }
    }
    if(this.state.mode === 'Hard') {
      let threshold = 10;
      if(this.state.circles.length > threshold) {
        this.gameStop();
        this.setState({
          gameOver: true,
          gameStatus: `Circle Overflow. Need to keep the circle count below ${threshold+1}`
        })
      }
    }
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
          <div className='buttonholder'>
            <div id='actionbutton' onClick={this.actionbutton}>{this.state.actionbutton}</div>
            <div id='resetbutton' onClick={this.gamereset}>Reset</div>
          <div id='gameinfoholderholder'>
            <div id='gameinfoholder'>
              <div id='modedisplay'>Mode: {this.state.mode}</div>
              <div> Time Remaining: {this.state.timeleft}</div>
              <div> Circles clicked: {this.state.circlesRemoved}</div>
            </div>
          </div>
        <div id='gamestatus'>Game Status: {this.state.gameStatus}</div>
        </div>
          <div id='selectedMode'> Selected: {this.state.mode}</div>
        </div>
        <div id='gameboard'>
          <div className='gameSpace'>
            {/* {console.log(TargetsList)} */}
            <TargetsList circles={this.state.circles} ongoing={this.state.ongoing} removeCircle={this.removeCircle}/>
          </div>
          <div id='settingsholder'>
            <div id='settingheader'>Settings</div>
            <div className='modebutton' onClick={this.changeMode}>Easy</div>
            <div className='modebutton' onClick={this.changeMode}>Normal</div>
            <div className='modebutton' onClick={this.changeMode}>Hard</div>
            <div id='timerheader'>Timers</div>
            <div className='modebutton' onClick={this.changeTimer}> 15s </div>
            <div className='modebutton' onClick={this.changeTimer}> 30s </div>
            <div className='modebutton' onClick={this.changeTimer}> 60s </div>
          </div>
        </div>
      </div>
    )

  }
}


export default Gameboard;

