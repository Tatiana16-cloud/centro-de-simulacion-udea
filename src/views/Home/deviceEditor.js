export const editableFieldsForEditView = [
    "deviceId",
    "name",
    "alias",
    "brand",
    "model",
    "location",
    "serial",
    "responsable",
    "type",
    "license",
    "purchase_date",
    "date_received",
    "commissioning_date",
    "warranty_expiration_date",
    "accessory_description",
    "use_description",
    "temperature",
    "humidity",
    "pressure",
    "voltage",
    "other",
    "observation",
    "image_url",
    "supplier.name",
    "supplier.phone_number",
    "supplier.mail",
    "supplier.address",
    "support_supplier.name",
    "support_supplier.phone_number",
    "support_supplier.mail",
    "support_supplier.address",
]

export const emptyDevice = {
    deviceId: "",
    name: "",
    alias: "",
    brand: "",
    model: "",
    location: "",
    serial: "",
    responsable: "",
    type: "",
    license: "",
    purchase_date: "",
    date_received: "",
    commissioning_date: "",
    warranty_expiration_date: "",
    accessory_description: "",
    use_description: "",
    temperature: "",
    humidity: "",
    pressure: "",
    voltage: "",
    other: "",
    observation: "",
    image_url: "",
    supplier: {
        name: "",
        phone_number: "",
        mail: "",
        address: ""
    },
    support_supplier: {
        name: "",
        phone_number: "",
        mail: "",
        address: ""
    }
}

export const modifyObjectToDeviceInfoFormat = (device, editableFields) => {
    return Object.keys(device).reduce((result, key)=>{
    if(device[key] && typeof device[key] === 'object'){
        const editableSubFields = editableFields.filter((field)=> field.split(`.`)[0] === key && field.split(`.`).length >= 2).map((field)=> field.split(`.`)[1])
        console.log(device[key], editableSubFields)
        result[key] = modifyObjectToDeviceInfoFormat(device[key], editableSubFields)
    }else{
        result[key] = {
            value: device[key],
            isEditable: editableFields.includes(key),
        }
    }
    return result;
    },{})
}