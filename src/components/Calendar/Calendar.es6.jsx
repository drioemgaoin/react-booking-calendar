import React from 'react';
import moment from 'moment';
import { Provider } from 'react-redux';

import CalendarHeader from './src/components/CalendarHeader';
import CalendarBody from './src/components/CalendarBody';
import Modal from './src/components/Modal';
import store from './src/Store';

import './style/main.scss';

let mapStateToProps = (state) => {
  return {
    showModal: state.modal.show,
    booking: state.booking.booking
  }
}

export default class Calendar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      booking: {}
    }
  }

  openModal(booking) {
    this.setState({ showModal: true, booking: booking });
  }

  render() {
    return (
      <Provider store={store}>
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
      </Provider>
    );
  }
}

// export default connect(mapStateToProps, null)(Slot)
