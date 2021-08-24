import React from 'react';
import { mount } from 'enzyme';
import Footer from './footer';
import '../../../i18n';

describe('Footer Render Test', () => {
  it('Footer renders correctly ', () => {
    let footer = mount(<Footer/>)
    expect(footer).toMatchSnapshot();
  });
});
