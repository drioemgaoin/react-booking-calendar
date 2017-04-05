import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { Modal } from 'react-bootstrap';

import CalendarHeader from './CalendarHeader';
import CalendarBody from './CalendarBody';
import BookingContainer from './BookingContainer';

import { initBookingsAction } from '../actions/bookingActions';

class CalendarContainer extends React.Component {
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

  openModal(booking) {
      this.setState({ showModal: true, booking: booking });
  }

  hideModal(e) {
      if (e) {
        e.preventDefault();
      }

      this.setState({ showModal: false, booking: {}});
  }

  render() {
    return (
        <div className='rbc-calendar modal-container'>
            <Modal
              show={this.state.showModal}
              onHide={() => this.hideModal()}
              container={this}
              aria-labelledby='booking-modal'>
              <Modal.Header closeButton>
                <Modal.Title id='booking-modal'>New Booking</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                  <BookingContainer body={this.props.body}
                                    bookings={this.props.bookings}
                                    timeSlice={this.props.timeSlice}
                                    initialValues={this.state.booking}
                                    onClose={(e) => this.hideModal(e)} />
              </Modal.Body>
            </Modal>

          <CalendarHeader />
          <CalendarBody bookings={this.props.bookings}
                        timeSlot={this.props.timeSlot}
                        timeSlice={this.props.timeSlice}
                        isAdministrator={this.props.isAdministrator}
                        onDayClick={(booking) => this.openModal(booking)} />
        </div>
    );
  }
}

export default connect()(CalendarContainer);
