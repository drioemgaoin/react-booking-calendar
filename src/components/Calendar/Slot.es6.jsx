import React from 'react';

export default class Slot extends React.Component {
  constructor(props) {
      super(props)
  }

  render() {
    return (<td key={this.props.time} className='slot'>{this.props.time}</td>)
  }
}

Slot.propTypes = {
  time: React.PropTypes.string,
  isBooked: React.PropTypes.bool
};
