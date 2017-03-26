import React from 'react';
import { connect } from 'react-redux'

let mapStateToProps = (state) => {
  return {
    booking: {
      isBooked: state.isBooked
    }
  };
}

class Slot extends React.Component {
  constructor(props) {
      super(props)
  }

  renderBookingLink() {
    return this.props.isBooked
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

export default connect(mapStateToProps, null)(Slot)
