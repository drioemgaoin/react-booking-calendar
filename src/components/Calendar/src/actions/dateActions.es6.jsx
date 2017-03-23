export const NEXT_DATE = 'NEXT_DATE';
export const PREVIOUS_DATE = 'PREVIOUS_DATE';

export function nextDateAction() {
  return {
    type: NEXT_DATE
  };
}

export function previousDateAction() {
  return {
    type: PREVIOUS_DATE
  };
}
