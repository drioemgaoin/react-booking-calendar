import React from 'react';
import moment from 'moment';

import CalendarHeader from "./Calendar/CalendarHeader";
import CalendarBody from "./Calendar/CalendarBody";
import Modal from "./Calendar/Modal";

export default class Calendar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="rbc-calendar">
        <Modal />
        <CalendarHeader />
        <CalendarBody />
      </div>
    );
  }
}
