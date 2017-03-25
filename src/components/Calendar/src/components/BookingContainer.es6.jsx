import React from 'react';
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'

import { addBookingAction } from '../actions/bookingActions';


let mapDispatchToProps = (dispatch) => {
  return {
    addBooking: () => {
    	dispatch(addBookingAction());
    }
  }
}

class BookingContainer extends React.Component {

  renderDefaultBooking() {
    return (
      <form onSubmit={this.props.addBooking}>
        <div>
          <label>Start</label>
          <div>
            <Field name="startDate" component="input" type="text" placeholder="Start"/>
          </div>
        </div>

        <div>
          <label>End</label>
          <div>
            <Field name="endDate" component="input" type="text" placeholder="End"/>
          </div>
        </div>

        <div>
          <input type="submit" value="Ok" />
          <input type="button" value="Cancel" onClick={this.props.onClose} />
        </div>
      </form>
    )
  }

  renderBooking() {
    <form onSubmit={this.props.addBooking}>
      { this.props.body }
      <div>
        <input type="submit" value="Ok" />
        <input type="button" value="Cancel" onClick={this.props.onClose} />
      </div>
    </form>
  }

  render() {
    if (this.props.body) {
      return this.renderBooking();
    } else {
      return this.renderDefaultBooking();
    }
  }
}

BookingContainer = connect(null, mapDispatchToProps)(BookingContainer)
BookingContainer = reduxForm({ form: 'booking' })(BookingContainer)

export default BookingContainer
