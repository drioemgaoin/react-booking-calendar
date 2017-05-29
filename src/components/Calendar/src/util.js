import moment from 'moment';

export function getDateTime(date, time) {
  const values = time.split(':');
  return moment(date).set({ hour: +values[0], minute: +values[1], second: 0 });
}

export function getBookingsForDay(bookings, date) {
  return bookings.filter(x => {
      return x.startDate.local().format('L') === date.format('L');
  });
}
