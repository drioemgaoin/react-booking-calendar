import React from 'react/addons';
import ReactTestUtils from 'react-addons-test-utils';
import Calendar from '../src/components/Calendar';

describe('Calendar', function() {
  var element;

  beforeEach(function() {
    element = React.createElement(
      Calendar,
      {}
    );
  });

  it('should render', function() {
    expect(function() {
      ReactTestUtils.renderIntoDocument(element);
    }).not.toThrow();
  });
});
