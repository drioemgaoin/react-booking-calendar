import React from 'react';
import moment from 'moment';
import bem from 'bem-classname';
import _ from 'lodash';

import './slot.scss';

export default class Slot extends React.Component {
  isClickable() {
      return !this.props.isBooked || this.props.canViewBooking;
  }

  handleClick(e) {
    e.preventDefault();

    if (this.props.onClick) {
      this.props.onClick(this.props.startDate);
    }
  }

  renderBookingLink() {
    return this.props.isBooked
    ? <span>Booked</span>
    : <span>Book</span>;
  }

  renderEmptySlot() {
      const className = bem('slot', ['inactive']);
      return (
        <div style={this.props.style} className={className}></div>
      )
  }

  renderSlot() {
    const isBookedModifier = bem('slot', [this.props.isBooked ? 'booked' : 'free']);
    const isClickableModifier = bem('slot', [this.isClickable() ? 'clickable' : '']);
    return (
      <div className={isBookedModifier + ' ' + isClickableModifier}
          style={this.props.style}
          onClick={(e) => this.handleClick(e)}>
        {
          this.props.children && this.props.children
        }
        {
          !this.props.children &&
          (
            [
              <span>{this.props.startDate.format('HH:mm')}</span>,
              <div>{this.renderBookingLink()}</div>
            ]
          )
        }
      </div>
    );
  }

  render() {
    return this.props.startDate
        ? this.renderSlot()
        : this.renderEmptySlot();
  }
}
