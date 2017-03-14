import React from 'react';

export default class Slot extends React.Component {
  constructor(props) {
      super(props)
  }

  renderBooking() {
    return this.props.isBooked
    ? <span>Booked</span>
    : <a href="#">Book</a>
  }

  render() {
    return (
      <td className='rbc-slot'>
        <span>{this.props.time}</span>
        {this.renderBooking()}
      </td>
    )
  }
}

Slot.propTypes = {
  time: React.PropTypes.string,
  isBooked: React.PropTypes.bool
};
