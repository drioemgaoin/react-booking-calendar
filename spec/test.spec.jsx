import React from 'react/addons';
import Test from '../src/Calendar';

describe('Calendar', function() {
  var component;

  beforeEach(function() {
    component = React.addons.TestUtils.renderIntoDocument(
      <Calendar/>
    );
  });

  it('should render', function() {
    expect(component.getDOMNode().className).toEqual('test');
  });
});
