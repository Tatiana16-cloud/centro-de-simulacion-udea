import React from 'react'
import TableRow from './TableRow.component'
import './table.css';

const Table = ({data,isIdInvisible, headers, onEditEvent, onViewEvent,onDeleteEvent,onManageEvent}) => {

    const columnTitles = headers.length > 0 ? headers : Object.keys(data[0]);

    return (
        <div className='table-container'>
            <table className='table'>
                <thead>
                    <tr className='tr'>
                        {columnTitles.map((title, index) => (
                            <th className='th' key={index}>{title}</th>
                        ))}
                        {!!onEditEvent && !!onDeleteEvent && !!onViewEvent &&(
                            <th className='th' key='actions'>Acciones</th>
                        )}
                    </tr>
                </thead>
                <tbody>
                    {data.length > 0 ? (data.map((el) => 
                        (<TableRow 
                            isIdInvisible={isIdInvisible}
                            key={el.id} 
                            rowData={el}
                            onEditEvent={onEditEvent}
                            onDeleteEvent={onDeleteEvent} 
                            onViewEvent={onViewEvent}
                            onManageEvent={onManageEvent}
                        /> )
                    )) : (
                        <tr>
                        <td colSpan="7">Sin datos</td>
                        </tr> 
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default Table