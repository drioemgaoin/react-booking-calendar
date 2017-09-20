import React from 'react';
import moment from 'moment';
import bem from 'bem-classname';
import _ from 'lodash';

export default class Slot extends React.Component {
    onClickBound = this.onClick.bind(this);

    isClickable() {
        return !this.props.isBooked || this.props.canViewBooking;
    }

    onClick(e) {
        e.preventDefault();

        if (this.props.onClick) {
            const values = _.omit(this.props, ['className', 'style', 'onClick', 'canViewBooking', 'numberOfSlot']);
            this.props.onClick(values);
        }
    }

    renderBookingLink() {
        return this.props.isBooked
        ? <span>Booked</span>
        : <span>Book</span>;
    }

    renderEmptySlot() {
        const className = bem('slot', ['inactive']);
        return <div className={className} style={this.props.style}></div>;
    }

    renderSlot() {
        const isBookedModifier = bem('slot', [this.props.isBooked ? 'booked' : 'free']);
        const isClickableModifier = bem('slot', [this.isClickable() ? 'clickable' : '']);
        return (
            <div className={isBookedModifier + ' ' + isClickableModifier}
                style={this.props.style}
                onClick={this.onClickBound}>
                {
                    this.props.children ? this.props.children
                    : (
                        <div>
                            <span className='slot__title'>{this.props.startDate.format('HH:mm')}</span>
                            <div className='slot__message'>{this.renderBookingLink()}</div>
                        </div>
                    )
                }
                </div>
            );
        }

        render() {
            return this.props.startDate
            ? this.renderSlot()
            : this.renderEmptySlot();
        }
    }
