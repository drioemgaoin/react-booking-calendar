import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import moment from 'moment';

import {Calendar, addBookingAction} from './index';

import Bootstrap from 'bootstrap/dist/css/bootstrap.css';

const timeSlot = 30;

// Simulate exinsting booking in paris
const localDatTime = moment().utc().zone(-120);

function getTime(hour, minute) {
  return localDatTime.clone().startOf('day').hour(hour).minute(minute).format('HH:mm');
}

const timeSlices = [
  { day: 'Monday', start: getTime(10, 0), end: getTime(18, 0) },
  { day: 'Tuesday', start: getTime(9, 30), end: getTime(16, 0) },
  { day: 'Wednesday', start: getTime(9, 30), end: getTime(17, 0) },
  { day: 'Thursday', start: getTime(10, 30), end: getTime(16, 30) },
  { day: 'Friday', start: getTime(8, 30), end: getTime(17, 30) },
  { day: 'Saturday', start: getTime(10, 30), end: getTime(16, 30) },
  { day: 'Sunday', start: getTime(10, 30), end: getTime(15, 30) }
];

const timeExceptions = [
    {
        startDate: localDatTime.clone().add(3, 'd').format('L'),
        endDate: localDatTime.clone().add(7, 'd').format('L'),
        startTime: getTime(8, 0),
        endTime: getTime(19, 0)
    }
];

const bookings = [
  {
    startDate: localDatTime.clone().seconds(0).milliseconds(0).hours(10).minutes(0),
    endDate: localDatTime.clone().seconds(0).milliseconds(0).hours(10).minutes(30)
  },
  {
    startDate: localDatTime.clone().seconds(0).milliseconds(0).hours(12).minutes(0),
    endDate: localDatTime.clone().seconds(0).milliseconds(0).hours(13).minutes(30)
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
          timeExceptions={timeExceptions}
          canViewBooking={true}>
      <Booking services={[{id: 1, name: 'Pouet'}]}/>
    </Calendar>,
  document.getElementById('root')
);
