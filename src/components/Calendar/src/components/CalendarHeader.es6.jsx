import React from 'react';
import { connect } from 'react-redux'
import moment from 'moment';

import { changeDateAction, changeViewAction } from '../actions/calendarActions';

let mapDispatchToProps = (dispatch, ownProps) => {
  return {
    handleChangeView: (view) => {
      dispatch(changeViewAction(view));
    },
    handlerNextDate: (props) => {
      dispatch(changeDateAction(props.view, props.date, 1));
    },
    handlerPreviousDate: (props) => {
      dispatch(changeDateAction(props.view, props.date, -1));
    }
  }
}

let mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps,
    view: state.calendar.view,
    date: state.calendar.date
  };
}

class CalendarHeader extends React.Component {
  renderDate() {
    if (this.props.view === 'day') {
      return this.props.date.format('DD MMM YYYY')
    }

    if (this.props.view === 'week') {
      var startOfWeek = this.props.date.clone().startOf('isoweek');
      var endOfWeek   = this.props.date.clone().endOf('isoweek');
      return startOfWeek.format('DD MMM YYYY') + ' - ' + endOfWeek.format('DD MMM YYYY')
    }

    if (this.props.view === 'month') {
      return this.props.date.format('MMMM YYYY')
    }
  }

  render() {
    return (
      <div className='rbc-header'>
        <div className='rbc-date'>
          <button className='btn primary' onClick={() => this.props.handlerPreviousDate(this.props)}>Previous</button>
          <span>{this.renderDate()}</span>
          <button className='btn primary' onClick={() => this.props.handlerNextDate(this.props)}>Next</button>
        </div>

        <div className='rbc-view'>
          <button className='btn primary' onClick={() => this.props.handleChangeView('day')}>Day</button>
          <button className='btn primary' onClick={() => this.props.handleChangeView('week')}>Week</button>
          <button className='btn primary' onClick={() => this.props.handleChangeView('month')}>Month</button>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CalendarHeader)
