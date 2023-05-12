import React, { useEffect, useState } from 'react';
import Table from '../Table/table.component';
import './manageReservationsBody.css'
import Toolbar from '../Toolbar/toolbar.component';
import Button from '../Button/button.component';
import SearchBox from '../SearchBox/searchbox.component';
import Dropdown from '../Dropdown/dropdown.component';
import AddReservation from '../AddReservation/AddReservation.component'

const ManageReservationsBody = ({someProp}) => {
  const dataExampleArray = [
    {
      someProperty1: 'Reanimación',
      someProperty2: 'Juliana Moreno',
      someProperty3: 'Sala 3',
      someProperty4: '17/05/2023',
      someProperty5: '4:00 p.m - 6:00 p.m',
      someProperty6: 'Botones',
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
            <AddReservation></AddReservation>
    </div>
  )
}

export default ManageReservationsBody