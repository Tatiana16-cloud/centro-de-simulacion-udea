import React, { useState,useEffect } from 'react'

const initialForm = {
  numero:"",
  nombre:"",
  nombreproducto:"",
  fabricante:"",
  id:null
}

const Form = ({createData, updateData, dataToEdit, setDataToEdit}) => {
  const[fom,setFom]=useState(initialForm);

  useEffect(()=>{
    if(dataToEdit){setFom(dataToEdit)}
    else{setFom(initialForm)}
  },[dataToEdit])

  const handleChange =(e)=>{
    setFom({
      ...fom,
      [e.target.name]:e.target.value,
    });
  };

  const handleSumit =(e)=>{
    e.preventDefault()
    if(!fom.numero || !fom.fabricante || !fom.nombre || !fom.nombreproducto){
      alert("Datos Incompletos")
      return
    };
    if(fom.id === null){
      createData(fom)
    } else{
      updateData(fom)
    }
    handleReset();
  }

  const handleReset=(e)=>{
    setFom(initialForm)
    setDataToEdit(null)
  }
  return (
    <div>
        <h3>{dataToEdit ? "Editar":"Agregar" }</h3>
        <form onSubmit={handleSumit}>
          <input type="text" name="numero" placeholder='Numero' onChange={handleChange} value={fom.id}/>
          <input type="text" name="nombre" placeholder='Nombre' onChange={handleChange} value={fom.name}/>
          <input type="text" name="nombreproducto" placeholder='Nombre del producto' onChange={handleChange} value={fom.name_device}/>
          <input type="text" name="fabricante" placeholder='Fabricante / Marca' onChange={handleChange} value={fom.alias}/>
          <input type="submit" value="Enviar"/>
          <input type="reset" value="Limpiar" onClick={handleReset}/>
        </form>

    </div>
  )
}

export default Form