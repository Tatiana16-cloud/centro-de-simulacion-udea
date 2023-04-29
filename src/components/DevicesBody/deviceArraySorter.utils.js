class DeviceArraySorter {

    static sortByDate = (devices)=>{
        return [...devices].sort((a,b)=> b.id - a.id)
      }
    
    static sortByStatus = (devices)=>{
        return devices
    }

    static default = (devices)=>{
        return devices
    }
}

export default DeviceArraySorter