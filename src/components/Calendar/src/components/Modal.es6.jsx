import React from 'react';

import BookingContainer from './BookingContainer';

export default class Modal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      show: this.props.show,
      booking: this.props.booking
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.show !== nextProps.show) {
      this.setState({ show: nextProps.show })
    }

    if (this.state.booking !== nextProps.booking) {
      this.setState({ booking: nextProps.booking })
    }
  }

  hideModal(e) {
    if (e) {
      e.preventDefault();
    }

    this.setState({ show: false });
    document.body.className = document.body.className.replace(/ ?modal-open/, '');
  }

  renderHeader() {
    return (
      <header className='rbc-modal-header'>{this.props.header}</header>
    );
  }

  renderBody() {
    return (
      <div className='rbc-modal-body'>
        <BookingContainer body={this.props.body}
                          bookings={this.props.bookings}
                          timeSlice={this.props.timeSlice}
                          initialValues={this.state.booking}
                          onClose={(e) => this.hideModal(e)} />
      </div>
    );
  }

  render() {
    const modalCss = this.state.show ? 'rbc-modal in' : 'rbc-modal';
    return (
      <div className={modalCss}>
        {
          this.state.show && (
            <div className='rbc-modal-dialog'>
              {this.renderHeader()}
              {this.renderBody()}
            </div>
          )
        }
      </div>
    )
  }
}
