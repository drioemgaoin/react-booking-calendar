import React from 'react';
import moment from 'moment';
import MediaQuery from 'react-responsive';
import {find} from 'lodash';
import {getBookingsForDay} from '../util';

import Day from "./day/Day";

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
      const date = startOfWeek.clone()
      const timeSlice = find(this.props.timeSlice, x => x.day === date.format('dddd'));
      const bookings = getBookingsForDay(this.props.bookings, date);

      days.push(
        <div key={date}>
          <MediaQuery minWidth={1024}>
            <Day onClick={this.props.onClick}
              key={startOfWeek}
              date={date}
              canViewBooking={this.props.canViewBooking}
              timeSlice={timeSlice}
              timeSlot={this.props.timeSlot}
              bookings={bookings} />
          </MediaQuery>
          <MediaQuery maxWidth={1024}>
            <Day onClick={this.props.onClick}
              key={startOfWeek}
              date={date}
              canViewBooking={this.props.canViewBooking}
              timeSlice={timeSlice}
              timeSlot={this.props.timeSlot}
              bookings={bookings}
              header={<span>{date.format('DD')}</span>}
              view='portrait' />
          </MediaQuery>
        </div>
      )
    }
    while(startOfWeek.add(1, 'days').diff(endOfWeek) < 0)

    return (<div className='rbc-week'>{days}</div>)
  }
}
