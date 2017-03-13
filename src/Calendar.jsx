import React from 'react'
import CalendarHeader from './Calendar/CalendarHeader.jsx'

var Calendar = React.createClass({
  render: function() {
    return (
      <div>
        <CalendarHeader />
        Calendar content
      </div>
    );
  }
})

module.exports = Calendar;
