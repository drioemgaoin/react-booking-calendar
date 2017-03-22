export const SHOW_MODAL = 'SHOW_MODAL';
export const HIDE_MODAL = 'HIDE_MODAL';

export function showModalAction(title, footer) {
  return {
    type: SHOW_MODAL,
    title,
    footer
  };
}

export function hideModalAction() {
  return {
    type: HIDE_MODAL
  };
}
