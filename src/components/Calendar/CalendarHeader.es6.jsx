import React from 'react';

export default class CalendarHeader extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="rbc-header">
        <div className="rbc-date">
          <button>Previous</button>
          <span>{this.props.date.format("MMMM DD YYYY")}</span>
          <button>Next</button>
        </div>

        <div className="rbc-views">
          <button onClick={(evt) => this.props.onViewChanged(evt, "day")}>Day</button>
          <button onClick={(evt) => this.props.onViewChanged(evt, "week")}>Week</button>
          <button onClick={(evt) => this.props.onViewChanged(evt, "month")}>Month</button>
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
