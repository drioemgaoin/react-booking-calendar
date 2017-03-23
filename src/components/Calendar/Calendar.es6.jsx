import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux'

import { showModalAction } from './src/actions/modalActions';

import CalendarHeader from "./src/components/CalendarHeader";
import CalendarBody from "./src/components/CalendarBody";
import Modal from "./src/components/Modal";

import './style/main.scss';

let mapDispatchToProps = (dispatch) => {
  return {
    openBooking: () => {
    	dispatch(showModalAction('New Booking', 'OkCancel'));
    }
  }
}

class Calendar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="rbc-calendar">
        <Modal body={this.props.children} />
        <CalendarHeader />
        <CalendarBody onDayClick={this.props.openBooking} />
      </div>
    );
  }
}

export default connect(null, mapDispatchToProps)(Calendar)
