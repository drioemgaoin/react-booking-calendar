import React from 'react';
import moment from 'moment';
import Slot from './Slot';

export default class Day extends React.Component {
  constructor(props) {
    super(props);
  }

  getDate(isStart) {
    const dayName = this.props.date.format('dddd').toLowerCase();
    return isStart
      ? this.props.timeSlice[dayName].start
      : this.props.timeSlice[dayName].end;
  }

  render() {
    const start = moment(this.props.date).set({ hour: 8, minute: 0, second: 0 });
    const end = moment(this.props.date).set({ hour: 20, minute: 0, second: 0 });
    const spread = moment.duration(end.diff(start)).asMinutes();

    const workStart = moment(this.props.date).set({ hour: this.getDate(true), minute: 0, second: 0 })
    const workEnd = moment(this.props.date).set({ hour: this.getDate(false), minute: 0, second: 0 })

    const bookings = this.props.bookings.filter(booking => {
        return booking.startDate.format('L') === this.props.date.format('L');
    });

    let slots = [];
    for (var i = 0; i < spread;) {

      const startDate = start.clone().add(i, 'm');
      const booking = bookings.find(booking => {
          return booking.startDate.isSame(startDate);
      });

      const endDate = booking
        ? booking.endDate
        : startDate.clone().add(this.props.timeSlot, 'm');

      if (startDate < workStart || startDate >= workEnd) {
        slots.push(<Slot key={startDate} />);
      } else {
        const numberOfSlot = endDate.diff(startDate, 'minutes') / this.props.timeSlot;
        slots.push(
          <Slot onClick={this.props.onClick}
                key={startDate}
                startDate={startDate}
                endDate={endDate}
                numberOfSlot={numberOfSlot} />
        )
      }

      i += booking
        ? moment.duration(booking.endDate.diff(booking.startDate)).asMinutes()
        : this.props.timeSlot;
    }

    return (
      <div className='rbc-day'>
        <div className='rbc-header'>
          <span>{this.props.date.format('MMM YYYY')}</span>
          <span>{this.props.date.format('DD')}</span>
          <span>{this.props.date.format('dddd')}</span>
        </div>
        {slots}
      </div>
    );
  }
}
