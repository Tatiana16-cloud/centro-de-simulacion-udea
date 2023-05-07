import React, { useEffect, useState } from 'react';
import Table from '../Table/table.component';
import './managePlacesBody.css'
import Toolbar from '../Toolbar/toolbar.component';
import Button from '../Button/button.component';
import SearchBox from '../SearchBox/searchbox.component';
import Dropdown from '../Dropdown/dropdown.component';

const ManagePlacesBody = ({someProp}) => {
  const dataExampleArray = [
    {
      someProperty1: 'someProperty1B',
      someProperty2: 'someProperty2B',
      someProperty3: 'someProperty3B',
      someProperty4: 'someProperty4B',
      someProperty5: 'someProperty5B',
    }
  ]

  return (
    <div className='body'>
        <Toolbar>
          <Button text={'Ingresar espacio'}/>
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
                someProperty4: element.someProperty4,
              }))}  
              headers={[
                'Nombre del espacio o sala',
                'Ubicación',
                'N° de personas (aforo)',
                'Gestión',
              ]}
            />
    </div>
  )
}

export default ManagePlacesBody