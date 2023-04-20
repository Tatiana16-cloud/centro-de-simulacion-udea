import React, { useState,useEffect } from 'react'
import './form.css'

const initialForm = {
  numero:"",
  nombre:"",
  nombreproducto:"",
  fabricante:"",
  id:null
}

const Form = ({dataToEdit, types, labels, createData, updateData, setDataToEdit}) => {
  const[form,setForm]=useState(initialForm);

  useEffect(()=>{
    if(dataToEdit){setForm(dataToEdit)}
    else{setForm(initialForm)}
  },[dataToEdit])

  const handleChange =(e)=>{
    setForm({
      ...form,
      [e.target.name]:e.target.value,
    });
  };

  const handleSumit =(e)=>{
    e.preventDefault()
    const isFormCompleted = Object.keys(form).reduce((isCompleted, key)=>{
      return isCompleted && form[key]
    },true)

    if(!isFormCompleted){
      alert("Datos Incompletos")
      return
    };
    if(form.id === null){
      //createData(form)
    } else{
      updateData(form)
    }
    handleReset();
    setDataToEdit(null)
  }

  const handleReset=(e)=>{
    setForm(initialForm)
  }

  return (
    <div>
        <h3>{dataToEdit ? "Editar":"Agregar" }</h3>
        <form onSubmit={handleSumit}>
          {Object.keys(form).map((key, index)=>(
              <input key={key} type={types? types[index]: "text"} name={key} placeholder={labels? labels[index]: 'N/A'} onChange={handleChange} value={form[key]}/>
          ))}
          <input type="submit" value="Enviar"/>
          <input type="reset" value="Limpiar" onClick={handleReset}/>
        </form>

    </div>
  )
}

export default Form