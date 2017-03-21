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
    if (this.props.view === 'day') {
      return <table><tbody><Day date={this.props.date} start="9" end="17:30" slot={60} /></tbody></table>
    }

    if (this.props.view === 'month') {
      return <Month date={this.props.date} />
    }

    if (this.props.view === 'week') {
      return <Week date={this.props.date} />
    }
  }

  render() {
    return (<div>{this.renderContent()}</div>);
  }
}

export default connect(mapStateToProps, null)(CalendarBody)
