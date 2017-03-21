import React from 'react';
import { connect } from 'react-redux'
import * as actions from '../actions/headerActions';

let createHandlers = (dispatch) => {
  return {
    handleDayView: () => {
    	dispatch(actions.dayViewAction());
    },
    handleWeekView: () => {
    	dispatch(actions.weekViewAction());
    },
    handleMonthView: () => {
    	dispatch(actions.monthViewAction());
    },
    handlerNextDate: () => {
      dispatch(actions.nextDateAction());
    },
    handlerPreviousDate: () => {
      dispatch(actions.previousDateAction());
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
    if (this.props.view === 'day') {
      return this.props.date.format("MMMM DD YYYY")
    }

    if (this.props.view === 'week') {
      var startOfWeek = this.props.date.clone().startOf('isoweek');
      var endOfWeek   = this.props.date.clone().endOf('isoweek');
      return startOfWeek.format("DD MMM") + " - " + endOfWeek.format("DD MMM")
    }

    if (this.props.view === 'month') {
      return this.props.date.format("MMMM YYYY")
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
