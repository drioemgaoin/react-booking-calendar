import React from 'react';
import moment from 'moment';

import {ViewType} from '../constant';
import {getSizeModifier} from '../util';

export default class DateSelector extends React.Component{
    onPreviousBound = this.onPrevious.bind(this);
    onNextBound = this.onNext.bind(this);

    constructor(props) {
        super(props);

        this.state = { date: props.date };
    }

    componentWillReceiveProps(nextProps) {
        if (!this.props.date.isSame(nextProps.date)) {
            this.setState({ date: nextProps.date });
        }
    }

    renderDate() {
        if (this.props.view === ViewType.Day) {
            return this.state.date.format('DD MMM YYYY')
        }

        if (this.props.view === ViewType.Week) {
            var startOfWeek = this.state.date.clone().startOf('isoweek');
            var endOfWeek   = this.state.date.clone().endOf('isoweek');
            return startOfWeek.format('DD MMM YYYY') + ' - ' + endOfWeek.format('DD MMM YYYY')
        }

        if (this.props.view === ViewType.Month) {
            return this.state.date.format('MMMM YYYY')
        }
    }

    isPastAvailable() {
        if (this.props.view === ViewType.Day) {
            return moment().isBefore(this.state.date, 'days');
        }

        if (this.props.view === ViewType.Week) {
            return moment().isBefore(this.state.date, 'weeks');
        }

        if (this.props.view === ViewType.Month) {
            return moment().isBefore(this.state.date, 'months');
        }
    }

    render() {
        const sizeModifier = 'rbc-date' + getSizeModifier(this.props.size);
        return (
            <div className={'rbc-date ' + sizeModifier}>
                {(this.props.pastAvailable || this.isPastAvailable()) && <span className='rbc-date__previous' onClick={this.onPreviousBound}></span>}
                <div className='rbc-date__date'>{this.renderDate()}</div>
                <span className='rbc-date__next' onClick={this.onNextBound}></span>
            </div>
        )
    }

    onPrevious(e) {
        e.preventDefault();

        this.changeDate(-1);
    }

    onNext(e) {
        e.preventDefault();

        this.changeDate(1);
    }

    changeDate(number_of_day) {
        const date = moment(this.state.date).add(number_of_day, this.props.view)
        this.setState({ date });

        if (this.props.change) {
            this.props.change(date);
        }
    }
}
