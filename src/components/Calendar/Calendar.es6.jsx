import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';

import CalendarHeader from './src/components/CalendarHeader';
import CalendarBody from './src/components/CalendarBody';
import Modal from './src/components/Modal';

import { initBookingsAction } from './src/actions/bookingActions';

import './style/main.scss';

class Calendar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      booking: {}
    }
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(initBookingsAction(this.props.bookings));
  }

  render() {
    return (
        <div className='rbc-calendar'>
          <Modal ref='modal'
            body={this.props.body}
            timeSlice={this.props.timeSlice}
            bookings={this.props.bookings}
            header='New Booking' />

          <CalendarHeader />
          <CalendarBody bookings={this.props.bookings}
                        timeSlot={this.props.timeSlot}
                        timeSlice={this.props.timeSlice}
                        isAdministrator={this.props.isAdministrator}
                        onDayClick={(booking) => this.refs.modal.openModal(booking)} />
        </div>
    );
  }
}

export default connect()(Calendar);
