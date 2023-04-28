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
import {ACTIONS} from '../../Commons/actions.commons'
import DeviceArraySorter from './deviceArraySorter.utils';

import './devicesBody.css'

const DevicesBody = ({onActionEvent}) => {
  const[devices,setDevices]=useState(null)
  const[filteredDevices,setFilteredDevices]=useState(null)
  const[paginatedDevices,setPaginatedDevices]=useState(null)
  const[dataToEdit,setDataToEdit]=useState(null)
  const[isOnEditMode,setOnEditMode]=useState(null)
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [searchText, setSearchText] = useState(null);
  const [sortCriterion, setSortCriterion] = useState('default')

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
      setFilteredDevices(null)
      setError(error);
    }else{
      setDevices(response);
      setPaginatedDevices(paginateDevices(response, currentPage, pageSize))
      setFilteredDevices(response)
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

  const searchEvent = (text)=>{
    const minLengthToSearch = 3;
    const hasSearching = text?.length >= minLengthToSearch;

    if(!hasSearching){
      setSearchText(null)
      setPaginatedDevices(getArrayDevices(devices, currentPage, pageSize, null, sortCriterion))
    }else{
      setCurrentPage(1);
      setSearchText(text);
      setPaginatedDevices(getArrayDevices(devices, 1, pageSize, text, sortCriterion))
    }
  }

  const handlePaginationChange = ({
    currentPage,
    pageSize
  }) => {
    setCurrentPage(currentPage);
    setPageSize(pageSize);
    setPaginatedDevices(getArrayDevices(devices, currentPage, pageSize, searchText, sortCriterion))
  };

  const paginateDevices = (devices, pageNumber, pageSize) => {
    const startIndex = (pageNumber - 1) * pageSize;
    const endIndex = startIndex + pageSize;  
    const filteredArray = devices.slice(startIndex, endIndex);
    return filteredArray;
  }

  const SORT_BY = {
    SORT_BY_DATE: 'sortByDate',
    SORT_BY_STATUS: 'sortByStatus',
    DEFAULT: 'default'
  }

  const sortMethods = Object.keys(SORT_BY).reduce((methodsObject, key)=>{
    methodsObject[SORT_BY[key]] = DeviceArraySorter[SORT_BY[key]]
    return methodsObject
  },{})
  
  const onSelectedSortCriterion = (criterion) => {
    setSortCriterion(criterion? criterion : 'default')
    setPaginatedDevices(getArrayDevices(devices, currentPage, pageSize, searchText, criterion? criterion : 'default'))
  }

  const getArrayDevices = (devices, currentPage, pageSize, searchText, criterion) =>{
    console.log(currentPage, pageSize, searchText, criterion)
    let devicesToPaginate = searchDevices(devices, searchText);
    devicesToPaginate = sortMethods[criterion](devicesToPaginate)
    return paginateDevices(devicesToPaginate, currentPage, pageSize)
  }

  const searchDevices = (devices, searchText) => {
    const searchResults = filterByWord(devices, searchText);
    setFilteredDevices(searchResults)
    return searchResults;
  }

  const onNewDeviceButton = () => {
    onActionEvent(ACTIONS.newDevice)
  }

  const onNewSupportButton = () => {
    onActionEvent(ACTIONS.viewSupports)
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
            <Button text={'Ingresar Equipo'} onClick={onNewDeviceButton}/>
            <Button text={'Nuevo mantenimiento'} onClick={onNewSupportButton}/>
            <SearchBox onSearch={searchEvent}/>
            <Dropdown 
              label={'Ordenar por:'} 
              options={[
                { label: '', value: null},
                { label: 'Fecha', value: SORT_BY.SORT_BY_DATE},
                { label: 'Estado', value: SORT_BY.SORT_BY_STATUS}
              ]}
              onSelectedOption={onSelectedSortCriterion}  
            />
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
              totalItems={filteredDevices.length}
              currentPage={currentPage}
              onPaginationChange={handlePaginationChange}
            />
          )}
        </article>
    </div>
  )
}

export default DevicesBody