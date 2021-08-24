import React from 'react';
import { mount,  } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import Researchers from './researchers';
import '../../i18n';

describe('Researchers Render Test', () => {
  it('Researchers view renders correctly ', () => {
    window.scrollTo = jest.fn();

    let wrapper = mount(
      <MemoryRouter>
        <Researchers />
      </MemoryRouter>
    );
    expect(wrapper).toMatchSnapshot();
  });
});