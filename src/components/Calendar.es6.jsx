import React from 'react';
import moment from 'moment';

import CalendarHeader from "./Calendar/CalendarHeader";
import CalendarBody from "./Calendar/CalendarBody";

export default class Calendar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="rbc-calendar">
        <CalendarHeader date={moment()} />
        <CalendarBody />
      </div>
    );
  }
}
