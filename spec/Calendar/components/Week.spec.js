import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import { shallow, mount } from 'enzyme';
import { expect } from 'chai';
import moment from 'moment';
import sinon from 'sinon';

import Week from '../../../src/components/Calendar/src/components/week/Week';

describe('Week', function() {
  it('should render no days if no date is setted', function() {
    const wrapper = shallow(<Week />);

    expect(wrapper.find('.week').children()).to.have.length(0);
  });

  it('should render 7 days if date is setted', function() {
    const date = moment('2017-05-31');
    const wrapper = shallow(<Week date={date} />);

    expect(wrapper.find('.week').children()).to.have.length(7);
  });
});
