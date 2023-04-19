import React from 'react'
import TableRow from './TableRow'

const Table = ({data, setDataToEdit, deleteData}) => {
  return (
    <div>
        <h3>Tabla de datos</h3>
        <table>
            <thead>
                <tr>
                    <th>Numero</th>
                    <th>Nombre</th>
                    <th>Nombre del Producto</th>
                    <th>Fabricante</th>
                </tr>
            </thead>
            <tbody>
            {data.length > 0 ? (data.map((el) => (
            <TableRow key={el.id} 
            el={el}
            setDataToEdit={setDataToEdit}
            deleteData={deleteData} /> ))) : (
            <tr>
              <td colSpan="3">Sin datos</td>
            </tr> )}
            </tbody>
        </table>
    </div>
  )
}

export default Table