//View list
export const DAY_VIEW = 'DAY_VIEW';
export const WEEK_VIEW = 'WEEK_VIEW';
export const MONTH_VIEW = 'MONTH_VIEW';

// Date navigation
export const NEXT_DATE = 'NEXT_DATE';
export const PREVIOUS_DATE = 'PREVIOUS_DATE';

export function dayViewAction() {
  return {
    type: DAY_VIEW
  };
}

export function weekViewAction() {
  return {
    type: WEEK_VIEW
  };
}

export function monthViewAction() {
  return {
    type: MONTH_VIEW
  };
}

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
