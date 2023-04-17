import React from 'react'

const TableRow = ({el,setDataToEdit, deleteData}) => {

    let{id, name, name_device, alias}= el

    return (
        <tr>
            <td>{id}</td>
            <td>{name}</td>
            <td>{name_device}</td>
            <td>{alias}</td>
            <td>
                <button onClick={()=> setDataToEdit(el)}>Editar</button>
                <button onClick={()=> deleteData(id)}>Eliminar</button>
                <button>Hoja de vida</button>
            </td>
        </tr>
    
  )
}

export default TableRow