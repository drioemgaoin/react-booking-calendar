import React from 'react';
import moment from 'moment';
import _ from 'lodash';

export default class Slot extends React.Component {
  isClickable() {
      return !this.props.isBooked || this.props.canViewBooking;
  }

  handleClick(e) {
    e.preventDefault();

    const values = _.omit(this.props, ['className', 'style', 'onClick']);
    this.props.onClick(values);
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
    const adminClassName = !this.isClickable() ? 'not-clickable' : '';
    return (
      <div className={'rbc-slot ' + bookedClassName + ' ' + adminClassName}
          style={this.props.style}
          onClick={(e) => this.handleClick(e)}>
        <span>{this.props.startDate.format('HH:mm')}</span>
        <div>{this.renderBookingLink()}</div>
      </div>
    );
  }

  renderCustomContentSlot() {
    const bookedClassName = this.props.isBooked ? 'booked' : '';
    const adminClassName = !this.isClickable() ? 'not-clickable' : '';
    return (
      <div className={'rbc-slot ' + bookedClassName + ' ' + adminClassName}
          style={this.props.style}
          onClick={(e) => this.handleClick(e)}>
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
