import React from 'react';
import { Provider } from 'react-redux';

import Calendar from './Calendar';
import store from './src/Store';

export default class Root extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Calendar bookings={this.props.bookings}
                  timeSlot={this.props.timeSlot}
                  timeSlice={this.props.timeSlice}
                  body={this.props.children} />
      </Provider>
    );
  }
}
