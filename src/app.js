import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import moment from 'moment';

import {Calendar, addBookingAction} from './index';

import Bootstrap from 'bootstrap/dist/css/bootstrap.css';

const timeSlot = 30;

const timeSlice = {
  monday: { start: 9, end: 16 },
  tuesday: { start: 10, end: 15 },
  wednesday: { start: 9, end: 16 },
  thursday: { start: 9, end: 16 },
  friday: { start: 9, end: 18 },
  saturday: { start: 10, end: 19 },
  sunday: { start: 9, end: 14 }
};

const bookings = [
  {
    startDate: moment().seconds(0).milliseconds(0).hours(10).minutes(0),
    endDate: moment().seconds(0).milliseconds(0).hours(10).minutes(30)
  },
  {
    startDate: moment().seconds(0).milliseconds(0).hours(12).minutes(0),
    endDate: moment().seconds(0).milliseconds(0).hours(13).minutes(30)
  }
];

class Booking extends React.Component {
  constructor(props) {
    super(props);

    this.state = props.booking;
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();

    const { dispatch } = this.props;
    dispatch(addBookingAction(this.state));

    this.props.onClose();
  }

  render() {
    return (
      <form id='booking' className='container-fuild' onSubmit={event => this.handleSubmit(event)}>
        <div className='form-group'>
            <label htmlFor='firstname' className='control-label'>First Name</label>
            <input ref='firstname'
              className='form-control'
              type='text'
              name='firstname'
              placeholder='First Name'
              value={this.state.firstname}
              onChange={this.handleChange.bind(this)} />
        </div>
        <div className='modal-footer text-center'>
          <input className='btn btn-primary' type='submit' value='Ok' />
          <input className='btn btn-primary' type='button' value='Cancel' onClick={(e) => this.props.onClose(e)} />
        </div>
      </form>
    );
  }
}
Booking = connect()(Booking);

ReactDOM.render(
    <Calendar bookings={bookings}
          timeSlot={timeSlot}
          timeSlice={timeSlice}
          canViewBooking={true}>
      <Booking services={[{id: 1, name: 'Pouet'}]}/>
    </Calendar>,
  document.getElementById('root')
);
