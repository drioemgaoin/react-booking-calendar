import {
  CANCEL_BOOKING,
  VALIDER_BOOKING,
  GET_SERVICES,
  GET_SERVICES_SUCCESSFUL,
  GET_SERVICES_FAILED,
  POST_BOOKING_SUCCESSFUL,
  POST_BOOKING_FAILED
} from './Actions';

const INITIAL_STATE = {
  services: null,
  onClose: null
};

export default function state(state = INITIAL_STATE, action) {
  switch(action.type) {
    case CANCEL_BOOKING:
      return Object.assign({}, state, { });
    case VALIDER_BOOKING:
      return Object.assign({}, state, { });
    case GET_SERVICES_SUCCESSFUL:
      return Object.assign({}, state, { services: action.payload });
    case GET_SERVICES_FAILED:
      return Object.assign({}, state, { error: action.payload });
    case POST_BOOKING_SUCCESSFUL:
      return Object.assign({}, state, { });
    case POST_BOOKING_FAILED:
      return Object.assign({}, state, { error: action.payload });
    default:
      return state;
  }
}
