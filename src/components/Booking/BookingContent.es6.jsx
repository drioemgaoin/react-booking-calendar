import React from 'react';
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'

import * as actions from './Actions';
import store from './Store';

let createHandlers = (dispatch, state) => {
  return {
    getServices: () => {
    	dispatch(actions.getServices());
    },
    addBooking: () => {
      dispatch(actions.addBooking());
    }
  }
}

let mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps,
    services: state.services
  };
}

class BookingContent extends React.Component {
  constructor(props) {
    super(props)

    this.props.getServices();
  }

  render() {
    const { handleSubmit, pristine, submitting, addBooking } = this.props
    return (
      <form onSubmit={handleSubmit(this.props.addBooking)}>
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
          <label>Service</label>
          <div>
            <Field name="service" component="select">
              <option value="">Select a service...</option>
              {this.props.services.map(service =>
                <option key={service.data.id} value={service.data.id}>{service.data.name}</option>
              )}
            </Field>
          </div>
        </div>
      </form>
    );
  }
}

BookingContent = connect(mapStateToProps, createHandlers)(BookingContent)
BookingContent = reduxForm({ form: 'booking' })(BookingContent)

export default BookingContent
