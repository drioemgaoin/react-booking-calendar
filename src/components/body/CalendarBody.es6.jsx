import React from 'react';
import moment from 'moment';
import {find, isEqual} from 'lodash';

import Month from "./Month";
import Day from "./Day";
import Week from "./Week";
import {getBookingsForDay} from '../util';
import {ViewType} from '../constant';

export default class CalendarBody extends React.Component {
    onSlotClicked(datas) {
        if (this.props.slotCliked) {
            this.props.slotCliked(datas.startDate);
        }
    }

    renderDayView() {
        return (
            <Day onClick={this.props.slotClicked}
                date={this.props.date}
                canOpenBookedSlot={this.props.canViewBooking}
                timeSlice={this.props.timeSlices}
                timeSlot={this.props.timeSlot}
                bookings={this.props.bookings}
                displayPast={this.props.displayPast}
                view={this.props.view}
                size={this.props.size} />
        )
    }

    renderWeekView() {
        return <Week onClick={this.props.slotClicked}
            date={this.props.date}
            canViewBooking={this.props.canViewBooking}
            timeSlices={this.props.timeSlices}
            timeSlot={this.props.timeSlot}
            bookings={this.props.bookings}
            displayPast={this.props.displayPast}
            view={this.props.view}
            size={this.props.size} />
    }

    renderMonthView() {
        return <Month onDayClick={this.props.slotClicked}
            onSlotClick={this.props.dayClicked}
            date={this.props.date}
            view={this.props.view}
            canViewBooking={this.props.canViewBooking}
            timeSlices={this.props.timeSlices}
            timeSlot={this.props.timeSlot}
            bookings={this.props.bookings}
            displayPast={this.props.displayPast}
            view={this.props.view}
            size={this.props.size} />
    }

    render() {
        return (
            <div className='rbc-body'>
                {this.props.view === ViewType.Day && this.renderDayView()}
                {this.props.view === ViewType.Week && this.renderWeekView()}
                {this.props.view === ViewType.Month && this.renderMonthView()}
            </div>
        );
    }
}
