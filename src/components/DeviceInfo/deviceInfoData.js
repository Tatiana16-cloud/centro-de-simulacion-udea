
import { formatDate } from '../../Utils/dateUtils';

const setDataFromDevice = (device) =>{
    const data1 = [
        {
          key: "Nombre del elemento",
          value: device.name?.value ?? '',
          isEditable: device.name?.isEditable ?? true,
        },
        {
          key: "N° de identificación",
          value: device.deviceId?.value ?? '',
          isEditable: device.deviceId?.isEditable ?? true,
        },
        {
          key: "Responsable de inventario",
          value: device.responsable?.value ?? '',
          isEditable: device.responsable?.isEditable ?? true,
        }
      ];
      
      const data2 = [
        {
          key: "Fabricante/Marca",
          value: device.brand?.value ?? '',
          isEditable: device.brand?.isEditable ?? true,
        },
        {
          key: "Ubicación",
          value: device.location?.value ?? '',
          isEditable: device.location?.isEditable ?? true,
        },
        {
          key: "Tipo",
          value: device.type?.value ?? '',
          isEditable: device.type?.isEditable ?? true,
        }
      ];
      
      const data3 = [
        {
          key: "Modelo",
          value: device.model?.value ?? '',
          isEditable: device.model?.isEditable ?? true,
        },
        {
          key: "Serie",
          value: device.serial?.value ?? '',
          isEditable: device.serial?.isEditable ?? true,
        },
        {
          key: "Licencia N°",
          value: device.license?.value ?? '',
          isEditable: device.license?.isEditable ?? true,
        }
      ];
      
      const data4 = [
        {
          key: "Nombre",
          value: device.supplier?.name?.value ?? '',
          isEditable: device.supplier?.name?.isEditable ?? true,
        },
        {
          key: "Telefono",
          value: device.supplier?.phone_number?.value ?? '',
          isEditable: device.supplier?.phone_number?.isEditable ?? true,
        },
        {
          key: "E-mail",
          value: device.supplier?.mail?.value ?? '',
          isEditable: device.supplier?.mail?.isEditable ?? true,
        },
        {
          key: "Dirección",
          value: device.supplier?.address?.value ?? '',
          isEditable: device.supplier?.address?.isEditable ?? true,
        }
      ];
      
      const data5 = [
        {
          key: "Fecha de compra",
          value: formatDate(device.purchase_date?.value ?? ''),
          isEditable: device.purchase_date?.isEditable ?? true
        },
        {
          key: "Fecha de recepción",
          value: formatDate(device.date_received?.value ?? ''),
          isEditable: device.date_received?.isEditable ?? true
        }
      ];
      
      const data6 = [
        {
          key: "Fecha de puesta en servicio",
          value: formatDate(device.commissioning_date?.value ?? ''),
          isEditable: device.commissioning_date?.isEditable ?? true
        },
        {
          key: "Fecha de vencimiento garantia",
          value: formatDate(device.warranty_expiration_date?.value ?? ''),
          isEditable: device.warranty_expiration_date?.isEditable ?? true
        }
      ];
      
      const data7 = [
        {
          key: "Acesorios",
          value: device.accessory_description?.value ?? '',
          isEditable: device.accessory_description?.isEditable ?? true,
        }
      ];
      
      const data8 = [
        {
          key: "Usos",
          value: device.use_description?.value ?? '',
          isEditable: device.use_description?.isEditable ?? true,
        }
      ];
      
      const data9 = [
        {
          key: "Descripción",
          value: device.observation?.value ?? '',
          isEditable: device.observation?.isEditable ?? true,
        }
      ];
  
      const data10 = [
        {
          key: "Temperatura",
          value: device.temperature?.value ?? '',
          isEditable: device.temperature?.isEditable ?? true,
        },
        {
          key: "Humedad relativa",
          value: device.humidity?.value ?? '',
          isEditable: device.humidity?.isEditable ?? true,
        },
        {
          key: "Presión",
          value: device.pressure?.value ?? '',
          isEditable: device.pressure?.isEditable ?? true,
        },
        {
          key: "Otros",
          value: device.other?.value ?? '',
          isEditable: device.other?.isEditable ?? true,
        }
      ];

      return {
        data1,
        data2,
        data3,
        data4,
        data5,
        data6,
        data7,
        data8,
        data9,
        data10
      }
}

export default setDataFromDevice;