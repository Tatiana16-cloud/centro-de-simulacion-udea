import React, { useEffect, useState } from 'react';
import ReservationService from '../../Services/reservation.service';
import Table from '../Table/table.component';
import './manageReservationsBody.css'
import Toolbar from '../Toolbar/toolbar.component';
import Button from '../Button/button.component';
import SearchBox from '../SearchBox/searchbox.component';
import Dropdown from '../Dropdown/dropdown.component';
import AddReservation from '../AddReservation/AddReservation.component'

const ManageReservationsBody = ({someProp}) => {
  const[reservations,setReservations]=useState(null)

  const reservationService = new ReservationService()

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

  useEffect(() => {
    getAllReservations()
  }, []);

  const getAllReservations = async()=>{
    const {response, error} = await reservationService.getAllData()
    
    if (error) {
      setReservations(null);
      // setPaginatedReservations(null)
      // setFilteredReservations(null)
      // setError(error);
    }else{
      setReservations(response);
      // setPaginatedReservations(paginateReservations(response, currentPage, pageSize))
      // setFilteredReservations(response)
      // setError(null);
    }


  }

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
              data={reservations.map((reservation)=> ({
                id: reservation.id,
                activity: reservation.activity,
                responsible: reservation.responsible,
                location: reservation.location,
                date: reservation.date,
                start_time: reservation.start_time
              }))}  
              headers={[
                'ID',
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