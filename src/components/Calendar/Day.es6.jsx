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
      slots.push(<Slot time={slot} />)
    }

    return (
      <tr className='day'>
        <td className='header'>
          <span>Oct 2015</span>
          <span>22</span>
          <span>Tuesday</span>
        </td>
        {slots}
      </tr>
    );
  }
}

Day.propTypes = {
  start: React.PropTypes.string,
  end: React.PropTypes.string,
  slot: React.PropTypes.number
};
