import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import Slot from './Slot';
import { getStyle } from '../Style';

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
    return isStart
      ? this.props.timeSlice[dayName].start
      : this.props.timeSlice[dayName].end;
  }

  createSlot(key, booking, numberOfColumn, numberOfSlot) {
      const style = this.props.style
          ? this.props.style
          : getStyle(this.props.view, numberOfColumn, numberOfSlot);

      return <Slot onClick={this.props.onClick}
                   key={key}
                   style={style}
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

    const workStart = moment(this.props.date).set({ hour: this.getWorkTime(true), minute: 0, second: 0 })
    const workEnd = moment(this.props.date).set({ hour: this.getWorkTime(false), minute: 0, second: 0 })

    const numberOfColumn = spread /  this.props.timeSlot;

    const bookings = this.props.bookings.filter(booking => {
        return booking.startDate.format('L') === this.props.date.format('L');
    });

    let slots = [];
    let currentDate = start.clone();
    while(currentDate.isBefore(end)) {

      const startDate = currentDate.clone();
      let endDate = startDate.clone().add(this.props.timeSlot, 'm');

      let booking = bookings.find(booking => { return booking.startDate.isSame(startDate); });

      if (booking) {
        // Booking slot
        const numberOfSlot = booking.endDate.diff(startDate, 'minutes') / this.props.timeSlot;
        slots.push(this.createSlot(slots.length, booking, numberOfColumn, numberOfSlot));

        const difference = booking.endDate.diff(endDate, 'minutes') % this.props.timeSlot;
        if (difference !== 0) {
            const numberOfSlot = (booking.endDate.isBefore(endDate)
                ? endDate.diff(booking.endDate, 'minutes')
                : difference
            ) / this.props.timeSlot;

            const newEndDate = booking.endDate.isBefore(endDate)
                ? endDate
                : booking.endDate.clone().add(difference, 'm');
            booking = this.createBooking(booking.endDate, newEndDate);
            slots.push(this.createSlot(slots.length, booking, numberOfColumn, numberOfSlot));

            endDate = newEndDate
        } else {
            endDate = booking.endDate;
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
