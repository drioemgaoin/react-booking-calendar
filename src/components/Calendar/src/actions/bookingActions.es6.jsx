export const ADD_BOOKING = 'ADD_BOOKING';
export const OPEN_BOOKING = 'OPEN_BOOKING';

export function addBookingAction(data) {
  return {
    type: ADD_BOOKING,
    data
  };
}

export function openBookingAction(data) {
  return {
    type: OPEN_BOOKING,
    data
  };
}
