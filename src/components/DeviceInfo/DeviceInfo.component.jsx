import React from 'react';
import SpecialTable from '../SpecialTable/specialtable.component';
import './DeviceInfo.css';

const DeviceInfo = () => {
    

    const device ={
        id: 1,
        deviceId: 1781,
        name: "Modelos de la vagina",
        alias: "Maletas Modelos de vaginas",
        brand: "N/A",
        model: "N/A",
        location: "Buitron",
        serial: "N/A",
        responsable: "Juan Carlos Caro Gil",
        type: "Hardware",
        license: null,
        Supplier: 2,
        Support_supplier: 2,
        purchase_date: null,
        date_received: "1970-01-01T00:00:00.000Z",
        commissioning_date: "1970-01-01T00:00:00.000Z",
        warranty_expiration_date: null,
        accessory_description: "N/A",
        use_description: "N/A",
        temperature: "Temperaturas de funcionamiento 10°C a 40°C. Temperatura de asilamiento -15°C a 50°C",
        humidity: "15% a 90% (sin condensación)",
        pressure: "N/A",
        voltage: "N/A",
        other: "Ninguno",
        observation: "Traslado Departamento de Ginecologia y Opstetricia. Esta malo para la parte de intubacion",
        image_url: null,
        supplier_id: 2,
        support_supplier_id: 2,
        supplier: {
            id: 2,
            name: "N/A",
            phone_number: "N/A",
            address: "N/A"
        },
        support_supplier: {
            id: 2,
            name: "N/A",
            phone_number: "N/A",
            address: "N/A"
        }
    }


    const values1=["","",""]
    const keys1= ["Nombre del elemento", "N° de identificación", "Responsable de inventario"]
    const editable1 = [false, false, false];

    const values2=["","",""]
    const keys2= ["Fabricante/Marca", "Ubicación", "Tipo"]
    const editable2 = [false, false, false];

    const values3=["","",""]
    const keys3= ["Modelo", "Serie", "Licencia N°"]
    const editable3 = [false, false, false];

    const values4=["","","",""]
    const keys4= ["Nombre", "Telefono", "E-mail","Dirección"]
    const editable4 = [false, false, false,false];

    const values5=["",""]
    const keys5= ["Fecha de compra", "Fecha de recepción"]
    const editable5 = [false, false];

    const values6=["",""]
    const keys6= ["Fecha de puesta en servicio", "Fecha de vencimiento garantia"]
    const editable6 = [false, false];

    const values7=[""]
    const keys7= ["Acesorios"]
    const editable7 = [false];

    const values8=[""]
    const keys8= ["Usos"]
    const editable8 = [false];

    const values9=[""]
    const keys9= ["Descripción"]
    const editable9 = [false];

    const values10=["","","",""]
    const keys10= ["Temperatura","Humedad relativa","Presión", "Otros"]
    const editable10 = [false, false, false, false];

    return (
        <div className="device-info-container">
          <div className="device-info-row">
            <SpecialTable title="" keys={keys1} values={values1} editable={editable1} />
            <SpecialTable title="" keys={keys2} values={values2} editable={editable2} />
            <SpecialTable title="" keys={keys3} values={values3} editable={editable3} />
          </div>
            <div className="device-info-column">
              <SpecialTable title="Datos proveedor del equipo" keys={keys4} values={values4} editable={editable4} />
              <SpecialTable title="Datos proveedor de mentenimiento" keys={keys4} values={values4} editable={editable4} />
            </div>
            <div className="device-info-column">
              <SpecialTable title="" keys={keys5} values={values5} editable={editable5} />
              <SpecialTable title="" keys={keys6} values={values6} editable={editable6} />
            </div>
            <div className="device-info-row">
                <SpecialTable title="" keys={keys7} values={values7} editable={editable7} />
                <SpecialTable title="" keys={keys8} values={values8} editable={editable8} />
                <SpecialTable title="" keys={keys9} values={values9} editable={editable9} />
          </div>
          <div className="device-info-column">
              <SpecialTable title="Condiciones tolerables para" keys={keys10} values={values10} editable={editable10} />
              <di>

              </di>
            </div>
        </div>
      );
    };
    
    export default DeviceInfo;