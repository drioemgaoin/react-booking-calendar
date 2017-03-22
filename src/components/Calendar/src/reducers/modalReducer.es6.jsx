import {
  SHOW_MODAL,
  HIDE_MODAL
} from '../actions/modalActions';

const INITIAL_STATE = {
  showModal: false,
  title: "",
  type: ""
};

export default function modalReducer(state = INITIAL_STATE, action) {
  switch(action.type) {
    case SHOW_MODAL:
      return Object.assign({}, state, { showModal: true, title: action.title, type: action.footer });
    case HIDE_MODAL:
      return Object.assign({}, state, { showModal: false });
    default:
      return state;
  }
}
