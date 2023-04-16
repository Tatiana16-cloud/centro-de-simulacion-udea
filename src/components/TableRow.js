import React from 'react'

const TableRow = ({el,setDataToEdit, deleteData}) => {

    let{id,numero,nombre,nombreproducto,fabricante}=el

    return (
        <tr>
            <td>{numero}</td>
            <td>{nombre}</td>
            <td>{nombreproducto}</td>
            <td>{fabricante}</td>
            <td>
                <button onClick={()=> setDataToEdit(el)}>Editar</button>
                <button onClick={()=> deleteData(id)}>Eliminar</button>
                <button>Hoja de vida</button>
            </td>
        </tr>
    
  )
}

export default TableRow