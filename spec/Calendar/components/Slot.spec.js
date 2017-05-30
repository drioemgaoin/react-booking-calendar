import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import Slot from '../../../src/components/Calendar/src/components/Slot';

describe('Slot', function() {
  it('should render an empty slot if not date is provider', function() {
    const wrapper = shallow(<Slot />);

    expect(wrapper.find('.inactive')).to.have.length(1);
    expect(wrapper.find('.inactive').text()).to.be.empty;

  });
});
