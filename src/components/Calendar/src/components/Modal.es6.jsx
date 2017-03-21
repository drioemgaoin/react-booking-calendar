import React from 'react';
import { connect } from 'react-redux'

import * as actions from '../actions/headerActions';

let mapStateToProps = (state) => {
  return {
    showModal: state.showModal,
    title: state.title,
    type: state.type
  };
}

let createHandlers = (dispatch) => {
  return {
    close: () => {
    	dispatch(actions.closeBookingAction());
    },
    validate: () => {
      dispatch(actions.validateBookingAction());
    }
  }
}

class Modal extends React.Component {
  constructor(props) {
    super(props);
  }

  submit() {
    this.props.close();
  }

  renderFooter() {
    if (this.props.type === 'OkCancel') {
      //TODO:  onClick - find a way to trigger form submit event
      return (
        <footer className='rc-modal-footer'>
          <button className='rc-modal-button' onClick={this.props.close}>Ok</button>
          <button className='rc-modal-button' onClick={this.props.close}>Cancel</button>
        </footer>
      )
    }
  }

  render() {
    const modalCss = this.props.showModal ? 'rc-modal in' : 'rc-modal';
    return (
      <div className={modalCss}>
        <div className='rc-modal-dialog'>
          <header className='rc-modal-header'>{this.props.title}</header>
          <div className='rc-modal-body'>Coming soon</div>
          {this.renderFooter()}
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, createHandlers)(Modal)
