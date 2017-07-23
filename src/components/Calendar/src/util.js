import moment from 'moment';
import {find} from 'lodash';

export function getDateTime(date, time) {
    const values = time.split(':');
    return moment(date).set({ hour: +values[0], minute: +values[1], second: 0 });
}

export function getBookingsForDay(bookings, date) {
    return bookings.filter(x => {
        return moment(x.startDate).local().format('L') === date.format('L');
    });
}

export function getBookingsForWeek(bookings, date) {
    const startOfWeek = date.clone().startOf('isoweek');
    const endOfWeek = date.clone().endOf('isoweek');
    return bookings.filter(x => {
        return moment(x.startDate).local().isBetween(startOfWeek, endOfWeek);
    });
}

export function getBookingsForMonth(bookings, date) {
    return bookings.filter(x => {
        return moment(x.startDate).local().format('MM') === date.format('MM');
    });
}

export function getTimesliceForDay(timeSlices, timeExceptions, date) {
    const current = moment(date.format('L'));
    const exception = find(timeExceptions, x => current.isBetween(moment(x.startDate), moment(x.endDate), null, '[]'));
    if (exception) {
        return [{ date: current.clone(), start: exception.startTime, end: exception.endTime, off: exception.off }];
    } else {
        const timeSlice = find(timeSlices, x => x.day === date.format('dddd'));
        return timeSlice ? [{ date: current.clone(), start: timeSlice.start, end: timeSlice.end }] : [];
    }
}

export function getTimesliceForWeek(timeSlices, timeExceptions, date) {
    const startOfWeek = date.clone().startOf('isoweek');
    const endOfWeek = date.clone().endOf('isoweek');

    let result = [];

    let current = startOfWeek.clone();
    while (current <= endOfWeek) {
        const exception = find(timeExceptions, x => current.isBetween(moment(x.startDate), moment(x.endDate), null, '[]'));
        if (exception) {
            result.push({ date: current.clone(), start: exception.startTime, end: exception.endTime, off: exception.off });
        } else {
            const timeSlice = find(timeSlices, x => x.day === current.format('dddd'));
            if (timeSlice) {
                result.push({ date: current.clone(), start: timeSlice.start, end: timeSlice.end });
            }
        }

        current = current.add(1, 'd');
    }

    return result;
}

export function getTimesliceForMonth(timeSlices, timeExceptions, date) {
    let result = [];

    const daysInMonth = date.daysInMonth();
    for (var i = 1; i <= daysInMonth; i++) {
        const current = moment(date.set('date', i).format('L'));

        const exception = find(timeExceptions, x => current.isBetween(moment(x.startDate), moment(x.endDate), null, '[]'));
        if (exception) {
            result.push({ date: current.clone(), start: exception.startTime, end: exception.endTime, off: exception.off });
        } else {
            const timeSlice = find(timeSlices, x => x.day === current.format('dddd'));
            if (timeSlice) {
                result.push({ date: current.clone(), start: timeSlice.start, end: timeSlice.end });
            }
        }
    }

    return result;
}
