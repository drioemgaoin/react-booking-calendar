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
});
