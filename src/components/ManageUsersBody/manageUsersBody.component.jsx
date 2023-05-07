import React, { useEffect, useState } from 'react';
import Table from '../Table/table.component';
import Toolbar from '../Toolbar/toolbar.component';
import Button from '../Button/button.component'
import SearchBox from '../SearchBox/searchbox.component'
import Dropdown from '../Dropdown/dropdown.component'
import './manageUsersBody.css'
import AddUserModal from '../AddUserModal/AddUserModal.component';

const ManageUsersBody = ({someProp}) => {
  const dataExampleArray = [
    {
      someProperty1: 'someProperty1',
      someProperty2: 'someProperty2',
      someProperty3: 'someProperty3',
      someProperty4: 'someProperty4',
      someProperty5: 'someProperty5',
      someProperty6: 'someProperty6',
    }
  ]

  return (
    <div className='body'>
        <Toolbar>
              <Button text={'Ingresar Usuario'}/>
              <SearchBox/>
              <Dropdown 
                label={'Ordenar por:'} 
                options={[
                  { label: '', value: null},
                  { label: 'Rol'},
                  { label: 'Ordenar A - Z'},
                  { label: 'Ordenar Z - A'},
                ]}
                 
              />
        </Toolbar>
        <Table 
              data={dataExampleArray.map((element)=> ({
                someProperty1: element.someProperty1,
                someProperty2: element.someProperty2,
                someProperty3: element.someProperty3,
                someProperty4: element.someProperty4,
                someProperty5: element.someProperty5,
                someProperty6: element.someProperty6
              }))}  
              headers={[
                'Número de identificación',
                'Nombres y apellidos',
                'Correo electrónico',
                'Rol',
                'Número de celular',
                'Acciones'
              ]}
        />
    </div>
  )
}

export default ManageUsersBody