import React, { PropTypes } from 'react';
import without from 'lodash.without';
import assign from 'lodash.assign';

const noop = () => undefined;

export default class Form extends React.Component  {
    validations: [];

    static propTypes = {
        children: PropTypes.node,
        values: PropTypes.object,
        update: PropTypes.func,
        reset: PropTypes.func,
        onSubmit: PropTypes.func
    };

    static defaultProps = {
        onSubmit: noop,
        update: noop,
        reset: noop,
        values: {}
    };

    registerValidation(isValidFunc) {
        this.validations = [...this.validations, isValidFunc];
        return this.removeValidation.bind(null, isValidFunc);
    }

    removeValidation(ref) {
        this.validations = without(this.validations, ref);
    }

    isFormValid(showErrors) {
        return this.validations.reduce((memo, isValidFunc) => isValidFunc(showErrors) && memo, true);
    }

    submit(){
        if (this.isFormValid(true)) {
            this.props.onSubmit(assign({}, this.props.values));
            this.props.reset();
        }
    }

    render() {
        return (
            <form>
                {this.props.children}
            </form>
        );
    }
}
