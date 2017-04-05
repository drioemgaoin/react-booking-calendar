import {
  CHANGE_DATE,
  CHANGE_VIEW
} from '../actions/calendarActions';

import moment from 'moment';

const INITIAL_STATE = {
  date: moment().seconds(0).milliseconds(0),
  view: 'month'
};

export default function dateReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case CHANGE_DATE:
    return Object.assign({}, state, { date: action.date });
  case CHANGE_VIEW:
    return Object.assign({}, state, { view: action.view });
  default:
    return state;
  }
}
