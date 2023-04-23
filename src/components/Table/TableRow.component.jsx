import React from 'react'
import './table.css'
import Circle from '../Circle/circle.component'

const statusMapping = {
    pending: '#bb3333',
    active: '#40bb30',
    blocked: '#33ccff',
    inactive: 'yellow'
}

const objectKeys = Object.keys(statusMapping);

const TableRow = ({rowData,onEditEvent, onDeleteEvent}) => {
    return (
        <tr>
            {Object.keys(rowData).map((key, index) => {
                if(key==='status') 
                    return <td className='td' key={index}>
                                <Circle 
                                    color={statusMapping[objectKeys[Math.floor(Math.random() * objectKeys.length)]]} 
                                    size={30}
                                />
                            </td>
                return (<td className='td' key={index}>{rowData[key]}</td>)
            })}
            <td className='td actions'>
                <button className='action-button' onClick={()=> onEditEvent(rowData)}>Editar</button>
                <button className='action-button' onClick={()=> onDeleteEvent(rowData.id)}>Eliminar</button>
                <button className='action-button' >Hoja de vida</button>
            </td>
        </tr>
    
  )
}

export default TableRow