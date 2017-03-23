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

  render() {
    var start = moment(this.props.date).set({ hour: 8, minute: 0 });
    var end = moment(this.props.date).set({ hour: 20, minute: 0 });
    var spread = moment.duration(end.diff(start)).asMinutes();

    var workStart = moment(this.props.date).set({ hour: this.getDate(true), minute: 0 })
    var workEnd = moment(this.props.date).set({ hour: this.getDate(false), minute: 0 })

    var slots = [];
    for (var i = 0; i < spread; i += this.props.timeSlot) {

      const currentSlot = start.format('HH:mm A');
      if (start < workStart || start >= workEnd) {
        slots.push(<Slot key={currentSlot} />);
      } else {
        slots.push(
          <Slot onClick={this.props.onClick}
                key={currentSlot}
                time={currentSlot} />
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
