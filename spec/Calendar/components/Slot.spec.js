import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import moment from 'moment';
import sinon from 'sinon';

import Slot from '../../../src/components/body/Slot';

describe('Slot', function() {
  it('should render an empty slot if not date is provided', function() {
    const wrapper = shallow(<Slot />);

    expect(wrapper.find('.slot--inactive')).to.have.length(1);
    expect(wrapper.find('.slot--inactive').text()).to.be.empty;
  });

  it('should render a free slot if date is provided and it is not booked yet', function() {
    const date = moment().hour(8).minute(45);
    const wrapper = shallow(<Slot startDate={date} />);

    expect(wrapper.find('.slot--free')).to.have.length(1);
    expect(wrapper.find('.slot--free').childAt(0).text()).to.be.equal('08:45');
    expect(wrapper.find('.slot--free').childAt(1).text()).to.be.equal('Book');
  });

  it('should render a booked slot if date is provided and it is booked', function() {
    const date = moment().hour(8).minute(45);
    const wrapper = shallow(<Slot startDate={date} isBooked={true} />);

    expect(wrapper.find('.slot--booked')).to.have.length(1);
    expect(wrapper.find('.slot--booked').childAt(0).text()).to.be.equal('08:45');
    expect(wrapper.find('.slot--booked').childAt(1).text()).to.be.equal('Booked');
  });

  it('should be able to click on the slot if it is booked and view is allowed', function() {
    const date = moment().hour(8).minute(45);
    const onSlotClick = sinon.spy();

    const wrapper = shallow(<Slot startDate={date} isBooked={true} canViewBooking={true} onClick={onSlotClick} />);

    wrapper.find('.slot--clickable').simulate('click', { preventDefault() {} });

    expect(onSlotClick.calledOnce).to.equal(true);
  });
});
