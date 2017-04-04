import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import moment from 'moment';
import { validate } from './BookingValidation';

import { addBookingAction } from '../actions/bookingActions';

let mapDispatchToProps = (dispatch) => {
  return {
    onSubmit: (data) => {
       dispatch(addBookingAction(data));
    }
  }
}

class BookingContainer extends React.Component {
  handleSubmit(data) {
    const { dispatch } = this.props;
    dispatch(addBookingAction(data));

    this.props.onClose();
  }

  renderBooking() {
    const { handleSubmit, submitting } = this.props;
    return (
      <form id='booking' className='container-fuild' onSubmit={handleSubmit((data) => this.handleSubmit(data))}>
        { this.props.body }
        <div className='modal-footer text-center'>
          <input className='btn btn-primary' type='submit' value='Ok' disabled={submitting} />
          <input className='btn btn-primary' type='button' value='Cancel' onClick={this.props.onClose} />
        </div>
      </form>
    );
  }

  render() {
    if (this.props.body) {
      return this.renderBooking();
    }

    return null;
  }
}

BookingContainer = connect(null, mapDispatchToProps)(BookingContainer)
BookingContainer = reduxForm({
  form: 'booking',
  validate
})(BookingContainer)

export default BookingContainer
