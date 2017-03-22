import React from 'react';
import moment from 'moment';
import Slot from "./Slot";

export default class Day extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var start = moment(this.props.start, "HH:mm");
    var end = moment(this.props.end, "HH:mm");
    var spread = moment.duration(end.diff(start)).asMinutes();

    var slots = [];
    for (var i = 0; i < spread; i += this.props.slot) {
      var slot = start.add(this.props.slot, 'm').format('HH:mm A');
      slots.push(<Slot onClick={this.props.onClick} key={slot} time={slot} />)
    }

    return (
      <tr className='rbc-day'>
        <td className='rbc-header'>
          <span>{this.props.date.format("MMM YYYY")}</span>
          <span>{this.props.date.format("DD")}</span>
          <span>{this.props.date.format("dddd")}</span>
        </td>
        {slots}
      </tr>
    );
  }
}
