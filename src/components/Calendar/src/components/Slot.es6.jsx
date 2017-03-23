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

  renderSlot() {
    return this.state.isBooked
    ? <span>Booked</span>
    : <a onClick={this.props.onClick}>Book</a>
  }

  render() {
    return (
      <td className='rbc-slot'>
        <span>{this.props.time}</span>
        {this.renderSlot()}
      </td>
    )
  }
}
