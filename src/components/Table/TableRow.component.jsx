import React from 'react'
import './table.css'

const TableRow = ({rowData,onEditEvent, onDeleteEvent}) => {
    return (
        <tr>
            {Object.keys(rowData).map((key, index) => (
                <td className='td' key={index}>{rowData[key]}</td>
            ))}
            <td className='td'>
                <button onClick={()=> onEditEvent(rowData)}>Editar</button>
                <button onClick={()=> onDeleteEvent(rowData.id)}>Eliminar</button>
                <button>Hoja de vida</button>
            </td>
        </tr>
    
  )
}

export default TableRow