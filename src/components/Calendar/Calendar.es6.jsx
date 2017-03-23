import React from 'react';
import moment from 'moment';
import { Provider } from 'react-redux';

import CalendarHeader from "./src/components/CalendarHeader";
import CalendarBody from "./src/components/CalendarBody";
import Modal from "./src/components/Modal";
import store from './src/Store';

import { addBookingAction } from './src/actions/bookingActions'

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
      <Provider store={store}>
        <div className="rbc-calendar">
          <Modal body={this.props.children}
            show={this.state.showModal}
            header="New Booking"
            body={this.props.children}
            onClose={(e) => this.closeModal(e)} />

          <CalendarHeader />
          <CalendarBody timeSlot={this.props.timeSlot}
                        timeSlice={this.props.timeSlice}
                        onDayClick={(e) => this.openModal(e)} />
        </div>
      </Provider>
    );
  }
}
