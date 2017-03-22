import React from 'react';
import { connect } from 'react-redux'

import * as viewActions from '../actions/viewActions';
import * as dateActions from '../actions/dateActions';

let createHandlers = (dispatch) => {
  return {
    handleDayView: () => {
    	dispatch(viewActions.dayViewAction());
    },
    handleWeekView: () => {
    	dispatch(viewActions.weekViewAction());
    },
    handleMonthView: () => {
    	dispatch(viewActions.monthViewAction());
    },
    handlerNextDate: () => {
      dispatch(dateActions.nextDateAction());
    },
    handlerPreviousDate: () => {
      dispatch(dateActions.previousDateAction());
    }
  }
}

let mapStateToProps = (state) => {
  return {
    view: state.view,
    date: state.date
  };
}

class CalendarHeader extends React.Component {
  constructor(props) {
    super(props);
  }

  renderDate() {
    if (this.props.view.type === 'day') {
      return this.props.date.current.format("MMMM DD YYYY")
    }

    if (this.props.view.type === 'week') {
      var startOfWeek = this.props.date.current.clone().startOf('isoweek');
      var endOfWeek   = this.props.date.current.clone().endOf('isoweek');
      return startOfWeek.format("DD MMM") + " - " + endOfWeek.format("DD MMM")
    }

    if (this.props.view.type === 'month') {
      return this.props.date.current.format("MMMM YYYY")
    }
  }

  render() {
    return (
      <div className="rbc-header">
        <div className="rbc-date">
          <button onClick={this.props.handlerPreviousDate}>Previous</button>
          <span>{this.renderDate()}</span>
          <button onClick={this.props.handlerNextDate}>Next</button>
        </div>

        <div className="rbc-views">
          <button onClick={this.props.handleDayView}>Day</button>
          <button onClick={this.props.handleWeekView}>Week</button>
          <button onClick={this.props.handleMonthView}>Month</button>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, createHandlers)(CalendarHeader)
