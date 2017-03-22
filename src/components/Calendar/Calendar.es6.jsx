import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux'

import * as actions from './src/actions/modalActions';

import CalendarHeader from "./src/components/CalendarHeader";
import CalendarBody from "./src/components/CalendarBody";
import Modal from "./src/components/Modal";

import './style/main.scss';

let mapStateToProps = (state) => {
  return {
    view: state.view,
    date: state.date
  };
}

class Calendar extends React.Component {
  constructor(props) {
    super(props);
  }

  handleBooking(e) {
    e.preventDefault();

    const { dispatch } = this.props
    dispatch(actions.showModalAction('New Booking', 'OkCancel'));
  }

  render() {
    return (
      <div className="rbc-calendar">
        <Modal body={this.props.children} />
        <CalendarHeader />
        <CalendarBody onDayClick={(e) => this.handleBooking(e)} />
      </div>
    );
  }
}

export default connect(mapStateToProps, null)(Calendar)
