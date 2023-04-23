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

import './devicesBody.css'

const DevicesBody = () => {
  const[devices,setDevices]=useState(null)
  const[dataToEdit,setDataToEdit]=useState(null)
  const[isOnEditMode,setOnEditMode]=useState(null)
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

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
      setError(error);
    }else{
      setDevices(response);
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
          {devices && (
          <Toolbar>
            <Button text={'Ingresar Equipo'}/>
            <Button text={'Nuevo mantenimiento'}/>
            <SearchBox/>
            <Dropdown label={'Ordenar por:'} options={['Recientes','En mantenimiento','']} />
          </Toolbar>
          )}
          {loading && <Loader />}
          {devices && !loading && (
            <Table 
              data={devices.map((device)=> ({
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
        </article>
    </div>
  )
}

export default DevicesBody