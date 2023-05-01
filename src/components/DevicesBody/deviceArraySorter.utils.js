class DeviceArraySorter {

    static sortByDate = (devices)=>{
        return [...devices].sort((a,b)=> new Date(b.date_received).getTime() - new Date(a.date_received).getTime())
    }
    
    static sortByStatus = (devices)=>{
        return devices
    }

    static sortByDeviceId = (devices)=>{
        return [...devices].sort((a,b)=> parseInt(b.deviceId) - parseInt(a.deviceId))
    }

    static sortByName = (devices)=>{
        return [...devices].sort((a,b)=> (b.name) - (a.name))
    }

    static default = (devices)=>{
        return devices
    }
}

export default DeviceArraySorter