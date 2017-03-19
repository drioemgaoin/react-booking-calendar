import {
  DAY_VIEW,
  WEEK_VIEW,
  MONTH_VIEW,
  NEXT_DATE,
  PREVIOUS_DATE,
  NEW_BOOKING,
  CLOSE_BOOKING,
  VALIDATE_BOOKING
} from './Actions';

import moment from 'moment';

const INITIAL_STATE = {
  view: "month",
  date: moment(),
  showModal: false
};

function computeDate(state, number) {
  if (state.view === 'day') {
    return state.date.clone().add(number, 'd')
  }

  if (state.view === 'week') {
    return state.date.clone().add(number, 'w')
  }

  if (state.view === 'month') {
    return state.date.clone().add(number, 'M');
  }

  return state.date;
}

export default function state(state = INITIAL_STATE, action) {
  switch(action.type) {
    case DAY_VIEW:
      return Object.assign({}, state, { view: 'day' });
    case WEEK_VIEW:
      return Object.assign({}, state, { view: 'week' });
    case MONTH_VIEW:
      return Object.assign({}, state, { view: 'month' });
    case NEXT_DATE:
      return Object.assign({}, state, { date: computeDate(state, 1) });
    case PREVIOUS_DATE:
      return Object.assign({}, state, { date: computeDate(state, -1) });
    case NEW_BOOKING:
      return Object.assign({}, state, { showModal: true, title: "New Booking" });
    case CLOSE_BOOKING:
      return Object.assign({}, state, { showModal: false, title: "" });
    case VALIDATE_BOOKING:
      return Object.assign({}, state, { showModal: false, title: "" });
    default:
      return state;
  }
}
