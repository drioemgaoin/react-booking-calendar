//View list
export const DAY_VIEW = 'DAY_VIEW';
export const WEEK_VIEW = 'WEEK_VIEW';
export const MONTH_VIEW = 'MONTH_VIEW';

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
