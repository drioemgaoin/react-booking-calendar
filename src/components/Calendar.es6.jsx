import React from 'react';
import moment from 'moment';

import CalendarHeader from "./Calendar/CalendarHeader";
import Day from "./Calendar/Day";

export default class Calendar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <CalendarHeader />
        <Day date={moment()} start="9" end="17:30" slot={30} />
      </div>
    );
  }
}
