import React from 'react';
import { connect } from 'react-redux'

let createHandlers = (dispatch) => {
  return {
    cancelBooking: () => {
    	dispatch(actions.cancelBookingAction());
    },
    validerBooking: () => {
    	dispatch(actions.validerBookingAction());
    }
  }
}

class Booking extends React.Component {
  constructor(props) {
    super(props)
  }

  valider(evt) {
    evt.preventDefault();
    console.log("Validate the booking!");
    this.props.close();
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

        <input type="submit" value="Ok" onClick={(evt) => this.valider(evt)} />
        <input type="button" value="Cancel" onClick={this.props.close} />
      </form>
    );
  }
}

export default connect(null, createHandlers)(Booking)
