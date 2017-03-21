import React from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';

import Calendar from "./components/Calendar/Calendar"
import store from './components/Calendar/src/Store';

ReactDOM.render(
  <Provider store={store}>
    <Calendar />
  </Provider>,
  document.getElementById("root")
);
