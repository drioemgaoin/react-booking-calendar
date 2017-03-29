export const required = value => value ? undefined : 'Required'

export function validate(values, props) {
    const errors = {}
    const bookings = props.bookings.filter(booking => {
        return values.startDate <= booking.startDate && booking.startDate < values.endDate;
    })

    if (bookings.length > 0) {
        errors.service = 'You can\'t book this service. There is another booking at ' + bookings[0].startDate.format('HH:mm A');
    }

    return errors;
}
