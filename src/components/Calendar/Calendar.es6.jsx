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

  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(initBookingsAction(this.props.bookings));
  }

  openModal(booking) {
    this.setState({ showModal: true, booking: booking });
  }

  render() {
    return (
        <div className='rbc-calendar'>
          <Modal body={this.props.children}
            show={this.state.showModal}
            booking={this.state.booking}
            header='New Booking' />

          <CalendarHeader />
          <CalendarBody bookings={this.props.bookings}
                        timeSlot={this.props.timeSlot}
                        timeSlice={this.props.timeSlice}
                        onDayClick={(booking) => this.openModal(booking)} />
        </div>
    );
  }
}

export default connect()(Calendar);
