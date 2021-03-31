import React from 'react';

class Target extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      id: this.props.circle.id
    };
    this.remove=this.remove.bind(this)
  }

  remove(e) {
    e.stopPropagation();
    console.log('remove')
    this.props.removeCircle(this.props.circle.id)
    console.log('state',this.state.id)
    console.log('prop', this.props.circle.id)
  }

  render() {
    console.log(this.props.circle)
    return(
      <div className='insideboard'>
        <div className='circle' onClick={this.remove}>{this.props.circle.id}</div>
      </div>
    )

  }
}

export default Target;
