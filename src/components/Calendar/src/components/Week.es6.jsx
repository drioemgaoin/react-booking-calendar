import React from 'react';
import moment from 'moment';

import Day from "./Day";

export default class Week extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var startOfWeek = this.props.date.clone().startOf('isoweek');
    var endOfWeek   = this.props.date.clone().endOf('isoweek');

    var days = [];
    do
    {
      var date = startOfWeek.clone()
      days.push(
        <Day onClick={this.props.onClick}
          key={startOfWeek}
          date={date}
          timeSlice={this.props.timeSlice}
          timeSlot={this.props.timeSlot}
          bookings={this.props.bookings} />
      )
    }
    while(startOfWeek.add(1, 'days').diff(endOfWeek) < 0)

    return (<table><tbody>{days}</tbody></table>)
  }
}
