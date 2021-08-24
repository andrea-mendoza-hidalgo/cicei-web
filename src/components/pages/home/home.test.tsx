import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import Home from './home';
import '../../../i18n';

describe('Home Render Test', () => {
  it('Home renders correctly ', () => {
    let home = mount(
      <MemoryRouter>
        <Home/>
      </MemoryRouter>
    );
    expect(home).toMatchSnapshot();
  });
});
