import React from 'react';
import { mount, shallow } from 'enzyme';
import { Link, MemoryRouter } from 'react-router-dom';
import '../../../i18n';
import { fireEvent, render, waitForElement, within } from '@testing-library/react';
import CustomModal from './modal';

const modalData = {
  _id: '5fc119e64748900603413058',
  projectCode: 'C3PO',
  projectTitle: 'Proyecto',
  projectInvestigator: '',
  projectStudent: 'Carlos Arias',
  projectDateStart: '2020-11-27',
  projectDateEnd: '2021-02-18',
  projectInstitution: 'Universidad Mayor de San Simon',
  projectFunding: 'Centro de Investigación de Ciencias Exactas e Ingenieria',
  projectBudget: '0',
  projectCurrency: 'Boliviano',
  projectProgress: '30',
  projectAbstract:
    'lorem ipsum asdasd asdadjasd lorem ipsum asdasd asdadjasd lorem ipsum asdasd asdadjasd lorem ipsum asdasd asdadjasd lorem ipsum asdasd asdadjasd lorem ipsum asdasd asdadjasd lorem ipsum asdasd asdadjasd lorem ipsum asdasd asdadjasd ',
  userOwner: '5fbf18465e2d8d00179f4645',
  __v: 0
};

const modalDetails = [
    { key: 'projectCode', label: 'code' },
    { key: 'projectTitle', label: 'title' },
    { key: 'projectInvestigator', label: 'investigator' },
    { key: 'projectInstitution', label: 'institution' },
    { key: 'projectStudent', label: 'collaborator'},
    { key: 'projectDateStart', label: 'dateStart'},
    { key: 'projectAbstract', label: 'abstract'}
  ];


describe('Modal Render Test', () => {
  it('Modal renders correctly ', () => {
    const handleModalOpen = jest.fn();

    let Modal = mount(
      <MemoryRouter>
        <CustomModal data={modalData} keys={modalDetails} state={true} title={'Proyecto'} handleClickClose={handleModalOpen} />
      </MemoryRouter>
    );
    
    expect(Modal).toMatchSnapshot();
  });

  it('Modal call handleClosed method correctly ', () => {
    const handleModalClosed = jest.fn();

    let Modal = mount(
      <MemoryRouter>
        <CustomModal data={modalData} keys={modalDetails} state={true} title={'Proyecto'} handleClickClose={handleModalClosed} />
      </MemoryRouter>
    );


    Modal.find('button').simulate('click');
    
    expect(handleModalClosed).toBeCalled();
  });
});
