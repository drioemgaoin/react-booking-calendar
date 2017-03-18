import {
  CANCEL_BOOKING,
  VALIDER_BOOKING
} from '../actions/booking';

const INITIAL_STATE = {
  showModal: false
};

export default function state(state = INITIAL_STATE, action) {
  switch(action.type) {
    case CANCEL_BOOKING:
      return Object.assign({}, state, { showModal: false });
    case VALIDER_BOOKING:
      return Object.assign({}, state, { showModal: false });
    default:
      return state;
  }
}
