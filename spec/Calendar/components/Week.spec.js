import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import moment from 'moment';
import sinon from 'sinon';

import Week from '../../../src/components/Calendar/src/components/week/Week';

describe('Week', function() {
  it('should render no days if no date is setted', function() {
    const wrapper = shallow(<Week />);

    expect(wrapper.find('.day').children()).to.have.length(0);
  });
});
