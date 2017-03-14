import React from "react";
import ReactDOM from "react-dom";
import Calendar from "./Components/Calendar"
import './stylesheets/main.scss';

var mainView = React.createElement(Calendar, null);
ReactDOM.render(mainView, document.getElementById("main"));
