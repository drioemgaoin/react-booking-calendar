import React from 'react';
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { Accordion, Panel } from 'react-bootstrap'
import axios from 'axios';
import _ from 'lodash';

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

  renderPanel(category, services) {
    return (
      <Panel key={category} header={category + ' Services'} eventKey={category}>
        <ul>
        {
          services.map((service) => {
            return <li key={service.id}>{service.name}</li>
          })
        }
        </ul>
      </Panel>
    )
  }

  render() {
    const panels = _.chain(this.state.services)
      .groupBy('category')
      .toPairs()
      .map((values, key) => {
        return this.renderPanel(values[0], values[1])
      })
      .value();

    const styles = { padding: '10px 0px' }
    return (
      <div style={styles}>
        <div className='form-group row'>
          <label className='col-sm-2 col-form-label'>First Name:</label>
          <div className="col-sm-10">
            <Field name="firstName"
              className='form-control'
              component="input"
              type="text"
              placeholder="First Name" />
          </div>
        </div>

        <div className='form-group row'>
          <label className='col-sm-2 col-form-label'>Last Name:</label>
          <div className="col-sm-10">
            <Field name="lastName"
              className='form-control'
              component="input"
              type="text"
              placeholder="Last Name" />
          </div>
        </div>

        <div className='form-group row'>
          <label className='col-sm-2 col-form-label'>Email:</label>
          <div className="col-sm-10">
            <Field name="email"
              className='form-control'
              component="input"
              type="text"
              placeholder="Email" />
          </div>
        </div>

        <div className='form-group row'>
          <label className='col-sm-2 col-form-label'>Phone Number:</label>
          <div className="col-sm-10">
            <Field name="phone"
              className='form-control'
              component="input"
              type="text"
              placeholder="Phone Number" />
          </div>
        </div>

        <Accordion>{panels}</Accordion>
      </div>
    );
  }
}

export default Booking
