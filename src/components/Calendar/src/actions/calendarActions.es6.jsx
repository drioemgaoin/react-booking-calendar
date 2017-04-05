export const CHANGE_DATE = 'CHANGE_DATE';
export const CHANGE_VIEW = 'CHANGE_VIEW';

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
