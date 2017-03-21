import React from 'react';
import moment from 'moment';

import Day from "./Day";

export default class Month extends React.Component {
  render() {
    const selectedDate = this.props.date;
    const daysInMonth = selectedDate.daysInMonth();

    var days = [];
    for (var i = 1; i <= daysInMonth; i++) {
      var date = selectedDate.set('date', i).clone();
      days.push(<Day key={date} date={date} start="9" end="17:30" slot={60} />)
    }

    return (<table><tbody>{days}</tbody></table>)
  }
}
