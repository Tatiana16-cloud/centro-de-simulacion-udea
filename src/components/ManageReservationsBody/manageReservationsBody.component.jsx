import React, { useEffect, useState } from 'react';
import Table from '../Table/table.component';
import './manageReservationsBody.css'
import Toolbar from '../Toolbar/toolbar.component';
import Button from '../Button/button.component';
import SearchBox from '../SearchBox/searchbox.component';
import Dropdown from '../Dropdown/dropdown.component';

const ManageReservationsBody = ({someProp}) => {
  const dataExampleArray = [
    {
      someProperty1: 'someProperty1C',
      someProperty2: 'someProperty2C',
      someProperty3: 'someProperty3C',
      someProperty4: 'someProperty4C',
      someProperty5: 'someProperty5C',
      someProperty6: 'someProperty6C',
    }
  ]

  return (
    <div className='body'>
      <Toolbar>
        <Button text={'Ingresar reserva'}></Button>
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
                someProperty5: element.someProperty5,
                someProperty6: element.someProperty6
              }))}  
              headers={[
                'Nombre de la práctica',
                'Encargado',
                'Lugar',
                'Fecha',
                'Horario',
                'Gestión'
              ]}
            />
    </div>
  )
}

export default ManageReservationsBody