import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import bem from 'bem-classname';

import Slot from '../slot/Slot';
import { getStyle } from '../../style';
import {find, times} from 'lodash';
import {getDateTime} from '../../util';

import './day.scss';

let mapStateToProps = (state, ownProps) => {
    return {
        ...ownProps,
        bookings: state.booking.bookings
    };
}

class Day extends React.Component {
    static defaultProps = {
        view: 'landscape',
        timeSlot: 30
    }

    createSlot(key, booking, numberOfColumn, numberOfSlot) {
        const style = this.props.style
        ? this.props.style
        : getStyle(this.props.view, numberOfColumn, numberOfSlot);

        return <Slot onClick={this.props.onClick}
            key={key}
            style={style}
            canViewBooking={this.props.canViewBooking}
            {...booking} />
    }

    createBooking(start, end) {
        return {
            isBooked: false,
            startDate: start,
            endDate: end
        }
    }

    nextSlot(date) {
        return {
            startDate: date.clone(),
            endDate: date.clone().add(this.props.timeSlot, 'm')
        }
    }

    getBooking(currentSlot) {
        const booking = find(this.props.bookings, x => {
            const bookingStartDate = x.startDate.local();
            return bookingStartDate.isBetween(currentSlot.startDate, currentSlot.endDate, null, '[)');
        });

        return booking ? Object.assign({}, booking, {
            startDate: booking.startDate.local(),
            endDate: booking.endDate.local()
        }) : undefined;
    }

    isDayOff() {
        return this.props.timeSlice &&
            this.props.timeSlice.off &&
            this.props.timeSlice.start === '08:00' &&
            this.props.timeSlice.end === '20:00';
    }

    isOff(slot) {
        if (this.props.timeSlice && this.props.timeSlice.off) {
            const startOff = getDateTime(this.props.date, this.props.timeSlice.start);
            const endOff = getDateTime(this.props.date, this.props.timeSlice.end);

            return slot.startDate.isBetween(startOff, endOff, null, '[)');
        }

        return false;
    }

    render() {
        let slots = [];

        if (this.props.date) {
            const startDiary = getDateTime(this.props.date, '08:00');
            const endDiary = getDateTime(this.props.date, '20:00');
            const numberOfColumn = endDiary.diff(startDiary, 'minutes') / this.props.timeSlot;
            let currentSlot = this.nextSlot(startDiary);

            if (this.isDayOff() || (!this.props.displayPast && this.props.date.isBefore(moment(), 'day'))) {
                return null;
            } else {
                let workStart = startDiary;
                let workEnd = endDiary;
                if (this.props.timeSlice && !this.props.timeSlice.off) {
                    workStart = getDateTime(this.props.date, this.props.timeSlice.start);
                    workEnd = getDateTime(this.props.date, this.props.timeSlice.end);
                }

                while (currentSlot.startDate.isBefore(workStart)) {
                    const numberOfSlot = workStart.isBefore(currentSlot.endDate)
                    ? workStart.diff(currentSlot.startDate, 'minutes') / this.props.timeSlot
                    : 1;
                    slots.push(this.createSlot(slots.length, {}, numberOfColumn, numberOfSlot));

                    currentSlot = this.nextSlot(numberOfSlot === 1 ? currentSlot.endDate : workStart);
                }

                while (currentSlot.startDate.isBefore(workEnd)) {
                    let booking = this.getBooking(currentSlot);

                    // Check if slot match a past time
                    if (!this.props.displayPast && currentSlot.startDate.isBefore(moment())) {
                        slots.push(this.createSlot(slots.length, {}, numberOfColumn, 1));
                        currentSlot = this.nextSlot(currentSlot.endDate);
                        continue;
                    }

                    // Check if slot match a off period
                    if (this.isOff(currentSlot)) {
                        slots.push(this.createSlot(slots.length, {}, numberOfColumn, 1));
                        currentSlot = this.nextSlot(currentSlot.endDate);
                        continue;
                    }

                    if (booking) {
                        let numberOfSlot = 1;

                        if (booking.startDate.isAfter(currentSlot.startDate)) {
                            numberOfSlot = booking.startDate.diff(currentSlot.startDate, 'minutes') / this.props.timeSlot;
                            const freeSlot = this.createBooking(currentSlot.startDate, booking.startDate);
                            slots.push(this.createSlot(slots.length, freeSlot, numberOfColumn, numberOfSlot));
                        }

                        numberOfSlot = booking.endDate.diff(booking.startDate, 'minutes') / this.props.timeSlot;
                        slots.push(this.createSlot(slots.length, booking, numberOfColumn, numberOfSlot));

                        if (booking.endDate.isBefore(currentSlot.endDate)) {
                            numberOfSlot = currentSlot.endDate.diff(booking.endDate, 'minutes') / this.props.timeSlot;
                            const freeSlot = this.createBooking(booking.endDate, currentSlot.endDate);
                            slots.push(this.createSlot(slots.length, freeSlot, numberOfColumn, numberOfSlot));
                            currentSlot = this.nextSlot(currentSlot.endDate);
                        } else {
                            currentSlot = this.nextSlot(booking.endDate);
                        }
                    } else {
                        const numberOfSlot = workEnd.isBefore(currentSlot.endDate)
                        ? workEnd.diff(currentSlot.startDate, 'minutes') / this.props.timeSlot
                        : 1;

                        const endDate = numberOfSlot === 1 ? currentSlot.endDate : workEnd;
                        const freeSlot = this.createBooking(currentSlot.startDate,  endDate);
                        slots.push(this.createSlot(slots.length, freeSlot, numberOfColumn, numberOfSlot));

                        currentSlot = this.nextSlot(endDate);
                    }
                }

                while (currentSlot.endDate.isSameOrBefore(endDiary)) {
                    const numberOfSlot = currentSlot.endDate.isAfter(endDiary)
                    ? endDiary.diff(currentSlot.startDate, 'minutes') / this.props.timeSlot
                    : 1;

                    slots.push(this.createSlot(slots.length, {}, numberOfColumn, numberOfSlot));

                    currentSlot = this.nextSlot(numberOfSlot === 1 ? currentSlot.endDate : endDiary);
                }

                if (currentSlot.startDate.isBefore(endDiary)) {
                    const numberOfSlot = endDiary.diff(currentSlot.startDate, 'minutes') / this.props.timeSlot;
                    slots.push(this.createSlot(slots.length, {}, numberOfColumn, numberOfSlot));
                }
            }
        }

        const headerClassName = bem('day', 'header');
        return (
            <div className='day'>
                {
                    this.props.header && (
                        <div className={headerClassName}>{this.props.header}</div>
                    )
                }
                {
                    !this.props.header && this.props.date &&
                    (
                        <div className={headerClassName}>
                            <span>{this.props.date.format('MMM YYYY')}</span>
                            <span>{this.props.date.format('DD')}</span>
                            <span>{this.props.date.format('dddd')}</span>
                        </div>
                    )
                }
                {slots}
            </div>
        );
    }
}

export default connect(mapStateToProps, null)(Day)
