import React from 'react';
import { connect } from 'react-redux'
import moment from 'moment';
import {find, isEqual} from 'lodash';

import Month from "./month/Month";
import Day from "./day/Day";
import Week from "./week/Week";
import {getBookingsForDay} from '../util';

export default class CalendarBody extends React.Component {
    onSlotClickedBound = this.onSlotClicked.bind(this);

    getDate(isStart) {
        const currentDay = this.props.date.format('dddd').toLowerCase();
        return isStart
        ? this.props.timeSlices[currentDay].start
        : this.props.timeSlices[currentDay].end;
    }

    onSlotClicked(datas) {
        if (this.props.displayDayView) {
            this.props.displayDayView(datas.startDate);
        }
    }

    renderContent() {
        if (this.props.view === 'day') {
            const timeSlice = find(this.props.timeSlices, x => x.date.format('dddd') === this.props.date.format('dddd'));
            const bookings = getBookingsForDay(this.props.bookings, this.props.date);

            return (
                <Day onClick={this.props.onDayClick}
                    date={this.props.date}
                    canOpenBookedSlot={this.props.canViewBooking}
                    timeSlice={timeSlice}
                    timeSlot={this.props.timeSlot}
                    bookings={bookings}
                    style={{ width: '100%' }}
                    displayPast={this.props.displayPast} />
            )
        }

        if (this.props.view === 'month') {
            return <Month onDayClick={this.props.onDayClick}
                onSlotClick={this.onSlotClickedBound}
                date={this.props.date}
                canViewBooking={this.props.canViewBooking}
                timeSlices={this.props.timeSlices}
                timeSlot={this.props.timeSlot}
                bookings={this.props.bookings}
                displayPast={this.props.displayPast} />
        }

        if (this.props.view === 'week') {
            return <Week onClick={this.props.onDayClick}
                date={this.props.date}
                canViewBooking={this.props.canViewBooking}
                timeSlices={this.props.timeSlices}
                timeSlot={this.props.timeSlot}
                bookings={this.props.bookings}
                displayPast={this.props.displayPast} />
        }
    }

    render() {
        return (<div className='rbc-body'>{this.renderContent()}</div>);
    }
}
