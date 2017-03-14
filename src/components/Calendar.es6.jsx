import React from 'react';

import CalendarHeader from "./Calendar/CalendarHeader";
import Month from "./Calendar/Month";

export default class Calendar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <CalendarHeader />
        <Month />
      </div>
    );
  }
}
