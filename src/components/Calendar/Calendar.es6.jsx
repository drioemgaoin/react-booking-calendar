import React from 'react';
import moment from 'moment';

import CalendarHeader from "./src/components/CalendarHeader";
import CalendarBody from "./src/components/CalendarBody";
import Modal from "./src/components/Modal";

import './style/main.scss';

export default class Calendar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false
    }
  }

  openModal(e) {
    e.preventDefault();
    this.setState({ showModal: true })
  }

  closeModal(e) {
    e.preventDefault();

    this.setState({ showModal: false })
  }

  render() {
    return (
        <div className="rbc-calendar">
          <Modal body={this.props.children}
            show={this.state.showModal}
            header="New Booking"
            body={this.props.children}
            onClose={(e) => this.closeModal(e)} />

          <CalendarHeader />
          <CalendarBody onDayClick={(e) => this.openModal(e)} />
        </div>
    );
  }
}
