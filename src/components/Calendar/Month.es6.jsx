import React from 'react';
import moment from 'moment';

import Day from "./Day";

export default class Month extends React.Component {
  render() {
    const daysInMonth = moment().daysInMonth();

    var days = [];
    for (var i = moment().format("D"); i <= daysInMonth; i++) {
      var date = moment().set('date', i);
      days.push(<Day key={date} date={date} start="9" end="17:30" slot={60} />)
    }

    return (<table>{days}</table>)
  }
}
