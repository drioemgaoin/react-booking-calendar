import React from 'react';
import moment from 'moment';
import { Provider } from 'react-redux';

import store from './src/Store';
import CalendarHeader from "./src/components/CalendarHeader";
import CalendarBody from "./src/components/CalendarBody";
import Modal from "./src/components/Modal";

import './style/main.scss';

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
