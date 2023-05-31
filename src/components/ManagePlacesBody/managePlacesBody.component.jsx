import React, { useEffect, useState } from 'react';
import Table from '../Table/table.component';
import './managePlacesBody.css'
import Toolbar from '../Toolbar/toolbar.component';
import Button from '../Button/button.component';
import FloatingWindow from '../FloatingWindow/floatingWindow.component';
import SearchBox from '../SearchBox/searchbox.component';
import Dropdown from '../Dropdown/dropdown.component';
import AddPlace from '../AddPlace/AddPlace.component';
import PlaceService from '../../Services/place.service';

const ManagePlacesBody = ({someProp}) => {
  const[places,setPlaces]=useState([])
  const [isCreateFormVisible, setIsCreateFormVisible] = useState(false);
  const placeService = new PlaceService()

  useEffect(() => {
    getAllPlaces()

  }, []);

  const getAllPlaces = async()=>{
    const {response, error} = await placeService.getAllData()
    if (error) {
      setPlaces([]);
      // setPaginatedPlaces(null)
      // setFilteredPlaces(null)
      // setError(error);
    }else{
      setPlaces(response);
      // setPaginatedPlaces(paginatePlaces(response, currentPage, pageSize))
      // setFilteredPlaces(response)
      // setError(null);
    }

  }
  
  
  const dataExampleArray = [
    {
      someProperty1: 'Macrosimulacion',
      someProperty2: 'Salon 207',
      someProperty3: '20',
      someProperty4: 'Botones',
    }
  ]

  return (
    <div className='body'>
        <Toolbar>
        <Button text={'Ingresar espacio'} onClick={()=>setIsCreateFormVisible(true)}></Button>
          <SearchBox />
          <Dropdown
            label={'Filtrar por:'} 
            options={[
              { label: '', value: null},
              { label: 'Ordenar A - Z'},
              { label: 'Ordenar Z - A'},
            ]}
          />
        </Toolbar>
        { (isCreateFormVisible && (
            <FloatingWindow onClose={()=>setIsCreateFormVisible(false)}>
              <div className='add-place-form'>
                 <AddPlace />
              </div>
            </FloatingWindow>
          ))}
        <Table 
              data={places.map((place)=> ({
                name: place.name,
                max_capacity: place.max_capacity,
                location: place.location,
              }))}   
              headers={[
                'Nombre del espacio o sala',
                'N° de personas (aforo)',
                'Ubicación',
                'Gestión',
              ]}
              />
              {/* <AddPlace></AddPlace> */}
      </div>
    )
  }

export default ManagePlacesBody