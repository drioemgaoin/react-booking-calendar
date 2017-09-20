import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import { shallow, mount } from 'enzyme';
import { expect } from 'chai';
import moment from 'moment';
import sinon from 'sinon';

import CalendarHeader from '../../../src/components/header/CalendarHeader';

function createMockStore(state) {
  return {
    subscribe: () => {},
    dispatch: () => {},
    getState: () => {
      return {...state};
    }
  };
}

describe('Calendar Header', function() {
  it('should render the day if view is setted to day', function() {
    const store = createMockStore({ calendar: { view: 'day', date: moment('2017-05-31') } });
    const wrapper = mount(<CalendarHeader store={store} />);

    expect(wrapper.find('.rbc-date').children().at(1).html()).to.be.equal('<span>31 May 2017</span>');
  });

  it('should render the week if view is setted to week', function() {
    const store = createMockStore({ calendar: { view: 'week', date: moment('2017-05-31') } });
    const wrapper = mount(<CalendarHeader store={store} />);

    expect(wrapper.find('.rbc-date').children().at(1).html()).to.be.equal('<span>29 May 2017 - 04 Jun 2017</span>');
  });

  it('should render the month if view is setted to month', function() {
    const store = createMockStore({ calendar: { view: 'month', date: moment('2017-05-31') } });
    const wrapper = mount(<CalendarHeader store={store} />);

    expect(wrapper.find('.rbc-date').children().at(1).html()).to.be.equal('<span>May 2017</span>');
  });

  it('should change the previous day when user clicks on the previous button while the day view is currently selected', function() {
    const dispatchSpy = sinon.spy();

    const store = createMockStore({ calendar: { view: 'day', date: moment('2017-05-31') } });
    store.dispatch = dispatchSpy;

    const wrapper = mount(<CalendarHeader store={store} />);

    wrapper.find('.rbc-date').children().at(0).simulate('click');

    const changeDateActionSpy = dispatchSpy.args[0][0];
    expect(changeDateActionSpy.type).to.be.equal('CHANGE_DATE');
    expect(changeDateActionSpy.date.format('DD/MM/YYYY')).to.be.equal('30/05/2017');
  });

  it('should change the next day when user clicks on the next button while the day view is currently selected', function() {
    const dispatchSpy = sinon.spy();

    const store = createMockStore({ calendar: { view: 'day', date: moment('2017-05-31') } });
    store.dispatch = dispatchSpy;

    const wrapper = mount(<CalendarHeader store={store} />);

    wrapper.find('.rbc-date').children().at(2).simulate('click');

    const changeDateActionSpy = dispatchSpy.args[0][0];
    expect(changeDateActionSpy.type).to.be.equal('CHANGE_DATE');
    expect(changeDateActionSpy.date.format('DD/MM/YYYY')).to.be.equal('01/06/2017');
  });
});
