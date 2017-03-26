export const NEXT_DATE = 'NEXT_DATE';
export const PREVIOUS_DATE = 'PREVIOUS_DATE';

export function nextDateAction(view) {
  return {
    type: NEXT_DATE,
    view
  };
}

export function previousDateAction(view) {
  return {
    type: PREVIOUS_DATE,
    view
  };
}
