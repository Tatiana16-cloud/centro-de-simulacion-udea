class DeviceArraySorter {

    static sortByDateAsc = (supports)=>{
        return [...supports].sort((a,b)=> new Date(a.date).getTime() - new Date(b.date).getTime())
    }

    static sortByDeviceIdAsc = (supports)=>{
        return [...supports].sort((a,b)=> parseInt(a.device_id) - parseInt(b.device_id))
    }

    static sortByTypeAsc = (supports)=>{
        return [...supports].sort((a,b)=> a.type?.localeCompare(b.type))
    }

    static sortByDateDesc = (supports)=>{
        return [...supports].sort((a,b)=> new Date(b.date).getTime() - new Date(a.date).getTime())
    }

    static sortByDeviceIdDesc = (supports)=>{
        return [...supports].sort((a,b)=> parseInt(b.device_id) - parseInt(a.device_id))
    }

    static sortByTypeDesc = (supports)=>{
        return [...supports].sort((a,b)=> b.type?.localeCompare(a.type))
    }

    static default = (supports)=>{
        return supports
    }
}

export default DeviceArraySorter