import React from 'react';
import moment from 'moment';

import CalendarHeader from "./Calendar/CalendarHeader";
import CalendarBody from "./Calendar/CalendarBody";

export default class Calendar extends React.Component {
  constructor(props) {
    super(props);

    this.onDateChanged = this.onDateChanged.bind(this);
    this.state = {
      date: moment()
    }
  }

  onDateChanged(evt, direction) {
    evt.preventDefault();

    var number = direction === 'previous' ? -1 : 1;
    if (this.state.view === 'day') {
      this.setState({ date: this.state.date.add(number, 'd')})
    }

    if (this.state.view === 'week') {
      this.setState({ date: this.state.date.add(number, 'w')})
    }

    if (this.state.view === 'month') {
      this.setState({ date: this.state.date.add(number, 'M')})
    }
  }

  render() {
    return (
      <div className="rbc-calendar">
        <CalendarHeader date={this.state.date}
          onDateChanged={this.onDateChanged} />

        <CalendarBody date={this.state.date} />
      </div>
    );
  }
}
