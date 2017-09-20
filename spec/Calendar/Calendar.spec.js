import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import Calendar from '../../src/components/Calendar';

describe('Calendar', function() {
  var element;

  beforeEach(function() {
    element = React.createElement(
      Calendar,
      {}
    );
  });

  it('should render without any error(s)', function() {
    expect(function() {
      ReactTestUtils.renderIntoDocument(element);
    }).not.toThrow();
  });
});
