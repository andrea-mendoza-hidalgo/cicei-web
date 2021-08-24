import React from 'react';
import { mount,  } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import '../../../i18n';
import Page404 from './page-404';

describe('Page404 Render Test', () => {
  it('Page404 renders correctly ', () => {
    let wrapper = mount(
      <MemoryRouter>
        <Page404/>
      </MemoryRouter>
    );
    expect(wrapper).toMatchSnapshot();
  });
});
