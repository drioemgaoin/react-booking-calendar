import React from 'react';

export default class CalendarHeader extends React.Component {
  constructor(props) {
    super(props);

    this.state = { view: this.props.view }
  }

  renderDate() {
    if (this.state.view === 'day') {
      return this.props.date.format("MMMM DD YYYY")
    }

    if (this.state.view === 'week') {
      var startOfWeek = this.props.date.clone().startOf('isoweek');
      var endOfWeek   = this.props.date.clone().endOf('isoweek');
      return startOfWeek.format("DD MMM") + " - " + endOfWeek.format("DD MMM")
    }

    if (this.state.view === 'month') {
      return this.props.date.format("MMMM YYYY")
    }
  }

  onViewChanged(evt, view) {
    evt.preventDefault();
    this.setState({ view: view });
    this.props.onViewChanged(view);
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
          <button onClick={(evt) => this.onViewChanged(evt, "day")}>Day</button>
          <button onClick={(evt) => this.onViewChanged(evt, "week")}>Week</button>
          <button onClick={(evt) => this.onViewChanged(evt, "month")}>Month</button>
        </div>
      </div>
    );
  }
}

CalendarHeader.propTypes = {
  date: React.PropTypes.object,
  view: React.PropTypes.string,
  onViewChanged: React.PropTypes.func
};
