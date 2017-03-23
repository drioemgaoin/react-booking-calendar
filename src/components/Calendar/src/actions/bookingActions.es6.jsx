export const ADD_BOOKING = 'ADD_BOOKING';

export function addBookingAction(infos) {
  return {
    type: ADD_BOOKING,
    infos
  };
}
