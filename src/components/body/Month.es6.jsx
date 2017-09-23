import React from 'react';
import moment from 'moment';
import {find, times, forEach, filter} from 'lodash';

import Day from "./Day";
import Slot from "./Slot";
import {ViewType} from '../constant';
import {getBookingsForDay, getSizeType} from '../util';

export default class Month extends React.Component {
    renderDay(date, style) {
        const timeSlice = find(this.props.timeSlices, x => x.date.isSame(date, 'days'));
        const bookings = filter(this.props.bookings, x => x.startDate.isSame(date, 'days'));

        return (
            <Day onClick={this.props.onDayClick}
                date={date}
                canViewBooking={this.props.canViewBooking}
                timeSlice={timeSlice}
                timeSlot={this.props.timeSlot}
                bookings={bookings}
                style={style}
                displayPast={this.props.displayPast}
                size={this.props.size} />
        );
    }

    renderSlot(date) {
        return (
            <Slot startDate={date}
                canViewBooking={this.props.canViewBooking}
                onClick={this.props.onSlotClick}
                size={this.props.size}>
                <div>{date && date.format('DD')}</div>
            </Slot>
        );
    }

    renderEmptySlot(time, index) {
        const sizeType = getSizeType(this.props.size);
        return times(time, x => {
            return (
                <div key={'empty-slot-' + index + '-' + x}>
                    {sizeType !== 'big' && this.renderSlot()}
                </div>
            );
        });
    }

    render() {
        const sizeType = getSizeType(this.props.size);

        if (this.props.view === ViewType.Day) {
            return this.renderDay(this.props.date, { width: '100%' });
        } else  {
            var days = [];

            if (this.props.date) {
                const daysInMonth = this.props.date.daysInMonth();

                for (var i = 1; i <= daysInMonth; i++) {
                    var date = this.props.date.set('date', i).clone();

                    if (date.date() === 1 && date.day() !== 1) {
                        days = days.concat(this.renderEmptySlot((date.day() > 1 ? date.day() : 7) - 1, i));
                    }

                    if (this.props.displayPast || date.isSameOrAfter(moment(), 'day')) {
                        days.push(
                            <div key={date}>
                                { sizeType !== 'big' ? this.renderSlot(date) : this.renderDay(date)}
                            </div>
                        )
                    } else {
                        days.push(this.renderEmptySlot(1, i));
                    }

                    if (date.date() === daysInMonth && date.date() !== 7) {
                        days = days.concat(this.renderEmptySlot(7 - date.day(), i));
                    }
                }
            }

            return (
                <div className={'rbc-month rbc-month--' + sizeType}>
                    <div className={'rbc-month__header'}>
                        {sizeType !== 'big' && times(7, x => (x + 1) % 7).map(x => <div key={'rbc-month__header__item--' + x}>{moment().day(x).format('dd')}</div>)}
                    </div>
                    <div className='rbc-month__details'>{days}</div>
                </div>
            )
        }
    }
}
