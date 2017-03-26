import React from "react";
import ReactDOM from "react-dom";
import moment from "moment";

import Booking from "./components/Booking/Booking"
import Root from "./components/Calendar/Root"

const timeSlot = 30;

const timeSlice = {
  monday: { start: 9, end: 16 },
  tuesday: { start: 10, end: 15 },
  wednesday: { start: 9, end: 16 },
  thursday: { start: 9, end: 16 },
  friday: { start: 9, end: 18 },
  saturday: { start: 10, end: 19 },
  sunday: { start: 9, end: 14 }
};

const bookings = [
  {
    isBooked: true,
    startDate: moment().seconds(0).milliseconds(0).hours(10).minutes(0),
    endDate: moment().seconds(0).milliseconds(0).hours(10).minutes(30)
  },
  {
    isBooked: true,
    startDate: moment().seconds(0).milliseconds(0).hours(12).minutes(0),
    endDate: moment().seconds(0).milliseconds(0).hours(12).minutes(30)
  }
];

const booking = null//<Booking />
ReactDOM.render(
  <Root bookings={bookings}
        timeSlot={timeSlot}
        timeSlice={timeSlice}>
    {booking}
  </Root>,
  document.getElementById("root")
);
