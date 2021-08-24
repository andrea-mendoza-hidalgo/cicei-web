import React from 'react';
import { mount, shallow } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import Projects from './projects';
import axios from 'axios';
import '../../i18n';

describe('Project Render Test', () => {
  it('Project renders correctly ', () => {
    window.scrollTo = jest.fn();

    let wrapper = mount(
      <MemoryRouter>
        <Projects />
      </MemoryRouter>
    );
    expect(wrapper).toMatchSnapshot();
  });
});
