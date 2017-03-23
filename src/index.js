import React from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';

import Calendar from "./components/Calendar/Calendar"
import Booking from "./components/Booking/Booking"
import store from './components/Calendar/src/Store';

const booking = null//<Booking />
ReactDOM.render(
  <Provider store={store}>
    <Calendar>
      {booking}
    </Calendar>
  </Provider>,
  document.getElementById("root")
);
