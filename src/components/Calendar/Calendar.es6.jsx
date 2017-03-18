import React from 'react';
import moment from 'moment';

import CalendarHeader from "./CalendarHeader";
import CalendarBody from "./CalendarBody";
import Modal from "./Modal";

export default class Calendar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="rbc-calendar">
        <Modal body={this.props.booking} />
        <CalendarHeader />
        <CalendarBody />
      </div>
    );
  }
}
