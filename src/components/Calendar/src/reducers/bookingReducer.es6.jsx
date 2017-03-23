import {
  ADD_BOOKING
} from '../actions/bookingActions';

const INITIAL_STATE = {
  isBooked: false
};

export default function bookingReducer(state = INITIAL_STATE, action) {
  switch(action.type) {
    case ADD_BOOKING:
      return Object.assign({}, state, { isBooked: true });
    default:
      return state;
  }
}
