import React from 'react';
import { mount, shallow } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import Dropdown from './dropdown';
import '../../../i18n';

const dropdownItems= [
    { title: 'projects', path: '/projects', style: 'dropdown__link' },
    { title: 'publications', path: '/publications', style: 'dropdown__link' },
    { title: 'groups', path: '/groups', style: 'dropdown__link' }
  ]
describe('Dropdown Render Test', () => {
  it('Dropdown renders correctly ', () => {
    let wrapper = mount(
      <MemoryRouter>
        <Dropdown items={dropdownItems}/>
      </MemoryRouter>
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('Dropdown renders correctly ', () => {
    let wrapper = mount(
      <MemoryRouter>
        <Dropdown items={dropdownItems}/>
      </MemoryRouter>
    );

    const button = wrapper.find('ul');
    button.simulate('click')

    const link = wrapper.find('Link').at(0);
    link.simulate('click');

    expect(link.props().to).toBe('/projects');
  });
});
