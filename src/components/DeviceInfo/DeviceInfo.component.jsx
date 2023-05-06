import React, { useEffect, useState } from 'react';
import SpecialTable from '../SpecialTable/specialtable.component';
import './DeviceInfo.css';
import setDataFromDevice from './deviceInfoData';

const DeviceInfo = ({deviceInput}) => {
    const [deviceData, setDeviceData] = useState(null);
    
    useEffect(()=>{
      console.log("deviceInputUseEffect",deviceInput)
      if(deviceInput) {
        const structuredData = setDataFromDevice(deviceInput)
        setDeviceData(structuredData)
      }
    },[deviceInput])

    return (
      (deviceData && (
        <div className="device-info-container">
          <div className="device-info-row">
            <SpecialTable title="" data={deviceData.data1} />
            <SpecialTable title="" data={deviceData.data2} />
            <SpecialTable title="" data={deviceData.data3} />
          </div>
            <div className="device-info-column">
              <SpecialTable title="Datos proveedor del equipo" data={deviceData.data4} />
              <SpecialTable title="Datos proveedor de mentenimiento" data={deviceData.data4} />
            </div>
            <div className="device-info-column">
              <SpecialTable title="" data={deviceData.data5} />
              <SpecialTable title="" data={deviceData.data6} />
            </div>
            <div className="device-info-row">
                <SpecialTable title="" data={deviceData.data7} />
                <SpecialTable title="" data={deviceData.data8} />
                <SpecialTable title="" data={deviceData.data9} />
          </div>
          <div className="device-info-column">
              <SpecialTable title="Condiciones tolerables para" data={deviceData.data10} />
              <div>

              </div>
            </div>
        </div>
      ))
      );
    };
    
    export default DeviceInfo;