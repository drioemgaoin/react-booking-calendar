import React from 'react';
import moment from 'moment';

import Day from "./Day";

export default class Week extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var startOfWeek = this.props.date.clone().startOf('isoweek');
    var endOfWeek   = this.props.date.clone().endOf('isoweek');

    var days = [];
    do
    {
      var date = startOfWeek.clone()
      days.push(<Day key={startOfWeek} date={date} start="9" end="17:30" slot={60} />)
    }
    while(startOfWeek.add(1, 'days').diff(endOfWeek) < 0)

    return (<table><tbody>{days}</tbody></table>)
  }
}
