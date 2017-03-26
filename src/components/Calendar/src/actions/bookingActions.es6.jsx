export const ADD_BOOKING = 'ADD_BOOKING';

export function addBookingAction(data) {
  return {
    type: ADD_BOOKING,
    data
  };
}
