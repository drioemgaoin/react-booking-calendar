import {
  NEXT_DATE,
  PREVIOUS_DATE
} from '../actions/dateActions';

import moment from 'moment';

const INITIAL_STATE = {
  current: moment()
};

function computeDate(view, state, number) {
  if (view=== 'day') {
    return state.current.clone().add(number, 'd')
  }

  if (view === 'week') {
    return state.current.clone().add(number, 'w')
  }

  if (view === 'month') {
    return state.current.clone().add(number, 'M');
  }

  return state.current;
}

export default function dateReducer(state = INITIAL_STATE, action, view) {
  switch(action.type) {
    case NEXT_DATE:
      return Object.assign({}, state, { current: computeDate(view, state, 1) });
    case PREVIOUS_DATE:
      return Object.assign({}, state, { current: computeDate(view, state, -1) });
    default:
      return state;
  }
}
