import React from 'react';
import { connect } from 'react-redux'

import * as actions from '../../actions/calendar';

let mapStateToProps = (state) => {
  return {
    showModal: state.calendar.showModal,
    title: state.calendar.title,
    type: state.calendar.type
  };
}

let createHandlers = (dispatch) => {
  return {
    close: () => {
    	dispatch(actions.closeBookingAction());
    }
  }
}

class Modal extends React.Component {
  constructor(props) {
    super(props);
  }

  renderFooter() {
    if (this.props.type === 'OkCancel') {
      return (
        <footer className='rc-modal-footer'>
          <button className='rc-modal-button'>Ok</button>
          <button className='rc-modal-button' onClick={this.props.close}>Cancel</button>
        </footer>
      )
    }
  }

  renderBody() {
    return (
      <div className='rc-modal-body'>
        <this.props.body close={this.props.close} />
      </div>
    )
  }

  render() {
    const modalCss = this.props.showModal ? 'rc-modal in' : 'rc-modal';
    return (
      <div className={modalCss}>
        <div className='rc-modal-dialog'>
          <header className='rc-modal-header'>{this.props.title}</header>
          {this.renderBody()}
          {this.renderFooter()}
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, createHandlers)(Modal)
