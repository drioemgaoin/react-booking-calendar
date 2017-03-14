import React from 'react';

import CalendarHeader from "./Calendar/CalendarHeader";
import CalendarBody from "./Calendar/CalendarBody";

export default class Calendar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <CalendarHeader />
        <CalendarBody />
      </div>
    );
  }
}
