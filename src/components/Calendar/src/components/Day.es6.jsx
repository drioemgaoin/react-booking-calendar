import React from 'react';
import moment from 'moment';
import Slot from "./Slot";

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

  getBooking(date) {
    const booking = this.bookings.map((booking) => {
      return booking.date.format(format) === this.props.date.current.format(format);
    });

    return booking
      ? booking
      : { date: date }
  }

  render() {
    var start = moment(this.props.date).set({ hour: 8, minute: 0, second: 0 });
    var end = moment(this.props.date).set({ hour: 20, minute: 0, second: 0 });
    var spread = moment.duration(end.diff(start)).asMinutes();

    var workStart = moment(this.props.date).set({ hour: this.getDate(true), minute: 0, second: 0 })
    var workEnd = moment(this.props.date).set({ hour: this.getDate(false), minute: 0, second: 0 })

    var slots = [];
    for (var i = 0; i < spread; i += this.props.timeSlot) {

      const startDate = start.clone();
      const endDate = startDate.clone().add(this.props.timeSlot, 'm')
      if (start < workStart || start >= workEnd) {
        slots.push(<Slot key={startDate} />);
      } else {
        slots.push(
          <Slot onClick={this.props.onClick}
                key={startDate}
                startDate={startDate}
                endDate={endDate} />
        )
      }

      start = start.add(this.props.timeSlot, 'm');
    }

    return (
      <tr className='rbc-day'>
        <td className='rbc-header'>
          <span>{this.props.date.format("MMM YYYY")}</span>
          <span>{this.props.date.format("DD")}</span>
          <span>{this.props.date.format("dddd")}</span>
        </td>
        {slots}
      </tr>
    );
  }
}
