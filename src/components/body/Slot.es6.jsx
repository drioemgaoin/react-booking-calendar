import React from 'react';
import moment from 'moment';
import bem from 'bem-classname';
import _ from 'lodash';

import {getSizeType} from '../util';

export default class Slot extends React.Component {
    onClickBound = this.onClick.bind(this);

    isClickable() {
        return this.props.onClick && (!this.props.isBooked || this.props.canViewBooking);
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
        const className = bem('rbc-slot', ['inactive']);
        return <div className={className} style={this.props.style}></div>;
    }

    renderSlot() {
        const sizeTypeModifier = bem('rbc-slot--' + getSizeType(this.props.size));
        const isBookedModifier = bem('rbc-slot', [this.props.isBooked ? 'booked' : 'free']);
        const isClickableModifier = bem('rbc-slot', [this.isClickable() ? 'clickable' : '']);
        return (
            <div className={isBookedModifier + ' ' + isClickableModifier + ' ' + sizeTypeModifier}
                style={this.props.style}
                onClick={this.onClickBound}>
                {
                    this.props.children ? this.props.children
                    : (
                        <div>
                            <div>
                                <span className='rbc-slot__title'>{this.props.startDate.format('HH:mm')}</span>
                                <div className='rbc-slot__message'>{this.renderBookingLink()}</div>
                            </div>
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
