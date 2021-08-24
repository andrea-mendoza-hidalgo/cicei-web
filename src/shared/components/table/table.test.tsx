import React from 'react';
import { mount } from 'enzyme';
import { fireEvent, render, waitForElement, within } from '@testing-library/react';
import CustomTable from './table';
import { dataLink, list } from './table-data.mock';
import { TableProjectHeaders as headers, TableResearchersHeaders } from '../../files/table-headers';
import CustomLinkTable from './table-link';
import { MemoryRouter } from 'react-router-dom';
import '../../../i18n';

describe('Table Tests', () => {
  let table: any;
  const handleModalOpen = jest.fn();
  beforeEach(async () => {
    table = mount(<CustomTable headers={headers} data={list} handleClick={handleModalOpen} />);
  });

  afterEach(() => {
    table.unmount();
  });

  it('Table renders correctly ', () => {
    expect(table).toMatchSnapshot();
  });

  it('when screen size it is lower than 680 table has to show and open the collapse infomation', async () => {
    global.innerWidth = 680;
    global.dispatchEvent(new Event('resize'));

    table.find('.table__mobile').at(3).simulate('click');

    const menu = table.find('.border__open');

    expect(menu.exists('.border__open-main-row')).toBeTruthy;
  });

  it('when screen size it is between 630 and 750 table has to show three columns', async () => {
    global.innerWidth = 700;
    global.dispatchEvent(new Event('resize'));

    table.find('.table__mobile').at(3).simulate('click');

    expect(table).toMatchSnapshot();
  });

  it('when screen size it is between 420 and 629 table has to show three columns', async () => {
    global.innerWidth = 450;
    global.dispatchEvent(new Event('resize'));

    table.find('.table__mobile').at(3).simulate('click');

    expect(table).toMatchSnapshot();
  });

  it('when screen size it is lower than 420, table has to show three columns', async () => {
    global.innerWidth = 320;
    global.dispatchEvent(new Event('resize'));

    table.find('.table__mobile').at(3).simulate('click');

    expect(table).toMatchSnapshot();
  });

  it('when table is empty, mush show a empty table', async () => {
    const handleModalOpen = jest.fn();
    let wrapper = mount(<CustomTable headers={headers} data={[]} handleClick={handleModalOpen} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('Table calls handleModalOpen method correctly ', () => {
    table.find('.table__body-cell').at(13).simulate('click');
    expect(handleModalOpen).toBeCalled();
  });

  it('Table make ascending sorting correctly', () => {
    table.find('.table__body-cell').at(13).simulate('click');
    expect(handleModalOpen).toBeCalled();
  });

  it('Table make descending sorting correctly', () => {
    table.find('.table__header-cell').at(3).simulate('click').simulate('click');
    expect(table).toMatchSnapshot();
  });
});

describe('Table with links Tests', () => {
  it('Table with link renders correctly ', () => {
    let table = mount(
      <MemoryRouter>
        <CustomLinkTable
          headers={TableResearchersHeaders}
          data={dataLink}
          linksColumn="user_lastname"
          loading= {false}
        />
      </MemoryRouter>
    );
    expect(table).toMatchSnapshot();
  });

  it('when screen size it is lower than 680 table has to show and open the collapse infomation in table link', async () => {
    let table = mount(
      <MemoryRouter>
        <CustomLinkTable
          headers={TableResearchersHeaders}
          data={dataLink}
          linksColumn="user_lastname"
          loading= {false}
        />
      </MemoryRouter>
    );

    global.innerWidth = 680;
    global.dispatchEvent(new Event('resize'));

    table.find('.table__mobile').at(3).simulate('click');

    const menu = table.find('.border__open');

    expect(menu.exists('.border__open-main-row')).toBeTruthy;
  });

  it('when screen size it is between 630 and 750 table has to show three columns', async () => {
    let table = mount(
      <MemoryRouter>
        <CustomLinkTable
          headers={TableResearchersHeaders}
          data={dataLink}
          linksColumn="user_lastname"
          loading= {false}
        />
      </MemoryRouter>
    );
    global.innerWidth = 700;
    global.dispatchEvent(new Event('resize'));

    table.find('.table__mobile').at(3).simulate('click');

    expect(table).toMatchSnapshot();
  });

  it('when screen size it is between 420 and 629 table has to show three columns', async () => {
    let table = mount(
      <MemoryRouter>
        <CustomLinkTable
          headers={TableResearchersHeaders}
          data={dataLink}
          linksColumn="user_lastname"
          loading= {false}
        />
      </MemoryRouter>
    );
    global.innerWidth = 450;
    global.dispatchEvent(new Event('resize'));

    table.find('.table__mobile').at(3).simulate('click');

    expect(table).toMatchSnapshot();
  });

  it('when screen size it is lower than 420, table has to show three columns', async () => {
    let table = mount(
      <MemoryRouter>
        <CustomLinkTable
          headers={TableResearchersHeaders}
          data={dataLink}
          linksColumn="user_lastname"
          loading= {false}
        />
      </MemoryRouter>
    );
    global.innerWidth = 320;
    global.dispatchEvent(new Event('resize'));

    table.find('.table__mobile').at(3).simulate('click');

    expect(table).toMatchSnapshot();
  });

  it('Table make descending sorting correctly', () => {
    let table = mount(
      <MemoryRouter>
        <CustomLinkTable
          headers={TableResearchersHeaders}
          data={dataLink}
          linksColumn="user_lastname"
          loading= {false}
        />
      </MemoryRouter>
    );
    table.find('.table__header-cell').at(3).simulate('click').simulate('click');
    expect(table).toMatchSnapshot();
  });
});
