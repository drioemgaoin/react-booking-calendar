import React from 'react';

export default class Slot extends React.Component {
  constructor(props) {
      super(props)
  }

  onBookingClick(e) {
    e.preventDefault();

    this.props.dispatch(actions.showModalAction('New Booking', 'OkCancel'));
  }

  renderSlot() {
    return this.props.isBooked
    ? <span>Booked</span>
    : <a onClick={this.props.onClick}>Book</a>
  }

  render() {
    return (
      <td className='rbc-slot'>
        <span>{this.props.time}</span>
        {this.renderSlot()}
      </td>
    )
  }
}
