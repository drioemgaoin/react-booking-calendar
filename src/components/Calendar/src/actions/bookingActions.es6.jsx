export const ADD_BOOKING = 'ADD_BOOKING';
export const CANCEL_BOOKING = 'CANCEL_BOOKING';

export function addBookingAction() {
  return {
    type: ADD_BOOKING
  };
}

export function cancelBookingAction() {
  return {
    type: CANCEL_BOOKING
  };
}
