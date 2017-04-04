import React, { PropTypes } from 'react';
import { RaisedButton } from 'material-ui';

export default class SubmitButton extends React.Component {
    static propTypes = {
        label: PropTypes.string
    };

    static defaultProps = {
        label: 'Submit'
    }

    render() {
        return (
            <RaisedButton primary
                disabled={!this.context.isFormValid()}
                label={this.props.label}
                onTouchTap={this.context.submit}/>
        );
    }
}
