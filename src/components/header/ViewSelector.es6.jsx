import React from 'react';

import {ViewType} from '../constant';
import {getSizeModifier} from '../util';

export default class ViewSelector extends React.Component{
    onClickBound = this.onClick.bind(this);

    getModifier(view) {
        return view === this.props.view ? ' rbc-view__button--active' : '';
    }

    render() {
        const sizeModifier = 'rbc-view' + getSizeModifier(this.props.size);
        return (
            <div className={'rbc-view ' + sizeModifier}>
                {
                    Object.keys(ViewType).map(key => {
                        const modifier = this.getModifier(ViewType[key]);
                        return (
                            <button key={key}
                                    data-view={ViewType[key]}
                                    className={'rbc-view__button' + modifier}
                                    onClick={this.onClickBound}>
                                {this.props.resources[key]}
                            </button>
                        )
                    })
                }
            </div>
        )
    }

    onClick(e) {
        e.preventDefault();

        if (this.props.change) {
            const view = e.currentTarget.dataset.view
            this.props.change(view);
        }
    }
}
