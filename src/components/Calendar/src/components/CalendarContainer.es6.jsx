import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import Container from 'react-responsive-ux-container';

import CalendarHeader from './CalendarHeader';
import CalendarBody from './CalendarBody';
import BookingContainer from './BookingContainer';

import { initBookingsAction, addBookingAction } from '../actions/bookingActions';
import '../../../../../node_modules/react-responsive-ux-container/dist/react-responsive-container.css';

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
            <Container type='modal' visible={this.state.showModal}>
                <div className='Content'>
                    <div className='Content__Header'>
                        New Booking
                        <button type="button" onClick={(e) => this.state.showModal ? this.hideModal(e) : this.showModal(booking)}>×</button>
                    </div>
                    <div className='Content__Body'>
                        {
                          React.createElement(
                            this.props.body.type,
                            Object.assign(...this.props, {
                              booking: this.state.booking,
                              onClose: this.hideModal.bind(this)
                            })
                          )
                        }
                    </div>
                  </div>
            </Container>

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
