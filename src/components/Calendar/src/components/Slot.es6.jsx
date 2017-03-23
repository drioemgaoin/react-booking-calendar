import React from 'react';

export default class Slot extends React.Component {
  constructor(props) {
      super(props)

      this.state = {
        isBooked: this.props.isBooked
      }
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.isBooked !== nextProps.isBooked) {
      this.setState({ isBooked: nextProps.isBooked })
    }
  }

  renderBookingLink() {
    return this.state.isBooked
    ? <span>Booked</span>
    : <a onClick={this.props.onClick}>Book</a>
  }

  render() {
    return (
      <td className='rbc-slot'>
        {
          this.props.time &&
          (
            <div>
              <span>{this.props.time}</span>
              { this.renderBookingLink() }
            </div>
          )
        }
      </td>
    )
  }
}
