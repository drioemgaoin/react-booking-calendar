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
    : <span>Book</span>
  }

  renderEmptySlot() {
      const style = { minWidth: this.props.numberOfSlot * 150 + 'px' };
      return (<div style={style} className={'rbc-slot inactive'}><div></div></div>)
  }

  renderDefaultContentSlot() {
    const bookedClassName = this.props.isBooked ? 'booked' : '';
    const style = { minWidth: this.props.numberOfSlot * 150 + 'px' };
    return (
      <div className={'rbc-slot ' + bookedClassName}
          style={style}
          colSpan={this.props.numberOfSlot}
          onClick={(e) => !this.props.isBooked && this.handleClick(e)}>
        <span>{this.props.startDate.format('HH:mm')}</span>
        <div>{this.renderBookingLink()}</div>
      </div>
    );
  }

  renderCustomContentSlot() {
    const bookedClassName = this.props.isBooked ? 'booked' : '';
    const style = { minWidth: this.props.numberOfSlot * 150 + 'px' };
    return (
      <div className={'rbc-slot ' + bookedClassName}
          style={style}
          colSpan={this.props.numberOfSlot}
          onClick={(e) => !this.props.isBooked && this.handleClick(e)}>
        {this.props.children}
      </div>
    );
  }

  renderSlot() {
      return this.props.children
        ? this.renderCustomContentSlot()
        : this.renderDefaultContentSlot();
  }

  render() {
    return this.props.startDate
        ? this.renderSlot()
        : this.renderEmptySlot();
  }
}

export default connect(mapStateToProps, null)(Slot)
