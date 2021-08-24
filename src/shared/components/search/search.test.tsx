import React from 'react';
import { mount } from 'enzyme';
import CustomSearch from './search';
import '../../../i18n';

describe('Home Render Test', () => {
  it('Home renders correctly ', () => {
    const handleSearchValue = jest.fn();
    let wrapper = mount(
      <CustomSearch
        class="search"
        placeholder="Search"
        searchFunction={handleSearchValue}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
