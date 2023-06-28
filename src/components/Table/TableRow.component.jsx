import React from 'react'
import './table.css'
import Circle from '../Circle/circle.component'
import Tooltip from '../ToolTip/tooltip.component'

const deviceStatusMapping = {
    pending: '#bb3333',
    active: '#40bb30',
    blocked: '#33ccff',
    inactive: 'yellow'
}

const statusMapping = {
    EXPIRED: '#bb3333',
    COMMING: '#FFDD00',
    ON_TIME: '#40bb30',
    DEFAULT: '#333333',
    SCHEDULED: '#bb3333',
    CLOSED: '#222',
    DONE: '#40bb30'
}

const statusLabels = {
    EXPIRED: 'Mantenimiento vencido',
    COMMING: 'Mantenimiento cercano',
    ON_TIME: 'Mantenimiento a tiempo',
    DEFAULT: 'Sin mantenimiento pendiente',
    SCHEDULED: 'Programado',
    CLOSED: 'Anulado',
    DONE: 'Completado',
}

const objectKeys = Object.keys(deviceStatusMapping);

const TableRow = ({rowData,isIdInvisible,onEditEvent, onViewEvent, onDeleteEvent, onManageEvent}) => {
    return (
        <tr>
            {Object.keys(rowData).filter((e)=> isIdInvisible ? e !== 'id' : true).map((key, index) => {
                if(key==='status') {
                    const randomStatus = objectKeys[Math.floor(Math.random() * objectKeys.length)]
                    const state = rowData[key] ? rowData[key] : randomStatus;
                    const color = statusMapping[state];
                    return <td className='td' key={index}>
                                <Tooltip label= {statusLabels[state]}>
                                    <Circle 
                                        color={color} 
                                        size={30}
                                    />
                                </Tooltip>
                            </td>
                }
                return (<td className='td' key={index}>{rowData[key]}</td>)
            })}
            { (!!onEditEvent || !!onDeleteEvent || !!onViewEvent || !!onManageEvent) && (
                <td className='td'>
                    <div className='actions'>
                        {!!onEditEvent && <button className='action-button' onClick={()=> onEditEvent(rowData)}>Editar</button>}
                        {!!onManageEvent && <button className='action-button' onClick={()=> onManageEvent(rowData)}>Gestionar</button>}
                        {!!onDeleteEvent && <button className='action-button' onClick={()=> onDeleteEvent(rowData.id)}>Eliminar</button>}
                        {!!onViewEvent && <button className='action-button' onClick={()=> onViewEvent(rowData)}>Hoja de vida</button>}      
                    </div>
                </td>
            )}
        </tr>
    
  )
}

export default TableRow