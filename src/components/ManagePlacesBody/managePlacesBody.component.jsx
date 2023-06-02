import React, { useEffect, useState } from 'react';
import Table from '../Table/table.component';
import './managePlacesBody.css'
import Toolbar from '../Toolbar/toolbar.component';
import Modal from '../Modal/Modal.component';
import Button from '../Button/button.component';
import FloatingWindow from '../FloatingWindow/floatingWindow.component';
import SearchBox from '../SearchBox/searchbox.component';
import Dropdown from '../Dropdown/dropdown.component';
import AddPlace from '../AddPlace/AddPlace.component';
import PlaceService from '../../Services/place.service';

const ManagePlacesBody = ({someProp}) => {
  const[places,setPlaces]=useState([])
  const [error, setError]=useState(null)
  const [isOpen, setIsOpen] = useState(null);
  const [modalMessage, setModalMessage] = useState(null);
  const [editablePlace, setEditablePlace] = useState(null);
  const [isCreateFormVisible, setIsCreateFormVisible] = useState(false);
  const [isEditFormVisible, setIsEditFormVisible] = useState(false);
  const placeService = new PlaceService()

  useEffect(() => {
    getAllPlaces()

  }, []);

  const getAllPlaces = async()=>{
    const {response, error} = await placeService.getAllData()
    if (error) {
      setPlaces([]);
    }else{
      setPlaces(response);
    }

  }

  const onEditEvent =(data)=>{
    setIsEditFormVisible(true)
    setEditablePlace(data)
  }

  const setModalEvent = (message,title)=> {
    setModalMessage({message, title})
    setIsOpen(true);
    setIsCreateFormVisible(false)
  }  

  const deleteData= async(id)=>{
    let isDelete = window.confirm(
      `¿Estás seguro de eliminar el registro con el id '${id}' ?`
    );

    if (isDelete) {
      const {response, error} = await placeService.deleteData(id)
      if (error) return setError(error);
      let newData = places.filter((el) => el.id !== response);
      setPlaces(newData);
    } else {
      return;
    }
  }


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
        <Modal
              isOpen={isOpen}
              onClose={() => { 
                setIsOpen(false)
              }}
              message={modalMessage?.message}
              title={modalMessage?.title}
            />
        { (isCreateFormVisible && (
            <FloatingWindow onClose={()=>setIsCreateFormVisible(false)}>
              <div className='add-place-form'>
                 <AddPlace onCreated={getAllPlaces} onModalEvent={setModalEvent} />
              </div>
            </FloatingWindow>
          ))}
          { (isEditFormVisible && (
            <FloatingWindow onClose={()=>setIsEditFormVisible(false)}>
              <div className='add-place-form'>
                 <AddPlace onModalEvent={setModalEvent} onEditEvent={getAllPlaces} place={editablePlace}/>
              </div>
            </FloatingWindow>
          ))}
        <Table 
              data={places.map((place)=> ({
                id: place.id,
                name: place.name,
                max_capacity: place.max_capacity,
                location: place.location,
              }))}   
              headers={[
                'ID',
                'Nombre del espacio o sala',
                'N° de personas (aforo)',
                'Ubicación',
                'Gestión',
              ]}
              
              onEditEvent={onEditEvent}
              onDeleteEvent={deleteData}
              />

              {/* <AddPlace></AddPlace> */}
      </div>
    )
  }

export default ManagePlacesBody