import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import Container from 'react-responsive-ux-container';
import {omit} from 'lodash';

import CalendarHeader from './CalendarHeader';
import CalendarBody from './CalendarBody';

import { displayDayAction } from '../actions/calendarActions';
import { initBookingsAction, addBookingAction } from '../actions/bookingActions';
import '../../../../../node_modules/react-responsive-ux-container/dist/react-responsive-container.css';
import {getBookingsForDay, getBookingsForWeek, getBookingsForMonth, getTimesliceForDay, getTimesliceForWeek, getTimesliceForMonth} from '../util';

let mapStateToProps = (state, ownProps) => {
    const view = state.calendar.view;
    const date = state.calendar.date;

    const bookings = view === 'day'
    ? getBookingsForDay(state.booking.bookings, date)
    : view === 'week'
    ? getBookingsForWeek(state.booking.bookings, date)
    : getBookingsForMonth(state.booking.bookings, date);

    const timeSlices = view === 'day'
    ? getTimesliceForDay(ownProps.timeSlices, ownProps.timeExceptions, date)
    : view === 'week'
    ? getTimesliceForWeek(ownProps.timeSlices, ownProps.timeExceptions, date)
    : getTimesliceForMonth(ownProps.timeSlices, ownProps.timeExceptions, date);

    return {
        view,
        date,
        bookings: bookings.map(x => {
            x.startDate = moment.isMoment(x.startDate) ? x.startDate : moment(x.startDate);
            x.endDate = moment.isMoment(x.endDate) ? x.endDate : moment(x.endDate);
            x.isBooked = true;
            return x;
        }),
        ...omit(ownProps, ['timeExceptions', 'timeSlices']),
        timeSlices
    };
}

let mapDispatchToProps = (dispatch, ownProps) => {
    return {
        displayDayView: (date) => {
            dispatch(displayDayAction('day', date));
        },
        initBookings: (bookings) => {
            dispatch(initBookingsAction(bookings));
        }
    }
}

class CalendarContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showModal: false,
            booking: {}
        }
    }

    componentDidMount() {
        this.props.initBookings(this.props.bookings);
    }

    openModal(booking) {
        this.setState({ showModal: true, booking: booking });
    }

    hideModal(e) {
        if (e) {
            e.preventDefault();
        }

        this.setState({ showModal: false, booking: {}});
    }

    render() {
        return (
            <div className='rbc-calendar modal-container'>
                {
                    this.state.showModal && (
                        <Container type='Modal' visible={this.state.showModal}>
                            <div className='Content'>
                                <div className='content__header'>
                                    New Booking
                                    <button type="button" onClick={(e) => this.state.showModal ? this.hideModal(e) : this.showModal(booking)}>×</button>
                                </div>
                                <div className='content__body'>
                                    {
                                        this.props.body &&
                                        React.createElement(
                                            this.props.body.type,
                                            Object.assign({}, {
                                                ...this.props.body.props,
                                                booking: this.state.booking,
                                                bookings: this.props.body.props.bookings ? this.props.body.props.bookings : this.props.bookings,
                                                timeSlices: this.props.body.props.timeSlices ? this.props.body.props.timeSlices : this.props.timeSlices,
                                                onClose: this.hideModal.bind(this)
                                            })
                                        )
                                    }
                                </div>
                            </div>
                        </Container>
                    )
                }

                <CalendarHeader displayPast={this.props.displayPast} />
                <CalendarBody bookings={this.props.bookings}
                    timeSlot={this.props.timeSlot}
                    timeSlices={this.props.timeSlices}
                    view={this.props.view}
                    date={this.props.date}
                    displayPast={this.props.displayPast}
                    canViewBooking={this.props.canViewBooking}
                    displayDayView={this.props.displayDayView}
                    onDayClick={(booking) => this.openModal(booking)} />
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CalendarContainer)
