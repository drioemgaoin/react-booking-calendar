import React from 'react';
import moment from 'moment';

import CalendarHeader from "./Calendar/CalendarHeader";
import CalendarBody from "./Calendar/CalendarBody";

export default class Calendar extends React.Component {
  constructor(props) {
    super(props);

    this.onViewChanged = this.onViewChanged.bind(this);

    this.state = { views: this.props.view }
  }

  onViewChanged(evt, view) {
    evt.preventDefault();
    this.setState({ view: view })
  }

  render() {
    return (
      <div className="rbc-calendar">
        <CalendarHeader date={moment()} onViewChanged={this.onViewChanged} />
        <CalendarBody date={moment()} view={this.state.view}/>
      </div>
    );
  }
}

Calendar.propTypes = {
  view: React.PropTypes.string
};
