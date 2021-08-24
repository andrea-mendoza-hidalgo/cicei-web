import React from 'react';
import { mount } from 'enzyme';
import Navbar from './navbar';
import { Link, MemoryRouter } from 'react-router-dom';
import NavbarOptions from './navbar-options';
import { fireEvent, render, within } from '@testing-library/react';
import '../../../i18n';

describe('Navbar Render Test', () => {
  let navbar: any;
  beforeEach(async () => {
    navbar = mount(
      <MemoryRouter>
        <Navbar activeOption={'research'} activeDropdownOption={'projects'}/>
      </MemoryRouter>
    );
  });

  afterEach(() => {
    navbar.unmount();
  });
  it('Navbar renders correctly ', () => {
    expect(navbar).toMatchSnapshot();
  });

  it('when screen size it is lower than 960a and mouse enter, dropdown has to showed', async () => {
    global.innerWidth = 600;
    global.dispatchEvent(new Event('resize'));

    navbar.find('.menu__icon').simulate('click').simulate('click');

    const menu = navbar.find('.navbar__item').at(2).simulate('mouseenter');

    expect(menu.find(Link).props().to).toBe('/research');
  });

  it('when screen size it is lower than 960a and mouse leave, dropdown has to hide', async () => {
    global.innerWidth = 600;
    global.dispatchEvent(new Event('resize'));

    navbar.find('.menu__icon').simulate('click').simulate('click');

    navbar.find('.navbar__item').at(2).simulate('mouseenter');
    const menu = navbar.find('.navbar__item').at(2).simulate('mouseleave');

    expect(menu.find(Link).props().to).toBe('/research');
  });

  it('when screen size it is greater than 1020 and mouse enter, dropdown has to hide', async () => {

    global.innerWidth = 1020;
    global.dispatchEvent(new Event('resize'));

    navbar.find('.menu__icon').simulate('click').simulate('click');

    const menu = navbar.find('.navbar__item').at(2).simulate('mouseenter');

    expect(menu.find(Link).props().to).toBe('/research');
  });

  it('when screen size it is lower than 1020 and mouse leave, dropdown has to hide', async () => {
    global.innerWidth = 1020;
    global.dispatchEvent(new Event('resize'));

    navbar.find('.menu__icon').simulate('click').simulate('click');

    navbar.find('.navbar__item').at(2).simulate('mouseenter');
    const menu = navbar.find('.navbar__item').at(2).simulate('mouseleave');

    expect(menu.find(Link).at(0).props().to).toBe('/research');
  });
});

describe('Navbar options render text', () => {
  it('Navbar options renders correctly ', () => {
    const { getByRole } = render(
      <NavbarOptions
        languages={[
          { value: 'en-US', label: 'Eng' },
          { value: 'es-ES', label: 'Esp' }
        ]}
        currentLanguage={'en-US'}
      />
    );

    fireEvent.mouseDown(getByRole('button'));
    const listbox = within(getByRole('listbox'));
    fireEvent.click(listbox.getByText('Esp'));

    expect(listbox.getByText('Esp')).toBeInTheDocument();
  });
})