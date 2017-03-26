import React from 'react';

import BookingContainer from './BookingContainer';

export default class Modal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      show: this.props.show
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.show !== nextProps.show) {
      this.setState({ show: nextProps.show })
    }
  }

  hideModal(e) {
    if (e) {
      e.preventDefault();
    }
    
    this.setState({ show: false })
  }

  renderHeader() {
    return (
      <header className='rc-modal-header'>{this.props.header}</header>
    );
  }

  renderBody() {
    return (
      <div className='rc-modal-body'>
        <BookingContainer body={this.props.body}
                          onClose={(e) => this.hideModal(e)} />
      </div>
    );
  }

  render() {
    const modalCss = this.state.show ? 'rc-modal in' : 'rc-modal';
    return (
      <div className={modalCss}>
        <div className='rc-modal-dialog'>
          {this.renderHeader()}
          {this.renderBody()}
        </div>
      </div>
    )
  }
}
