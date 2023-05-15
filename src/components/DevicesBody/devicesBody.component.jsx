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
import {formatDate} from '../../Utils/dateUtils'
import { storeDevices, storeEditableDevice, storeViewableDevice } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";

import './devicesBody.css'

const DevicesBody = ({onActionEvent}) => {
  const[devices,setDevices]=useState(null)
  const[filteredDevices,setFilteredDevices]=useState(null)
  const[paginatedDevices,setPaginatedDevices]=useState(null)
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [searchText, setSearchText] = useState(null);
  const [sortCriterion, setSortCriterion] = useState('default')

  const dispatch = useDispatch();
  const deviceService = new DeviceService()
  const storedDevices = useSelector(state=>state.devices)


  useEffect(() => {
    setLoading(true);
    getAllDevices()
    
    setTimeout(()=> {
      setLoading(false);
    }, 500)
  }, []);

  const getAllDevices = async()=>{
    const {response, error} = storedDevices? {response: storedDevices} : await deviceService.getAllData()
    if (error) {
      setDevices(null);
      setPaginatedDevices(null)
      setFilteredDevices(null)
      setError(error);
      dispatch(storeDevices({ devices: null }))
    }else{
      setDevices(response);
      setPaginatedDevices(paginateDevices(response, currentPage, pageSize))
      setFilteredDevices(response)
      setError(null);
      dispatch(storeDevices({ devices: response }))
    }
  }

  const onEditEvent =(data)=>{
    console.log(devices)
    const device = devices.find((device)=>device.id === data.id)
    dispatch(storeEditableDevice({device:{...device}}))
    onActionEvent(ACTIONS.editDevice)
  }

  const onViewEvent =(data)=>{
    const device = devices.find((device)=>device.id === data.id)
    dispatch(storeViewableDevice({device:{...device}}))
    onActionEvent(ACTIONS.viewDevice)
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
    SORT_BY_DEVICE_ID: 'sortByDeviceId',
    SORT_BY_STATUS: 'sortByStatus',
    SORT_BY_NAME: 'sortByName',
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
                { label: 'Código', value: SORT_BY.SORT_BY_DEVICE_ID},
                { label: 'Nombre', value: SORT_BY.SORT_BY_NAME}
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
                deviceId: device.deviceId,
                name: device.name,
                date_received: formatDate(device.date_received),
                location: device.location,
                status: device.status
              }))}  
              headers={[
                'Número',
                'Código UdeA',
                'Nombre',
                'Fecha de recibido',
                'Ubicación y lugar',
                'Estado'
              ]}
              onEditEvent={onEditEvent}
              onDeleteEvent={deleteData} 
              onViewEvent={onViewEvent}
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