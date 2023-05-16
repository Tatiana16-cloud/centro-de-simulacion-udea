import React, { useEffect, useState } from 'react';
import SpecialTable from '../SpecialTable/specialtable.component';
import './DeviceInfo.css';
import { hasNestedField, setDataFromDevice, setNestedField} from './deviceInfoData';
import DeviceService from '../../Services/device.service';
import Loader from '../LoaderV2/loader.component';
import Modal from '../Modal/Modal.component';
import Button from '../Button/button.component';
import { storeDevices, storeEditableDevice, storeSupports, storeViewableDevice } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { faArrowRotateBack } from '@fortawesome/free-solid-svg-icons';
import { ACTIONS } from '../../Commons/actions.commons';
import MaintenanceForm from '../MaintenanceForm/MaintenanceForm.component';
import SupportService from '../../Services/support.service';

const DeviceInfo = ({deviceInput, button, onActionEvent}) => {
    const [deviceOutput, setDeviceOutput] = useState({});
    const [deviceData, setDeviceData] = useState(null);
    const [isOpen, setIsOpen] = useState(null);
    const [modalMessage, setModalMessage] = useState(null);
    const [loading, setLoading] = useState(false);

    const deviceService = new DeviceService()
    const storedDevices = useSelector(state=>state.devices)
    const dispatch = useDispatch();

    const supportService = new SupportService();
    
    useEffect(()=>{
      if(deviceInput) {
        const structuredData = setDataFromDevice(deviceInput)
        setDeviceData(structuredData)
      }
    },[deviceInput])

    const onChange = (newValue, key)=>{
      const updatedDeviceOutput = setNestedField(deviceOutput, key, newValue);
      setDeviceOutput(updatedDeviceOutput)
    }

    const backToHome = ()=>{
      onActionEvent(ACTIONS.viewDevices)
    }

    const updateDevice= async()=>{
      if(!hasAnyChange(deviceOutput)) return false;
      setLoading(true)
      //Si se modifica alguno de los campos de supplier se envia tambien el nombre para que se actualice el supplier
      if(deviceOutput.supplier){
        if(!deviceOutput.supplier.name) deviceOutput.supplier.name = deviceInput.supplier?.name?.value;
        if(!deviceOutput.supplier.phone_number) deviceOutput.supplier.phone_number = deviceInput.supplier?.phone_number?.value;
        if(!deviceOutput.supplier.mail) deviceOutput.supplier.mail = deviceInput.supplier?.mail?.value;
        if(!deviceOutput.supplier.address) deviceOutput.supplier.address = deviceInput.supplier?.address?.value;
      }

      const {response, error} = await deviceService.updateData({...deviceOutput, id: deviceInput?.id?.value})
      setLoading(false)
      if (error) return setModalData('Vuelve a intentarlo mas tarde')
      updateStoredDevices(deviceOutput)
      setModalData('El dispositivo fue actualizado exitosamente','Completado!')
    }

    const createDevice= async()=>{
      if(!hasAnyChange(deviceOutput)) return false;
      setLoading(true)
      const {response, error} = await deviceService.createData({...deviceOutput})
      setLoading(false)
      if (error) return setModalData('No se pudo crear el dispostivo','Ha ocurrido un error')

      setLoading(true)
      const {response: response2, error: error2} = await deviceService.getById(response?.insertId)
      setLoading(false)
      if (error2) return setModalData('No se pudo crear el dispostivo','Ha ocurrido un error')
      
      storedDevices.push(response2[0])
      dispatch(storeDevices({ devices: storedDevices }))
      setModalData('El dispositivo fue creado exitosamente','Completado!')
    }

    const setModalData = (message,title)=> {
      setModalMessage({message, title})
      setIsOpen(true);
    }

    const updateStoredDevices = (newDevice)=> {
      const newStoredDevices = storedDevices.map((oldDevice)=>{
        if(oldDevice.id === deviceInput?.id?.value)
          for (const key of Object.keys(newDevice)) 
            oldDevice[key] = newDevice[key]
          
        return oldDevice
      })

      dispatch(storeDevices({ devices: newStoredDevices }))
    }

    const hasAnyChange = (data)=> {
      return Object.keys(data).length
    }

    const checkRequiredFields = (data)=> {
      const requiredFields = ['deviceId','name']
      return requiredFields.reduce((hasRequiredFields, requiredFieldKey)=> hasNestedField(data,requiredFieldKey) && hasRequiredFields, true)
    }

    const createSupportForDevice = async(support)=>{
      const newSupport = {
        device_id: deviceInput.id.value,
        responsable: support.responsable,
        date: support.date,
        description: support.description,
        status: 'SCHEDULED',
        type: support.type, 
      }

      setLoading(true)
      const {response, error} = await supportService.createData(newSupport);
      setLoading(false)
      if (error) return setModalData('Vuelve a intentarlo mas tarde')
      dispatch(storeSupports({supports: null}))
      setModalData('Nuevo mantenimiento agendado','Completado!')
    }

    return (
      (deviceData && (
        <div>
          <div className='toolbar'>
            <Button text={'Regresar'} onClick={backToHome} icon={faArrowRotateBack}/>
            {button && button.isUpdateButton && button.label && <Button text={button.label} isDisable={!hasAnyChange(deviceOutput)} onClick={updateDevice}/>} 
            {button && button.isCreateButton && button.label && <Button text={button.label} isDisable={!checkRequiredFields(deviceOutput)} onClick={createDevice}/>} 
          </div>
          <div className="device-info-container" style={{maxHeight: button ? '80vh' : '400px'}}>
            {loading && <Loader />}
            <Modal
              isOpen={isOpen}
              onClose={() => { 
                onActionEvent(ACTIONS.viewDevices)
                setIsOpen(false)
              }}
              message={modalMessage?.message}
              title={modalMessage?.title}
            />
            <div className="device-info-row">
              <SpecialTable title="" data={deviceData.data1} onChange={onChange}/>
              <SpecialTable title="" data={deviceData.data2} onChange={onChange}/>
              <SpecialTable title="" data={deviceData.data3} onChange={onChange}/>
            </div>
              <div className="device-info-column">
                <SpecialTable title="Datos proveedor del equipo" data={deviceData.data4} onChange={onChange}/>
                <SpecialTable title="Datos proveedor de mentenimiento" data={deviceData.data4B} onChange={onChange}/>
              </div>
              <div className="device-info-column">
                <SpecialTable title="" data={deviceData.data5} onChange={onChange}/>
                <SpecialTable title="" data={deviceData.data6} onChange={onChange}/>
              </div>
              <div className="device-info-row">
                  <SpecialTable title="" data={deviceData.data7} onChange={onChange}/>
                  <SpecialTable title="" data={deviceData.data8} onChange={onChange}/>
                  <SpecialTable title="" data={deviceData.data9} onChange={onChange}/>
            </div>
            <div className="device-info-column">
                <SpecialTable title="Condiciones tolerables para" data={deviceData.data10} onChange={onChange}/>
                <div>

                </div>
              </div>
          </div>
          <div className='support-form'>
            {!button && <MaintenanceForm scheduleMaintenance={createSupportForDevice}/>}
          </div>
        </div>
      ))
      );
    };
    
    export default DeviceInfo;