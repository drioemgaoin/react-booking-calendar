import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import Slot from './Slot';
import { getStyle } from '../Style';
import {find} from 'lodash';

let mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps,
    bookings: state.booking.bookings
  };
}

class Day extends React.Component {
  static defaultProps = {
      view: 'landscape'
  }

  getWorkTime(isStart) {
    const dayName = this.props.date.format('dddd').toLowerCase();
    const time = find(this.props.timeSlice, x => x.day.toLowerCase() === dayName.toLowerCase());
    if (time) {
        const values = (isStart ? time.start : time.end).split(':');
        return moment(this.props.date).set({ hour: +values[0], minute: +values[1], second: 0 });
    }

    return moment(this.props.date).set({ hour: (isStart ? 8 : 20), minute: 0, second: 0 });
  }

  createSlot(key, booking, numberOfColumn, numberOfSlot) {
      const style = this.props.style
          ? this.props.style
          : getStyle(this.props.view, numberOfColumn, numberOfSlot);

      return <Slot onClick={this.props.onClick}
                   key={key}
                   style={style}
                   canViewBooking={this.props.canViewBooking}
                   {...booking} />
  }

  createBooking(start, end) {
      return {
        isBooked: false,
        startDate: start,
        endDate: end
      }
  }

  render() {
    const start = moment(this.props.date).set({ hour: 8, minute: 0, second: 0 });
    const end = moment(this.props.date).set({ hour: 20, minute: 0, second: 0 });
    const spread = moment.duration(end.diff(start)).asMinutes();

    const workStart = this.getWorkTime(true);
    const workEnd = this.getWorkTime(false);

    const numberOfColumn = spread /  this.props.timeSlot;

    const bookings = this.props.bookings.filter(booking => {
        return booking.startDate.local().format('L') === this.props.date.format('L');
    });

    let slots = [];
    let currentDate = start.clone();
    while(currentDate.isBefore(end)) {

      const startDate = currentDate.clone();
      let endDate = startDate.clone().add(this.props.timeSlot, 'm');

      let booking = bookings.find(booking => { return booking.startDate.local().isSame(startDate); });

      if (booking) {
        const bookingEndDate = booking.endDate.local();

        // Booking slot
        const numberOfSlot = bookingEndDate.diff(startDate, 'minutes') / this.props.timeSlot;
        slots.push(this.createSlot(slots.length, booking, numberOfColumn, numberOfSlot));

        const difference = bookingEndDate.diff(endDate, 'minutes') % this.props.timeSlot;
        if (difference !== 0) {
            const numberOfSlot = (bookingEndDate.isBefore(endDate)
                ? endDate.diff(bookingEndDate, 'minutes')
                : difference
            ) / this.props.timeSlot;

            const newEndDate = bookingEndDate.isBefore(endDate)
                ? endDate
                : bookingEndDate.clone().add(difference, 'm');
            booking = this.createBooking(bookingEndDate, newEndDate);
            slots.push(this.createSlot(slots.length, booking, numberOfColumn, numberOfSlot));

            endDate = newEndDate
        } else {
            endDate = bookingEndDate;
        }

      } else {
        booking = (startDate < workStart || startDate >= workEnd)
            ? {}                                        // inactive slot
            : this.createBooking(startDate, endDate);   // unbooked slot
        slots.push(this.createSlot(slots.length, booking, numberOfColumn, 1));
      }

      currentDate = endDate;
    }

    return (
      <div className='rbc-day'>
        {this.props.header ? (<div>{this.props.header}</div>) : (
          <div>
            <span>{this.props.date.format('MMM YYYY')}</span>
            <span>{this.props.date.format('DD')}</span>
            <span>{this.props.date.format('dddd')}</span>
          </div>
        )}
        {slots}
      </div>
    );
  }
}

export default connect(mapStateToProps, null)(Day)
