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
  props.circles.map(circle => {
    return <Target circle={circle} removeCircle={props.removeCircle}/>
  })
  // console.log(props.circles)
  )

export default TargetsList;