import React from 'react';
import moment from 'moment';
import MediaQuery from 'react-responsive';
import {find, filter} from 'lodash';
import {getBookingsForDay} from '../util';

import Day from "./Day";

export default class Week extends React.Component {
    render() {
        var days = [];

        if (this.props.date) {
            var startOfWeek = this.props.date.clone().startOf('isoweek');
            var endOfWeek = this.props.date.clone().endOf('isoweek');

            do
            {
                const date = startOfWeek.clone();
                const timeSlice = find(this.props.timeSlices, x => x.date.isSame(date, 'days'));
                const bookings = filter(this.props.bookings, x => x.startDate.isSame(date, 'days'));

                if (this.props.displayPast || date.isSameOrAfter(moment(), 'day')) {
                    days.push(
                        <div key={date}>
                            <MediaQuery minWidth={1400}>
                                <Day onClick={this.props.onClick}
                                    key={date}
                                    date={date}
                                    canViewBooking={this.props.canViewBooking}
                                    timeSlice={timeSlice}
                                    timeSlot={this.props.timeSlot}
                                    bookings={bookings} />
                            </MediaQuery>
                            <MediaQuery maxWidth={1400}>
                                <Day onClick={this.props.onClick}
                                    key={date}
                                    date={date}
                                    canViewBooking={this.props.canViewBooking}
                                    timeSlice={timeSlice}
                                    timeSlot={this.props.timeSlot}
                                    bookings={bookings}
                                    header={<div>{date.format('DD')}</div>}
                                    view='portrait' />
                            </MediaQuery>
                        </div>
                    );
                }
            }
            while(startOfWeek.add(1, 'days').diff(endOfWeek) < 0);
        }

        return (<div className='week'>{days}</div>);
    }
}
