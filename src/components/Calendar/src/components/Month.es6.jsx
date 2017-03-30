import React from 'react';
import moment from 'moment';

import Day from "./Day";

export default class Month extends React.Component {
  render() {
    const selectedDate = this.props.date;
    const daysInMonth = selectedDate.daysInMonth();

    var days = [];
    for (var i = 1; i <= daysInMonth; i++) {
      var date = selectedDate.set('date', i).clone();
      days.push(
        <Day onClick={this.props.onClick}
          key={date}
          date={date}
          timeSlice={this.props.timeSlice}
          timeSlot={this.props.timeSlot}
          bookings={this.props.bookings} />
      )
    }

    return (<div>{days}</div>)
  }
}
