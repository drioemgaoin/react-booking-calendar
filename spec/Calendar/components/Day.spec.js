import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import { shallow, mount } from 'enzyme';
import { expect } from 'chai';
import moment from 'moment';
import sinon from 'sinon';

import Day from '../../../src/components/Calendar/src/components/day/Day';

function createMockStore(state) {
  return {
    subscribe: () => {},
    dispatch: () => {},
    getState: () => {
      return {...state};
    }
  };
}

function expectSlots(wrapper, start, end, className) {
  for(let i = start; i < end; i++) {
    expect(wrapper.find('.slot').at(i).hasClass(className)).to.equal(true);
  }
}

describe('Day', function() {
  it('should render an empty header if no date or header are setted', function() {
    const store = createMockStore({ booking: { bookings: [] } });
    const wrapper = shallow(<Day store={store} />);

    expect(wrapper.find('.day__header')).to.have.length(0);
  });

  it('should render the custom header if it has been setted', function() {
    const store = createMockStore({ booking: { bookings: [] } });
    const header = <div>Custom Header</div>;
    const wrapper = mount(<Day store={store} header={header} />);

    expect(wrapper.find('.day__header').contains(header)).to.equal(true);
  });

  it('should render the default header if date has been setted', function() {
    const store = createMockStore({ booking: { bookings: [] } });
    const date = moment('2017-05-31');

    const wrapper = mount(<Day store={store} date={date} />);

    expect(wrapper.find('.day__header').childAt(0).text()).to.equal('May 2017');
    expect(wrapper.find('.day__header').childAt(1).text()).to.equal('31');
    expect(wrapper.find('.day__header').childAt(2).text()).to.equal('Wednesday');
  });

  it('should render only free slots if no booking and timetable are setted', function() {
    const store = createMockStore({ booking: { bookings: [] } });
    const date = moment('2017-05-31');

    const wrapper = mount(<Day store={store} date={date} />);

    // 24 slots of 30 minutes from 8AM to 20PM
    expect(wrapper.find('.slot')).to.have.length(24);
  });

  it('should render correclty inactive and free slot if timeSlice is setted', function() {
    const store = createMockStore({ booking: { bookings: [] } });
    const date = moment('2017-05-31');

    const wrapper = mount(<Day store={store} date={date} timeSlice={{ day: 'Wednesday', start: '10:00', end: '18:00' }} />);

    // 16 slots of 30 minutes from 10AM to 18PM
    // |I|I|I|I|F|F|F|F|F|F|F|F|F|F|F|F|F|F|F|F|I|I|I|I|
    expect(wrapper.find('.slot')).to.have.length(24);
    expectSlots(wrapper, 0, 4, 'slot--inactive');
    expectSlots(wrapper, 4, 20, 'slot--free');
    expectSlots(wrapper, 20, 24, 'slot--inactive');
  });

  it('should render half inactive/half free slot if the timeSlice is not a modulo of the slot', function() {
    const store = createMockStore({ booking: { bookings: [] } });
    const date = moment('2017-05-31');

    const wrapper = mount(<Day store={store} date={date} timeSlice={{ day: 'Wednesday', start: '10:15', end: '18:00' }} />);

    // |I|I|I|I|I|F|F|F|F|F|F|F|F|F|F|F|F|F|F|F|F|I|I|I|I|
    expect(wrapper.find('.slot')).to.have.length(25);
    expectSlots(wrapper, 0, 5, 'slot--inactive');
    expect(wrapper.find('.slot').at(5).childAt(0).text()).to.be.equal('10:15');
    expectSlots(wrapper, 5, 21, 'slot--free');
    expectSlots(wrapper, 21, 25, 'slot--inactive');
  });

  it('should render a slot reduced by a proportional number slot if there is a booking lasting less than a slot', function() {
    const date = moment('2017-05-31');
    const startDate = moment('2017-05-31 10:15:00');
    const endDate = moment('2017-05-31 10:30:00');
    const store = createMockStore({ booking: { bookings: [{ startDate, endDate, isBooked: true }] } });

    const wrapper = mount(<Day store={store} date={date} timeSlice={{ day: 'Wednesday', start: '10:00', end: '18:00' }} />);

    // |I|I|I|I|F|B|F|F|F|F|F|F|F|F|F|F|F|F|F|F|F|I|I|I|I|
    expect(wrapper.find('.slot')).to.have.length(25);
    expectSlots(wrapper, 0, 4, 'slot--inactive');
    expectSlots(wrapper, 4, 5, 'slot--free');
    expect(wrapper.find('.slot').at(5).childAt(0).text()).to.be.equal('10:15');
    expectSlots(wrapper, 5, 6, 'slot--booked');
    expectSlots(wrapper, 6, 21, 'slot--free');
    expectSlots(wrapper, 21, 25, 'slot--inactive');
  });

  it('should render a slot expanded by a proportional number slot if there is a booking lasting more than a slot', function() {
    const date = moment('2017-05-31');
    const startDate = moment('2017-05-31 10:15:00');
    const endDate = moment('2017-05-31 11:30:00');
    const store = createMockStore({ booking: { bookings: [{ startDate, endDate, isBooked: true }] } });

    const wrapper = mount(<Day store={store} date={date} timeSlice={{ day: 'Wednesday', start: '10:00', end: '18:00' }} />);

    // |I|I|I|I|F|B|F|F|F|F|F|F|F|F|F|F|F|F|F|I|I|I|I|
    expect(wrapper.find('.slot')).to.have.length(23);
    expectSlots(wrapper, 0, 4, 'slot--inactive');
    expectSlots(wrapper, 4, 5, 'slot--free');
    expect(wrapper.find('.slot').at(5).childAt(0).text()).to.be.equal('10:15');
    expectSlots(wrapper, 5, 6, 'slot--booked');
    expect(wrapper.find('.slot').at(6).childAt(0).text()).to.be.equal('11:30');
    expectSlots(wrapper, 6, 19, 'slot--free');
    expectSlots(wrapper, 19, 23, 'slot--inactive');
  });

  it('should not render a booking if it is out of the range of work time', function() {
    const date = moment('2017-05-31');
    const startDate = moment('2017-05-31 08:00:00');
    const endDate = moment('2017-05-31 08:30:00');
    const store = createMockStore({ booking: { bookings: [{ startDate, endDate, isBooked: true }] } });

    const wrapper = mount(<Day store={store} date={date} timeSlice={{ day: 'Wednesday', start: '10:00', end: '18:00' }} />);

    // |I|I|I|I|F|F|F|F|F|F|F|F|F|F|F|F|F|F|F|F|I|I|I|I|
    expect(wrapper.find('.slot')).to.have.length(24);
    expectSlots(wrapper, 0, 4, 'slot--inactive');
    expectSlots(wrapper, 4, 20, 'slot--free');
    expectSlots(wrapper, 20, 24, 'slot--inactive');
  });
});
