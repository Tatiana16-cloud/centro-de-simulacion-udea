
import { formatDate } from '../../Utils/dateUtils';

export const setDataFromDevice = (device) =>{
    const data1 = [
        {
          key: 'name',
          label: "Nombre del elemento",
          value: device.name?.value ?? '',
          isEditable: device.name?.isEditable ?? false,
        },
        {
          key: 'deviceId',
          label: "N° de identificación",
          value: device.deviceId?.value ?? '',
          isEditable: device.deviceId?.isEditable ?? false,
        },
        {
          key: 'responsable',
          label: "Responsable de inventario",
          value: device.responsable?.value ?? '',
          isEditable: device.responsable?.isEditable ?? false,
        }
      ];
      
      const data2 = [
        {
          key: 'brand',
          label: "Fabricante/Marca",
          value: device.brand?.value ?? '',
          isEditable: device.brand?.isEditable ?? false,
        },
        {
          key: 'location',
          label: "Ubicación",
          value: device.location?.value ?? '',
          isEditable: device.location?.isEditable ?? false,
        },
        {
          key: 'type',
          label: "Tipo",
          value: device.type?.value ?? '',
          isEditable: device.type?.isEditable ?? false,
        }
      ];
      
      const data3 = [
        {
          key: 'model',
          label: "Modelo",
          value: device.model?.value ?? '',
          isEditable: device.model?.isEditable ?? false,
        },
        {
          key: 'serial',
          label: "Serie",
          value: device.serial?.value ?? '',
          isEditable: device.serial?.isEditable ?? false,
        },
        {
          key: 'license',
          label: "Licencia N°",
          value: device.license?.value ?? '',
          isEditable: device.license?.isEditable ?? false,
        }
      ];
      
      const data4 = [
        {
          key: 'supplier.name',
          label: "Nombre",
          value: device.supplier?.name?.value ?? '',
          isEditable: device.supplier?.name?.isEditable ?? false,
        },
        {
          key: 'supplier.phone_number',
          label: "Telefono",
          value: device.supplier?.phone_number?.value ?? '',
          isEditable: device.supplier?.phone_number?.isEditable ?? false,
        },
        {
          key: 'supplier.mail',
          label: "E-mail",
          value: device.supplier?.mail?.value ?? '',
          isEditable: device.supplier?.mail?.isEditable ?? false,
        },
        {
          key: 'supplier.address',
          label: "Dirección",
          value: device.supplier?.address?.value ?? '',
          isEditable: device.supplier?.address?.isEditable ?? false,
        }
      ];

      const data4B = [
        {
          key: 'support_supplier.name',
          label: "Nombre",
          value: device.support_supplier?.name?.value ?? '',
          isEditable: device.support_supplier?.name?.isEditable ?? false,
        },
        {
          key: 'support_supplier.phone_number',
          label: "Telefono",
          value: device.support_supplier?.phone_number?.value ?? '',
          isEditable: device.support_supplier?.phone_number?.isEditable ?? false,
        },
        {
          key: 'support_supplier.mail',
          label: "E-mail",
          value: device.support_supplier?.mail?.value ?? '',
          isEditable: device.support_supplier?.mail?.isEditable ?? false,
        },
        {
          key: 'support_supplier.address',
          label: "Dirección",
          value: device.support_supplier?.address?.value ?? '',
          isEditable: device.support_supplier?.address?.isEditable ?? false,
        }
      ];
      
      const data5 = [
        {
          key: 'purchase_date',
          label: "Fecha de compra",
          value: formatDate(device.purchase_date?.value ?? ''),
          isEditable: device.purchase_date?.isEditable ?? false
        },
        {
          key: 'date_received',
          label: "Fecha de recepción",
          value: formatDate(device.date_received?.value ?? ''),
          isEditable: device.date_received?.isEditable ?? false
        }
      ];
      
      const data6 = [
        {
          key: 'commissioning_date',
          label: "Fecha de puesta en servicio",
          value: formatDate(device.commissioning_date?.value ?? ''),
          isEditable: device.commissioning_date?.isEditable ?? false
        },
        {
          key: 'warranty_expiration_date',
          label: "Fecha de vencimiento garantia",
          value: formatDate(device.warranty_expiration_date?.value ?? ''),
          isEditable: device.warranty_expiration_date?.isEditable ?? false
        }
      ];
      
      const data7 = [
        {
          key: 'accessory_description',
          label: "Acesorios",
          value: device.accessory_description?.value ?? '',
          isEditable: device.accessory_description?.isEditable ?? false,
        }
      ];
      
      const data8 = [
        {
          key: 'use_description',
          label: "Usos",
          value: device.use_description?.value ?? '',
          isEditable: device.use_description?.isEditable ?? false,
        }
      ];
      
      const data9 = [
        {
          key: 'observation',
          label: "Descripción",
          value: device.observation?.value ?? '',
          isEditable: device.observation?.isEditable ?? false,
        }
      ];
  
      const data10 = [
        {
          key: 'temperature',
          label: "Temperatura",
          value: device.temperature?.value ?? '',
          isEditable: device.temperature?.isEditable ?? false,
        },
        {
          key: 'humidity',
          label: "Humedad relativa",
          value: device.humidity?.value ?? '',
          isEditable: device.humidity?.isEditable ?? false,
        },
        {
          key: 'pressure',
          label: "Presión",
          value: device.pressure?.value ?? '',
          isEditable: device.pressure?.isEditable ?? false,
        },
        {
          key: 'other',
          label: "Otros",
          value: device.other?.value ?? '',
          isEditable: device.other?.isEditable ?? false,
        }
      ];

      return {
        data1,
        data2,
        data3,
        data4,
        data4B,
        data5,
        data6,
        data7,
        data8,
        data9,
        data10
      }
}

export const setNestedField = (obj, fieldString, newValue) => {
  const fieldArray = fieldString.split('.');
  let jsonObj = JSON.parse(JSON.stringify(obj));
  let currentObj = jsonObj;

  for (const field of fieldArray) {
    if (field === fieldArray[fieldArray.length - 1]) {
      currentObj[field] = newValue;
    } else {
      if (!currentObj?.hasOwnProperty(field)) {
        currentObj[field] = {};
      }
      currentObj = currentObj[field];
    }
  }

  return jsonObj;
}

export const hasNestedField = (obj, fieldString) => {
  const fieldArray = fieldString.split('.');
  let currentObj = obj;

  for (const field of fieldArray) {
    if (field === fieldArray[fieldArray.length - 1]) {
      if (!currentObj?.hasOwnProperty(field)) {
        return false;
      }
      return currentObj[field]? true : false;
    } else {
      if (!currentObj?.hasOwnProperty(field)) {
        return false;
      }
      currentObj = currentObj[field];
      
    }
  }
}