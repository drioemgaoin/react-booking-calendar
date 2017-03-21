import React from 'react';
import moment from 'moment';

import CalendarHeader from "./src/components/CalendarHeader";
import CalendarBody from "./src/components/CalendarBody";
import Modal from "./src/components/Modal";

import './style/main.scss';

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
