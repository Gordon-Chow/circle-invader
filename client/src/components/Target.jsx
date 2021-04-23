import React from 'react';

class Target extends React.Component {
  constructor(props) {
    super(props);
    this.state={};
    this.remove=this.remove.bind(this)
  }

  remove(e) {
    e.stopPropagation();
    // console.log('remove')
    this.props.removeCircle(this.props.circle.id)
  }

  render() {
    // console.log(this.props.circle)
    return(
      // <div className='insideboard'>
        <div className='circle' onClick={this.remove} style={
          {left: `${this.props.circle.left}%`,
           top: `${this.props.circle.top}%`
        }
        }></div>
      // </div>
    )

  }
}

export default Target;
