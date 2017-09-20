import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import { shallow, mount } from 'enzyme';
import { expect } from 'chai';
import moment from 'moment';
import sinon from 'sinon';

import Week from '../../../src/components/body/Week';

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

  it('should render week as portrait view if viewport is less than 1024', function() {
    const date = moment('2017-05-24');
    const wrapper = shallow(<Week date={date} />);

    expect(wrapper.find('[maxWidth=1400]')).to.have.length(7);

    const startDay = 22;
    wrapper.find('[maxWidth=1400]').forEach(function(node, index) {
      const props = node.children().at(0).props();
      expect(props.view).to.be.equal('portrait');
      expect(shallow(props.header).html()).to.be.equal('<span>' + (startDay + index) + '</span>');
    });
  });

  it('should render week as landscape view if viewport is more than 1024', function() {
    const date = moment('2017-05-24');
    const wrapper = shallow(<Week date={date} />);

    expect(wrapper.find('[minWidth=1400]')).to.have.length(7);
    wrapper.find('[minWidth=1400]').forEach(function(node, index) {
      const props = node.children().at(0).props();
      expect(props.view).to.be.undefined;
    });
  });
});
