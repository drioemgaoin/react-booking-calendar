import React from 'react';

import Month from "./Month";
import Day from "./Day";

export default class CalendarBody extends React.Component {
  constructor(props) {
    super(props);
  }

  renderContent() {
    if (this.props.view === 'day') {
      return <Day date={this.props.date} start="9" end="17:30" slot={60} />
    }

    if (this.props.view === 'month') {
      return <Month date={this.props.date} />
    }
  }

  render() {
    return (<div>{this.renderContent()}</div>);
  }
}

CalendarBody.propTypes = {
  view: React.PropTypes.string,
  date: React.PropTypes.string
};
