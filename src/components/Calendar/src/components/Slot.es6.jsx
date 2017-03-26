import React from 'react';
import { connect } from 'react-redux';

import { openBookingAction } from '../actions/bookingActions';

let mapStateToProps = (state, ownProps) => {
  const booking = state.booking.bookings.find(booking => {
    if (booking.startDate && ownProps.startDate)
    {
        return booking.startDate.isSame(ownProps.startDate) ? booking : null;
    }

    return null;
  });

  return booking
    ? booking
    : {
      booking: {
        isBooked: false,
        startDate: ownProps.startDate,
        endDate: ownProps.endDate
    }
  };
}

class Slot extends React.Component {
  constructor(props) {
      super(props)
  }

  handleClick(e) {
    e.preventDefault();
    this.props.onClick(this.props.booking);
  }

  renderBookingLink() {
    return this.props.isBooked
    ? <span>Booked</span>
    : <a onClick={(e) => this.handleClick(e)}>Book</a>
  }

  render() {
    return (
      <td className='rbc-slot'>
        {
          this.props.startDate &&
          (
            <div>
              <span>{this.props.startDate.format('HH:mm A')}</span>
              { this.renderBookingLink() }
            </div>
          )
        }
      </td>
    )
  }
}

export default connect(mapStateToProps, null)(Slot)
