import {
  SHOW_MODAL,
  HIDE_MODAL
} from '../actions/modalActions';

const INITIAL_STATE = {
  show: false,
  title: null,
  type: null
};

export default function modalReducer(state = INITIAL_STATE, action) {
  switch(action.type) {
    case SHOW_MODAL:
      return Object.assign({}, state, { show: true, title: action.title, type: action.footer });
    case HIDE_MODAL:
      return INITIAL_STATE;
    default:
      return state;
  }
}
