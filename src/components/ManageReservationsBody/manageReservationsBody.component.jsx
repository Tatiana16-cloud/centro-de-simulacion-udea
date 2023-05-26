import React, { useEffect, useState } from 'react';
import Table from '../Table/table.component';
import './manageReservationsBody.css'
import Toolbar from '../Toolbar/toolbar.component';
import Button from '../Button/button.component';
import FloatingWindow from '../FloatingWindow/floatingWindow.component';
import SearchBox from '../SearchBox/searchbox.component';
import Dropdown from '../Dropdown/dropdown.component';
import {formatDate, formatTime} from '../../Utils/dateUtils';
import AddReservation from '../AddReservation/AddReservation.component';
import ReservationService from '../../Services/reservation.service';

const ManageReservationsBody = ({someProp}) => {
  const[reservations,setReservations]=useState([])
  const [isCreateFormVisible, setIsCreateFormVisible] = useState(false);
  const reservationService = new ReservationService()

  useEffect(() => {
    getAllReservations()

  }, []);

  const getAllReservations = async()=>{
    const {response, error} = await reservationService.getAllData()
    if (error) {
      setReservations([]);
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
        <Button text={'Ingresar reserva'} onClick={()=>setIsCreateFormVisible(true)}></Button>
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
      { (isCreateFormVisible && (
            <FloatingWindow onClose={()=>setIsCreateFormVisible(false)}>
              <div className='add-reservation-form'>
                 <AddReservation />
              </div>
            </FloatingWindow>
          ))}
        <Table 
              data={reservations.map((reservation)=> ({
                activity: reservation.activity,
                responsible: reservation.responsible,
                location: reservation.location,
                date: formatDate(reservation.date),
                time: formatTime(reservation.start_time, reservation.end_time)
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
            {/* <AddReservation></AddReservation> */}
    </div>
  )
}

export default ManageReservationsBody