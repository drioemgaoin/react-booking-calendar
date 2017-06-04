import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import { shallow, mount } from 'enzyme';
import { expect } from 'chai';
import moment from 'moment';
import sinon from 'sinon';

import Month from '../../../src/components/Calendar/src/components/month/Month';
import Day from '../../../src/components/Calendar/src/components/day/Day';
import Slot from '../../../src/components/Calendar/src/components/slot/Slot';

describe('Month', function() {
  it('should render no days if no date is setted', function() {
    const wrapper = shallow(<Month />);

    expect(wrapper.find('.month').children()).to.have.length(0);
  });

  it('should render month a set of slot if viewport is less than 1024', function() {
    const date = moment('2017-05-31');
    const wrapper = shallow(<Month date={date} />);

    expect(wrapper.find('[maxWidth=1024]')).to.have.length(31);

    const startDay = 1;
    wrapper.find('[maxWidth=1024]').forEach(function(node, index) {
      const element = node.children().at(0);
      expect(element.type()).to.be.equal(Slot);
      expect(element.children().at(0).html()).to.be.equal('<span>' + (index < 9 ? '0' : '') + (startDay + index) + '</span>');
    });
  });

  it('should render month as a set of day if viewport is more than 1024', function() {
    const date = moment('2017-05-31');
    const wrapper = shallow(<Month date={date} />);

    expect(wrapper.find('[minWidth=1024]')).to.have.length(31);
    wrapper.find('[minWidth=1024]').forEach(function(node, index) {
      expect(node.children().at(0).type()).to.be.equal(Day);
    });
  });
});
