import {
  ADD_BOOKING
} from '../actions/bookingActions';

const INITIAL_STATE = {
  isBookied: false
};

export default function bookingReducer(state = INITIAL_STATE, action) {
  switch(action.type) {
    case ADD_BOOKING:
      return Object.assign({}, state, { isBookied: true });
    default:
      return state;
  }
}
