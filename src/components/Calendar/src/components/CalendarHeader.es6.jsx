import React from 'react';
import { connect } from 'react-redux'

import { dayViewAction, weekViewAction, monthViewAction } from '../actions/viewActions';
import { nextDateAction, previousDateAction } from '../actions/dateActions';

let mapDispatchToProps = (dispatch) => {
  return {
    handleDayView: () => {
    	dispatch(dayViewAction());
    },
    handleWeekView: () => {
    	dispatch(weekViewAction());
    },
    handleMonthView: () => {
    	dispatch(monthViewAction());
    },
    handlerNextDate: () => {
      dispatch(nextDateAction());
    },
    handlerPreviousDate: () => {
      dispatch(previousDateAction());
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

export default connect(mapStateToProps, mapDispatchToProps)(CalendarHeader)
