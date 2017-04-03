import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { Authorization } from '../authorization/Authorization';
import { openBookingAction } from '../actions/bookingActions';

let mapStateToProps = (state, ownProps) => {
  const booking = state.booking.bookings.find(item => {
    if (item.startDate && ownProps.startDate)
    {
        return item.startDate.isSame(ownProps.startDate) ? item : undefined;
    }

    return undefined;
  });

  return booking
    ? booking
    : {
        isBooked: false,
        startDate: ownProps.startDate,
        endDate: ownProps.endDate
  };
}

@Authorization()
class Slot extends React.Component {
  static defaultProps: any = {
    numberOfSlot: 1
  };

  isClickable() {
      return !this.props.isBooked || this.isPermitted('admin');
  }

  handleClick(e) {
    e.preventDefault();
    this.props.onClick(this.props);
  }

  renderBookingLink() {
    return this.props.isBooked
    ? <span>Booked</span>
    : <span>Book</span>
  }

  renderEmptySlot() {
      return (<div style={this.props.style} className={'rbc-slot inactive'}><div></div></div>)
  }

  renderDefaultContentSlot() {
    const bookedClassName = this.props.isBooked ? 'booked' : '';
    return (
      <div className={'rbc-slot ' + bookedClassName}
          style={this.props.style}
          colSpan={this.props.numberOfSlot}
          onClick={(e) => this.isClickable() && this.handleClick(e)}>
        <span>{this.props.startDate.format('HH:mm')}</span>
        <div>{this.renderBookingLink()}</div>
      </div>
    );
  }

  renderCustomContentSlot() {
    const bookedClassName = this.props.isBooked ? 'booked' : '';
    return (
      <div className={'rbc-slot ' + bookedClassName}
          style={this.props.style}
          colSpan={this.props.numberOfSlot}
          onClick={(e) => this.isClickable() && this.handleClick(e)}>
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
