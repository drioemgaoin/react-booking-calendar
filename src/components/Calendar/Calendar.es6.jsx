import React from 'react';
import { Provider } from 'react-redux';

import CalendarContainer from './src/components/CalendarContainer';
import store from './src/Store';

import './style/main.scss';

export default class Calendar extends React.Component {
  static defaultProps = {
      bookings: [],
      timeSlice: [],
      timeSlot: 30
  };

  render() {
    return (
      <Provider store={store}>
        <CalendarContainer bookings={this.props.bookings}
                  timeSlot={this.props.timeSlot}
                  timeSlice={this.props.timeSlice}
                  body={this.props.children} />
      </Provider>
    );
  }
}
