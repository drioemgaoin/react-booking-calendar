//View list
export const CANCEL_BOOKING = 'CANCEL_BOOKING';
export const VALIDER_BOOKING = 'VALIDER_BOOKING';

export function cancelBookingAction() {
  return {
    type: CANCEL_BOOKING
  };
}

export function validerBookingAction() {
  return {
    type: VALIDER_BOOKING
  };
}
