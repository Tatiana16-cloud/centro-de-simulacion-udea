class DeviceArraySorter {

    static sortByDateAsc = (devices)=>{
        return [...devices].sort((a,b)=> new Date(a.date_received).getTime() - new Date(b.date_received).getTime())
    }
    
    static sortByStatusAsc = (devices)=>{
        return devices
    }

    static sortByDeviceIdAsc = (devices)=>{
        return [...devices].sort((a,b)=> parseInt(a.deviceId) - parseInt(b.deviceId))
    }

    static sortByNameAsc = (devices)=>{
        return [...devices].sort((a,b)=> a.name?.localeCompare(b.name))
    }

    static sortByDateDesc = (devices)=>{
        return [...devices].sort((a,b)=> new Date(b.date_received).getTime() - new Date(a.date_received).getTime())
    }
    
    static sortByStatusDesc = (devices)=>{
        return devices
    }

    static sortByDeviceIdDesc = (devices)=>{
        return [...devices].sort((a,b)=> parseInt(b.deviceId) - parseInt(a.deviceId))
    }

    static sortByNameDesc = (devices)=>{
        return [...devices].sort((a,b)=> b.name?.localeCompare(a.name))
    }

    static default = (devices)=>{
        return devices
    }
}

export default DeviceArraySorter