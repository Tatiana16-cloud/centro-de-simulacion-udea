import React, { useState } from 'react';
import Table from '../Table/table.component';
import Toolbar from '../Toolbar/toolbar.component';
import SearchBox from '../SearchBox/searchbox.component';
import Dropdown from '../Dropdown/dropdown.component';
import './manageUsersBody.css';
import AddUserModal from '../AddUserModal/AddUserModal.component';

const ManageUsersBody = ({onActionEvent}) => {

  const dataExampleArray = [
    {
      someProperty1: 'someProperty1',
      someProperty2: 'someProperty2',
      someProperty3: 'someProperty3',
      someProperty4: 'someProperty4',
      someProperty5: 'someProperty5',
      someProperty6: 'someProperty6',
    },
  ];

  return (
    <div className="body">
      <Toolbar>
        <SearchBox />
        <Dropdown
          label={'Ordenar por:'}
          options={[
            { label: '', value: null },
            { label: 'Rol' },
            { label: 'Ordenar A - Z' },
            { label: 'Ordenar Z - A' },
          ]}
        />
      </Toolbar>
      <AddUserModal></AddUserModal>
    </div>
  );
};

export default ManageUsersBody;
