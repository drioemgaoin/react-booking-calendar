import React from 'react';
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import axios from 'axios';

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  } else {
    var error = new Error(response.statusText)
    error.response = response
    throw error
  }
};

class Booking extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      services: []
    };
  }

  componentDidMount() {
    const self = this;
    axios.get('http://localhost:3004/services')
      .then(checkStatus)
      .then(function(response) {
        self.setState({ services: response.data })
      })
      .catch(function(error) {
      });
  }

  render() {
    return (
      <div>
        <div>
          <label>Start Date:</label>
          <div>
            <Field disabled="true"
              name="startDate"
              component="input"
              type="text"
              placeholder="Start Date"
              format={value => value.format("DD/MM/YYYY HH:mm A")} />
          </div>
        </div>

        <div>
          <label>End Date:</label>
          <div>
            <Field disabled="true"
              name="endDate"
              component="input"
              type="text"
              placeholder="End Date"
              format={value => value.format("DD/MM/YYYY HH:mm A")} />
          </div>
        </div>

        <div>
          <label>Service</label>
          <div>
            <Field name="service" component="select">
              <option value="">Select a service...</option>
              {this.state.services.map(service =>
                <option key={service.id} value={service.id}>{service.name}</option>
              )}
            </Field>
          </div>
        </div>
      </div>
    );
  }
}

export default Booking
