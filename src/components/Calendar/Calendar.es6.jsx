import React from 'react';
import moment from 'moment';
import { Provider } from 'react-redux';

import store from './Store';
import CalendarHeader from "./CalendarHeader";
import CalendarBody from "./CalendarBody";
import Modal from "./Modal";

export default class Calendar extends React.Component {
  constructor(props) {
    super(props);

    this.store = new store();
  }

  render() {
    return (
      <Provider store={this.store}>
        <div className="rbc-calendar">
          <Modal body={this.props.booking} />
          <CalendarHeader />
          <CalendarBody />
        </div>
      </Provider>
    );
  }
}
