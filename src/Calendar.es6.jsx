import React from 'react';
import CalendarHeader from "./Calendar/CalendarHeader";

export default class Calendar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <CalendarHeader />
        Calendar Content
      </div>
    );
  }
}
