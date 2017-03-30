import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

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
  static defaultProps: any = {
    numberOfSlot: 1
  };

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
      <td className='rbc-slot' colSpan={this.props.numberOfSlot}>
        {
          this.props.startDate &&
          (
            <div>
              <span>{this.props.startDate.format('HH:mm A')}</span>
              <div>
                  { this.renderBookingLink() }
              </div>
            </div>
          )
        }
      </td>
    )
  }
}

export default connect(mapStateToProps, null)(Slot)
