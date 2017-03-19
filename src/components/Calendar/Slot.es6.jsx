import React from 'react';
import { connect } from 'react-redux'

import * as actions from './Actions';

let createHandlers = (dispatch) => {
  return {
    handleBooking: () => {
    	dispatch(actions.newBookingAction());
    }
  }
}

class Slot extends React.Component {
  constructor(props) {
      super(props)
  }

  renderSlot() {
    return this.props.isBooked
    ? <span>Booked</span>
    : <a onClick={this.props.handleBooking}>Book</a>
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

export default connect(null, createHandlers)(Slot)
