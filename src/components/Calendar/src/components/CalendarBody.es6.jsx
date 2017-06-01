import React from 'react';
import { connect } from 'react-redux'
import moment from 'moment';
import {find} from 'lodash';

import Month from "./Month";
import Day from "./day/Day";
import Week from "./week/Week";
import {getBookingsForDay} from '../util';

let mapStateToProps = (state) => {
  return {
    view: state.calendar.view,
    date: state.calendar.date,
    bookings: state.booking.bookings.map(x => {
      x.startDate = moment.isMoment(x.startDate) ? x.startDate : moment(x.startDate);
      x.endDate = moment.isMoment(x.endDate) ? x.endDate : moment(x.endDate);
      x.isBooked = true;
      return x;
    })
  };
}

class CalendarBody extends React.Component {
  constructor(props) {
    super(props);
  }

  getDate(isStart) {
    const currentDay = this.props.date.format('dddd').toLowerCase();
    return isStart
      ? this.props.timeSlice[currentDay].start
      : this.props.timeSlice[currentDay].end;
  }

  renderContent() {
    if (this.props.view === 'day') {
      const timeSlice = find(this.props.timeSlice, x => x.day === this.props.date.format('dddd'));
      const bookings = getBookingsForDay(this.props.bookings, this.props.date);

      return (
        <div>
          <Day onClick={this.props.onDayClick}
               date={this.props.date}
               canOpenBookedSlot={this.props.canViewBooking}
               timeSlice={timeSlice}
               timeSlot={this.props.timeSlot}
               bookings={bookings}
               style={{ width: '100%' }}/>
        </div>
      )
    }

    if (this.props.view === 'month') {
      return <Month onClick={this.props.onDayClick}
                    date={this.props.date}
                    canViewBooking={this.props.canViewBooking}
                    timeSlice={this.props.timeSlice}
                    timeSlot={this.props.timeSlot}
                    bookings={this.props.bookings} />
    }

    if (this.props.view === 'week') {
      return <Week onClick={this.props.onDayClick}
                   date={this.props.date}
                   canViewBooking={this.props.canViewBooking}
                   timeSlice={this.props.timeSlice}
                   timeSlot={this.props.timeSlot}
                   bookings={this.props.bookings} />
    }
  }

  render() {
    return (<div className='rbc-body'>{this.renderContent()}</div>);
  }
}

export default connect(mapStateToProps, null)(CalendarBody)
