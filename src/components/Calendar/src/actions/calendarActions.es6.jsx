export const CHANGE_DATE = 'CHANGE_DATE';
export const CHANGE_VIEW = 'CHANGE_VIEW';
export const DISPLAY_DAY = 'DISPLAY_DAY';

function computeDate(view, date, number) {
  if (view === 'day') {
    return date.clone().add(number, 'd')
  }

  if (view === 'week') {
    return date.clone().add(number, 'w')
  }

  if (view === 'month') {
    return date.clone().add(number, 'M');
  }
}

export function displayDayAction(view, date, number) {
  return {
    type: DISPLAY_DAY,
    date: computeDate(view, date, number),
    view
  };
}

export function changeDateAction(view, date, number) {
  return {
    type: CHANGE_DATE,
    date: computeDate(view, date, number)
  };
}

export function changeViewAction(view) {
  return {
    type: CHANGE_VIEW,
    view
  };
}
