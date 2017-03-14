import React from 'react';

import Month from "./Month";

export default class Calendar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Month />
      </div>
    );
  }
}
