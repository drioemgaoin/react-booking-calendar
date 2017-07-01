import React from 'react';
import moment from 'moment';
import MediaQuery from 'react-responsive';
import {find} from 'lodash';
import {getBookingsForDay} from '../../util';

import Day from "../day/Day";
import Slot from "../slot/Slot";

import './month.scss';

export default class Month extends React.Component {
  constructor(props) {
    super(props);

    this.state = { date: undefined };
  }

  handleClick(e, date) {
      this.setState({ date: date })
  }

  renderDay(date, style) {
    const timeSlice = this.props.timeSlices
      ? find(this.props.timeSlices, x => x.date.format('L') === date.format('L'))
      : {};

    const bookings = this.props.bookings
      ? getBookingsForDay(this.props.bookings, date)
      : [];

    return <Day onClick={this.props.onClick}
                date={date}
                canViewBooking={this.props.canViewBooking}
                timeSlice={timeSlice}
                timeSlot={this.props.timeSlot}
                bookings={bookings}
                style={style} />;
  }

  renderSlot(date) {
    return <Slot startDate={date}
                 canViewBooking={this.props.canViewBooking}
                 onClick={(e) => this.handleClick(e, date)}>
             <span>{this.props.date.format('DD')}</span>
           </Slot>;
  }

  render() {
    if (this.state.date) {
      return this.renderDay(this.state.date, { width: '100%' });
    } else  {
      var days = [];

      if (this.props.date) {
        const selectedDate = this.props.date;
        const daysInMonth = selectedDate.daysInMonth();

        for (var i = 1; i <= daysInMonth; i++) {
          var date = selectedDate.set('date', i).clone();
          days.push(
            <div key={date}>
              <MediaQuery minWidth={1024}>
                {this.renderDay(date)}
              </MediaQuery>
              <MediaQuery maxWidth={1024}>
                {this.renderSlot(date)}
              </MediaQuery>
            </div>
          )
        }
      }

      return (<div className='month'>{days}</div>)
    }
  }
}
