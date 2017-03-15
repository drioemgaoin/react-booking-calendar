import React from 'react';
import { connect } from 'react-redux'
import * as actions from '../../actions/calendar';

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
    }
  }
}

class CalendarHeader extends React.Component {
  constructor(props) {
    super(props);
  }

  renderDate() {
    if (this.props.type === 'day') {
      return this.props.date.format("MMMM DD YYYY")
    }

    if (this.props.type === 'week') {
      var startOfWeek = this.props.date.clone().startOf('isoweek');
      var endOfWeek   = this.props.date.clone().endOf('isoweek');
      return startOfWeek.format("DD MMM") + " - " + endOfWeek.format("DD MMM")
    }

    if (this.props.type === 'month') {
      return this.props.date.format("MMMM YYYY")
    }
  }

  render() {
    return (
      <div className="rbc-header">
        <div className="rbc-date">
          <button onClick={(evt) => this.props.onDateChanged(evt, "previous")}>Previous</button>
          <span>{this.renderDate()}</span>
          <button onClick={(evt) => this.props.onDateChanged(evt, "next")}>Next</button>
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

CalendarHeader.propTypes = {
  date: React.PropTypes.object
};

export default connect(null, createHandlers)(CalendarHeader)
