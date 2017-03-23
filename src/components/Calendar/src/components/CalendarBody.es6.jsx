import React from 'react';
import { connect } from 'react-redux'

import Month from "./Month";
import Day from "./Day";
import Week from "./Week";

let mapStateToProps = (state) => {
  return {
    view: state.view,
    date: state.date
  };
}

class CalendarBody extends React.Component {
  constructor(props) {
    super(props);
  }

  getDate(isStart) {
    const currentDay = this.props.date.current.format('dddd').toLowerCase();
    return isStart
      ? this.props.timeSlice[currentDay].start
      : this.props.timeSlice[currentDay].end;
  }

  renderContent() {
    if (this.props.view.type === 'day') {
      return (
          <table>
            <tbody>
              <Day onClick={this.props.onDayClick}
                   date={this.props.date.current}
                   timeSlice={this.props.timeSlice}
                   timeSlot={this.props.timeSlot} />
            </tbody>
          </table>
      )
    }

    if (this.props.view.type === 'month') {
      return <Month onClick={this.props.onDayClick}
                    date={this.props.date.current}
                    timeSlice={this.props.timeSlice}
                    timeSlot={this.props.timeSlot} />
    }

    if (this.props.view.type === 'week') {
      return <Week onClick={this.props.onDayClick}
                   date={this.props.date.current}
                   timeSlice={this.props.timeSlice}
                   timeSlot={this.props.timeSlot}  />
    }
  }

  render() {
    return (<div>{this.renderContent()}</div>);
  }
}

export default connect(mapStateToProps, null)(CalendarBody)
