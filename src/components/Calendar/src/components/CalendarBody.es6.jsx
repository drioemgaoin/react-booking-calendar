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

  renderContent() {
    if (this.props.view.type === 'day') {
      return (
          <table>
            <tbody>
              <Day onClick={this.props.onDayClick}
                date={this.props.date.current}
                start="9"
                end="17:30"
                slot={60} />
            </tbody>
          </table>
      )
    }

    if (this.props.view.type === 'month') {
      return <Month onClick={this.props.onDayClick}
                date={this.props.date.current} />
    }

    if (this.props.view.type === 'week') {
      return <Week onClick={this.props.onDayClick}
                date={this.props.date.current} />
    }
  }

  render() {
    return (<div>{this.renderContent()}</div>);
  }
}

export default connect(mapStateToProps, null)(CalendarBody)
