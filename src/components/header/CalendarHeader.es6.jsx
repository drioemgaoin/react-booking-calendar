import React from 'react';
import moment from 'moment';

import { ViewType } from '../constant';
import DateSelector from './DateSelector';
import ViewSelector from './ViewSelector';
import {getSizeModifier} from '../util';

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
        const sizeModifier = 'rbc-header' + getSizeModifier(this.props.size);
        return (
            <div className={'rbc-header ' + sizeModifier}>
                <DateSelector view={this.state.view}
                              date={this.state.date}
                              change={this.props.dateChanged}
                              pastAvailable={this.props.pastAvailable}
                              size={this.props.size} />

                <ViewSelector view={this.state.view}
                              change={this.props.viewChanged}
                              resources={this.props.resources['view']}
                              size={this.props.size} />
            </div>
        );
    }
}
