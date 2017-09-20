import React from 'react';
import moment from 'moment';

import { ViewType } from '../constant';
import DateSelector from './DateSelector';
import ViewSelector from './ViewSelector';

export default class CalendarHeader extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            view: props.view || ViewType.Month,
            date: props.date || moment()
        };
    }

    componentWillReceiveProps(nextProps) {
        if (!this.state.date.isSame(nextProps.date)) {
            this.setState({ date: nextProps.date });
        }

        if (this.state.view !== nextProps.view) {
            this.setState({ view: nextProps.view });
        }
    }

    render() {
        return (
            <div className='rbc-header'>
                <DateSelector view={this.state.view}
                              date={this.state.date}
                              change={this.props.dateChanged}
                              pastAvailable={this.props.pastAvailable} />

                <ViewSelector view={this.state.view}
                              change={this.props.viewChanged}
                              resources={this.props.resources['view']} />
            </div>
        );
    }
}
