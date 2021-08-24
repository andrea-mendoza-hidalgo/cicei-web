import React from 'react';
import { mount } from 'enzyme';
import TabPanel from './tab-panel';
import '../../../i18n';

describe('Tab panel Render Test', () => {
  it('Tab panel renders correctly ', () => {
    let wrapper = mount(
        <TabPanel value={0} index={0}></TabPanel>
    );
    expect(wrapper).toMatchSnapshot();
  });
});
