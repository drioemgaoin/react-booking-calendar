import React from 'react';
import { Provider } from 'react-redux'

import BookingContent from "./BookingContent"
import store from './Store';

export default class Booking extends React.Component {
  constructor(props) {
    super(props)

    this.store = new store();
  }

  render() {
    return (
      <Provider store={this.store}>
        <BookingContent close={this.props.close} />
      </Provider>
    );
  }
}
