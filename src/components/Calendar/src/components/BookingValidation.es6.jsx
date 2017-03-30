import moment from 'moment';

function getEndOfWork(date, props) {
  const currentDay = date.format('dddd').toLowerCase();
  let endDate = moment(date.format('YYYY-MM-DD'));
  return endDate.set('hour', props.timeSlice[currentDay].end);
}

export const required = value => value ? undefined : 'Required'

export function validate(values, props) {
    const errors = {}
    const bookings = props.bookings.filter(booking => {
        return values.startDate <= booking.startDate && booking.startDate < values.endDate;
    })

    if (bookings.length > 0) {
        errors.service = 'You can\'t book this service. There is another booking at ' + bookings[0].startDate.format('HH:mm A');
    }


    const endOfWork = getEndOfWork(values.startDate, props);
    if (values.endDate.isAfter(endOfWork)) {
      errors.service = 'You can\'t book this service. The salon closes at ' + endOfWork.format('HH:mm A');
    }

    return errors;
}
