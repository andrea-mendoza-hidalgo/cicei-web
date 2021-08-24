import React from 'react';
import { mount, shallow } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import axios from 'axios';
import '../../i18n';
import Publications from './publications';

describe('Publications Render Test', () => {
  it('Publications renders correctly ', () => {
    window.scrollTo = jest.fn();

    let wrapper = mount(
      <MemoryRouter>
        <Publications />
      </MemoryRouter>
    );
    expect(wrapper).toMatchSnapshot();
  });
});
