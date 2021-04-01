import React from 'react';
import Target from './Target.jsx'

// class TargetsList extends React.Component {
//   constructor() {
//     super();
//     this.state = {};
//   }

//   render() {
//     return(
//       this.props.circles.map(circle => {
//           <Target circle={circle}/>
//         })
//         // console.log(props.circles)

//     )
//   }
// }

var TargetsList = (props) => (
  <div className='insideboard'>

    {props.circles.map((circle,i) => {
      return <Target key={i} circle={circle} removeCircle={props.removeCircle} ongoing={props.ongoing}/>
    })
    // console.log(props.circles)
  }
  </div>
  )

export default TargetsList;