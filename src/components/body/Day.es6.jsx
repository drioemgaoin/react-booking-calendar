import React from 'react';
import moment from 'moment';
import bem from 'bem-classname';
import {assign, find, times} from 'lodash';

import Slot from './Slot';
import {getDateTime, getStyle} from '../util';
import {ViewType} from '../constant';

export default class Day extends React.Component {
    startDiary = '08:00';
    endDiary = '20:00';

    static defaultProps = {
        view: 'landscape',
        timeSlot: 30,
        noHeader: false
    }

    createSlot(key, booking, numberOfColumn, numberOfSlot, clickable = true) {
        const style = getStyle(this.props.view, numberOfColumn, numberOfSlot);
        return <Slot key={key}
            onClick={clickable ? this.props.onClick : undefined}
            canViewBooking={this.props.canViewBooking}
            size={this.props.size}
            style={style}
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
        const booking = find(this.props.bookings, x => x.startDate.local().isBetween(currentSlot.startDate.local(), currentSlot.endDate.local(), null, '[)'));
        return booking ? Object.assign({}, booking, {
            startDate: booking.startDate.local(),
            endDate: booking.endDate.local()
        }) : undefined;
    }

    isDayOff() {
        return this.props.timeSlice &&
            this.props.timeSlice.off &&
            this.props.timeSlice.start === this.startDiary &&
            this.props.timeSlice.end === this.endDiary;
    }

    isOff(slot) {
        if (this.props.timeSlice && this.props.timeSlice.off) {
            const startOff = getDateTime(this.props.date, this.props.timeSlice.start);
            const endOff = getDateTime(this.props.date, this.props.timeSlice.end);

            return slot.startDate.isBetween(startOff, endOff, null, '[)');
        }

        return false;
    }

    renderHeader() {
        if (this.props.view !== ViewType.Day) {
            if (this.props.header)
            {
                return (<div className='day__header'>{this.props.header}</div>)
            }
            else if (this.props.date) {
                return (
                    <div className='day__header'>
                        <div className='day__header--important'>{this.props.date.format('DD')}</div>
                        <div>{this.props.date.format('dddd')}</div>
                    </div>
                )
            }
        }

        return undefined;
    }

    render() {
        let slots = [];

        if (this.props.date) {
            const startDiary = getDateTime(this.props.date, this.startDiary);
            const endDiary = getDateTime(this.props.date, this.endDiary);

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

                    if (this.props.view !== ViewType.Day) {
                        slots.push(this.createSlot(slots.length, {}, numberOfColumn, numberOfSlot));
                    }

                    currentSlot = this.nextSlot(numberOfSlot === 1 ? currentSlot.endDate : workStart);
                }

                while (currentSlot.startDate.isBefore(workEnd)) {
                    if (!this.props.displayPast && currentSlot.startDate.isBefore(moment())) {
                        if(this.props.view !== ViewType.Day) {
                            slots.push(this.createSlot(slots.length, {}, numberOfColumn, 1));
                        }

                        currentSlot = this.nextSlot(currentSlot.endDate);
                        continue;
                    }

                    // Check if slot match a off period
                    if (this.props.view !== ViewType.Day && this.isOff(currentSlot)) {
                        slots.push(this.createSlot(slots.length, {}, numberOfColumn, 1));
                        currentSlot = this.nextSlot(currentSlot.endDate);
                        continue;
                    }

                    let booking = this.getBooking(currentSlot);
                    if (booking) {
                        let numberOfSlot = 1;
                        if (this.props.view === ViewType.Day) {
                            slots.push(this.createSlot(slots.length, booking, numberOfColumn, 1));
                            currentSlot = this.nextSlot(booking.endDate);
                        } else {
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
                        }
                    } else {
                        const numberOfSlot = workEnd.isBefore(currentSlot.endDate)
                        ? workEnd.diff(currentSlot.startDate, 'minutes') / this.props.timeSlot
                        : 1;

                        const endDate = numberOfSlot === 1 ? currentSlot.endDate : workEnd;
                        const freeSlot = this.createBooking(currentSlot.startDate,  endDate);
                        const isClickable = currentSlot.startDate.isSameOrAfter(moment());
                        slots.push(this.createSlot(slots.length, freeSlot, numberOfColumn, numberOfSlot, isClickable));

                        currentSlot = this.nextSlot(endDate);
                    }
                }

                while (currentSlot.endDate.isSameOrBefore(endDiary)) {
                    const numberOfSlot = currentSlot.endDate.isAfter(endDiary)
                    ? endDiary.diff(currentSlot.startDate, 'minutes') / this.props.timeSlot
                    : 1;

                    if (this.props.view !== ViewType.Day) {
                        slots.push(this.createSlot(slots.length, {}, numberOfColumn, numberOfSlot));
                    }

                    currentSlot = this.nextSlot(numberOfSlot === 1 ? currentSlot.endDate : endDiary);
                }

                if (currentSlot.startDate.isBefore(endDiary)) {
                    const numberOfSlot = endDiary.diff(currentSlot.startDate, 'minutes') / this.props.timeSlot;
                    slots.push(this.createSlot(slots.length, {}, numberOfColumn, numberOfSlot));
                }
            }
        }

        return (
            <div className='day'>
                {this.renderHeader()}
                <div className='day__details'>
                    {slots}
                </div>
            </div>
        );
    }
}
