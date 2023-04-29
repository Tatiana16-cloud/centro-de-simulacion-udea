import React from 'react'
import './table.css'
import Circle from '../Circle/circle.component'
import Tooltip from '../ToolTip/tooltip.component'

const statusMapping = {
    pending: '#bb3333',
    active: '#40bb30',
    blocked: '#33ccff',
    inactive: 'yellow',
    default: '#333333'
}

//const objectKeys = Object.keys(statusMapping);

const TableRow = ({rowData,onEditEvent, onDeleteEvent}) => {
    return (
        <tr>
            {Object.keys(rowData).map((key, index) => {
                if(key==='status') {
                    //const randomStatus = objectKeys[Math.floor(Math.random() * objectKeys.length)]
                    const state = rowData[key] ? rowData[key] : 'default';
                    const color = statusMapping[state];
                    return <td className='td' key={index}>
                                <Tooltip label= {state}>
                                    <Circle 
                                        color={color} 
                                        size={30}
                                    />
                                </Tooltip>
                            </td>
                }
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