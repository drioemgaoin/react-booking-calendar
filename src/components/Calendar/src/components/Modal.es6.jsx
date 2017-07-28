import React from 'react';

import BookingContainer from './BookingContainer';

export default class Modal extends React.Component {
  booking;

  constructor(props) {
    super(props);

    this.state = {
      show: false,
    }
  }

  openModal(booking) {
      this.booking = booking;
      this.setState({ show: true });

      const initial = document.body.className;
      document.body.className = initial + (initial ? ' ' : '') + 'modal-open';
  }

  hideModal(e) {
    this.booking = {};

    this.setState({ show: false, booking: undefined });
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
                          initialValues={this.booking}
                          onClose={() => this.hideModal()} />
      </div>
    );
  }

  render() {
    if (this.state.show) {
      return (
        <div className='rbc-modal in'>
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

    return null
  }
}
