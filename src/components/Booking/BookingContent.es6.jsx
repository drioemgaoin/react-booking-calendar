import React from 'react';
import { connect } from 'react-redux'
import { Provider } from 'react-redux'

import * as actions from './Actions';
import store from './Store';

let createHandlers = (dispatch) => {
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

  valider(evt) {
    evt.preventDefault();
    console.log("Validate the booking!");
    this.props.close();
  }

  renderServices() {
    if (!this.props.services) {
      return null;
    }

    return (
      <select>
        {
          this.props.services.map((service) => {
            return <option key={service.data.id} value={service.data.id}>{service.data.name}</option>
          })
        }
      </select>
    );
  }

  render() {
    return (
      <form>
        <div>
          <label>Start</label>
          <label>{this.props.start}</label>
        </div>

        <div>
          <label>End</label>
          <label>{this.props.end}</label>
        </div>

        <div>
          <label>Service</label>
          {this.renderServices()}
        </div>

        <input type="submit" value="Ok" onClick={(evt) => this.valider(evt)} />
        <input type="button" value="Cancel" onClick={this.props.close} />
      </form>
    );
  }
}

export default connect(mapStateToProps, createHandlers)(BookingContent)
