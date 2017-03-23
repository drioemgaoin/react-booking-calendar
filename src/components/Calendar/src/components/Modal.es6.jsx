import React from 'react';

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

  renerHeader() {
    return (
      <header className='rc-modal-header'>{this.props.header}</header>
    );
  }

  renderBody() {
    return (
      <div className='rc-modal-body'>{this.props.body}</div>
    );
  }

  renderFooter() {
    return (
      <footer className='rc-modal-footer'>
        {
          this.props.footer
          ? this.props.footer
          : (<button className='rc-modal-button' onClick={this.props.onClose}>Ok</button>)
        }
      </footer>
    );
  }

  render() {
    const modalCss = this.state.show ? 'rc-modal in' : 'rc-modal';
    return (
      <div className={modalCss}>
        <div className='rc-modal-dialog'>
          {this.renerHeader()}
          {this.renderBody()}
          {this.renderFooter()}
        </div>
      </div>
    )
  }
}
