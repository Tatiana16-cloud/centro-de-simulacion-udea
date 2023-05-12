import React, { useEffect, useState } from 'react';
import Table from '../Table/table.component';
import './manageLabsBody.css'
import Toolbar from '../Toolbar/toolbar.component';
import Button from '../Button/button.component';
import SearchBox from '../SearchBox/searchbox.component';
import Dropdown from '../Dropdown/dropdown.component';
import AddPractice from '../AddPractice/AddPractice.component';

const ManageLabsBody = ({someProp}) => {
  const dataExampleArray = [
    {
      someProperty1: 'someProperty1A',
      someProperty2: 'someProperty2A',
      someProperty3: 'someProperty3A',
      someProperty4: 'someProperty4A',
      someProperty5: 'someProperty5A',
      someProperty6: 'someProperty6A',
    }
  ]

  return (
    <div className='body'>
      <Toolbar>
        <Button text={'Ingresar práctica'}/>
        <SearchBox />
        <Dropdown
            label={'Filtrar por:'} 
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
              }))}  
              headers={[
                'Nombre de la práctica',
                'Lugar de realización',
                'Acciones'
              ]}
            />
            <AddPractice></AddPractice>
    </div>
  )
}

export default ManageLabsBody