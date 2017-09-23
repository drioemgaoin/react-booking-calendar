import React from 'react';
import ReactDOM from 'react-dom';
import Container from 'react-responsive-ux-container';

import {Calendar} from '../index';

import '../../node_modules/react-responsive-ux-container/dist/react-responsive-container.css';
import './style.css';

export default class Booking extends React.Component {
    onSlotChoosenBound = this.onSlotChoosen.bind(this);
    onCloseBound = this.onClose.bind(this);
    onSubmitBound = this.onSubmit.bind(this);

    constructor(props) {
        super(props);

        this.state = {
            bookings: props.bookings || [],
            booking: props.booking,
            show: false
        };
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value});
    }

    render() {
        return (
            <div className='example'>
                {
                    this.state.show &&
                    (
                        <Container type='Modal' visible={this.state.show}>
                            <div className='loader__container'>
                                <div className='content__header'>
                                    New Booking
                                    <button type="button" className='content__header__button' onClick={this.onCloseBound}>×</button>
                                </div>
                                <div className='content__body'>
                                    Your form here
                                </div>
                                <div className='content__footer'>
                                    <button className='btn btn-primary' type='submit' onClick={this.onSubmitBound}>OK</button>
                                    <button className='btn btn-primary' type='button' onClick={this.onCloseBound}>Cancel</button>
                                </div>
                            </div>
                        </Container>
                    )
                }

                <Calendar bookings={this.state.bookings}
                    timeSlot={this.props.timeSlot}
                    timeSlices={this.props.timeSlices}
                    timeExceptions={this.props.timeExceptions}
                    canViewBooking={true}
                    onSlotChoosen={this.onSlotChoosenBound}>
                </Calendar>
            </div>
        );
    }

    onClose(e) {
        e.preventDefault();

        this.setState({ show: false });
    }

    onSlotChoosen(booking) {
        this.setState({ show: true, booking });
    }

    onSubmit(e) {
        e.preventDefault();

        this.setState({
            bookings: this.state.bookings.concat([this.state.booking]),
            booking: undefined,
            show: false
        });
    }
}
