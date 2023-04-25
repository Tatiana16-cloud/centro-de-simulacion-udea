import React, { useEffect, useState } from 'react';
import Table from '../Table/table.component';
import Form from '../Form/form.component';
import Loader from '../LoaderV2/loader.component';
import FloatingWindow from '../FloatingWindow/floatingWindow.component';
import DeviceService from '../../Services/device.service';
import MessageComponent from '../Message/message.component';
import Toolbar from '../Toolbar/toolbar.component';
import Button from '../Button/button.component'
import SearchBox from '../SearchBox/searchbox.component'
import Dropdown from '../Dropdown/dropdown.component'
import {filterByWord} from '../../Utils/SearchingUtils'
import Pagination from '../Pagination/pagination.component';

import './devicesBody.css'

const DevicesBody = () => {
  const[devices,setDevices]=useState(null)
  const[filteredDevices,setFilteredDevices]=useState(null)
  const[paginatedDevices,setPaginatedDevices]=useState(null)
  const[dataToEdit,setDataToEdit]=useState(null)
  const[isOnEditMode,setOnEditMode]=useState(null)
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const deviceService = new DeviceService()

  useEffect(() => {
    setLoading(true);
    getAllDevices()
    
    setTimeout(()=> {
      setLoading(false);
    }, 1000)
  }, []);

  const getAllDevices = async()=>{
    const {response, error} = await deviceService.getAllData()
    if (error) {
      setDevices(null);
      setPaginatedDevices(null)
      setError(error);
    }else{
      setDevices(response);
      setPaginatedDevices(paginateDevices(response, currentPage, pageSize))
      setError(null);
    }
  }

  const onEditEvent =(data)=>{
    setDataToEdit(data)
    setOnEditMode(true)
  }

  const onCloseEditModeEvent = ()=>{
    setOnEditMode(false)
  }

  /*
  const createData=(data)=>{
    //data.id=Date.now();
    let options = {
      body: data,
      headers: { "content-type": "application/json" },
    };

    api.post(url, options).then((res) => {
      //console.log(res);
      if (!res.err) {
        setDevices([...devices, res]);
      } else {
        setError(res);
      }
    });
  }
  */

  const updateData= async(data)=>{
    const {response, error} = await deviceService.updateData(data)
    if (error) return setError(error);
    let newData = devices.map((el) => (el.id === response.id ? response : el));
    setDevices(newData);
  }

  const deleteData= async(id)=>{
    let isDelete = window.confirm(
      `¿Estás seguro de eliminar el registro con el id '${id}' ?`
    );

    if (isDelete) {
      const {response, error} = await deviceService.deleteData(id)
      if (error) return setError(error);
      let newData = devices.filter((el) => el.id !== response);
      setDevices(newData);
    } else {
      return;
    }
  }

  const searchDevices = (text)=>{
    const results = filterByWord(devices, text);
    setFilteredDevices(results)
  }

  const handlePaginationChange = ({
    currentPage,
    pageSize
  }) => {
    setCurrentPage(currentPage);
    setPageSize(pageSize);
    setPaginatedDevices(paginateDevices(devices, currentPage, pageSize))
    console.log(currentPage,pageSize)
  };

  const paginateDevices = (devices, pageNumber, pageSize) => {
    const startIndex = (pageNumber - 1) * pageSize;
    const endIndex = startIndex + pageSize;  
    const filteredArray = devices.slice(startIndex, endIndex);
    return filteredArray;
  }

  return (
    <div className='body'>
        <article className='grid-1-2'>
          { isOnEditMode && dataToEdit &&
            <FloatingWindow onClose={onCloseEditModeEvent}>
              <Form 
                dataToEdit={{
                  id: dataToEdit.id,
                  name: dataToEdit.name,
                  alias: dataToEdit.alias,
                  brand: dataToEdit.brand,
                  model: dataToEdit.model
                }}
                types={[
                  'text',
                  'text',
                  'text',
                  'text'
                ]}
                labels={[
                  'Nombre',
                  'Alias',
                  'Marca',
                  'Modelo'
                ]}
                createData={null} 
                updateData={updateData} 
                setDataToEdit={setDataToEdit}
              />
            </FloatingWindow>
          }
          {error && (
            <MessageComponent
              msg={`Error ${error.message}: ${error.body}`}
              bgColor="#dc3545"
            />
          )}
          {paginatedDevices && (
          <Toolbar>
            <Button text={'Ingresar Equipo'}/>
            <Button text={'Nuevo mantenimiento'}/>
            <SearchBox onSearch={searchDevices}/>
            <Dropdown label={'Ordenar por:'} options={['Recientes','En mantenimiento','']} />
          </Toolbar>
          )}
          {loading && <Loader />}
          {paginatedDevices && !loading && (
            <Table 
              data={paginatedDevices.map((device)=> ({
                id: device.id,
                name: device.name,
                alias: device.alias,
                brand: device.brand,
                model: device.model,
                status: device.status
              }))}  
              headers={[
                'Número',
                'Nombre',
                'Alias',
                'Marca',
                'Modelo',
                'Estado'
              ]}
              onEditEvent={onEditEvent}
              onDeleteEvent={deleteData} 
            />
          )}
          {paginatedDevices && !loading && (
            <Pagination
              totalItems={devices.length}
              onPaginationChange={handlePaginationChange}
            />
          )}
        </article>
    </div>
  )
}

export default DevicesBody