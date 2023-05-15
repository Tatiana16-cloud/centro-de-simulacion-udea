import React, { useState } from 'react';
import {
    MenuItem,
    TextField,
    Box,
    Button,
  } from '@material-ui/core';

import './MaintenanceForm.css'

function MaintenanceForm({scheduleMaintenance}) {
    const typesMantenimiento = ['Preventivo', 'Calibración', 'Otro'];
    const usuarios = ['Usuario 1', 'Usuario 2', 'Usuario 3'];

    const [type, setTipo] = useState('');
    const [responsable, setResponsable] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState(new Date());

    const handleSubmit = (e)=>{
        e.preventDefault();
        
        if (type !== '' && responsable !== '' && date !== '') {
            scheduleMaintenance({
                type,
                responsable,
                date,
                description
            })
        }
    }

    return (
    <div className='form-body'>
        <div className='toolbar-support'>
            Agendar un mantenimiento
        </div>
        <form component="form" className='form-support' onSubmit={handleSubmit}>
            <TextField
                select
                label="Tipo"
                value={type}
                onChange={(e) => setTipo(e.target.value)}
                required
            >
                {typesMantenimiento.map((type) => (
                <MenuItem key={type} value={type}>
                    {type}
                </MenuItem>
                ))}
            </TextField>

            <TextField
                select
                label="Responsable"
                value={responsable}
                onChange={(e) => setResponsable(e.target.value)}
                required
            >
                {usuarios.map((usuario) => (
                <MenuItem key={usuario} value={usuario}>
                    {usuario}
                </MenuItem>
                ))}
            </TextField>

            <TextField
                fullWidth
                margin="normal"
                label="Descripción"
                multiline
                rows={1}
                rowsMax={10}
                variant="outlined"
                onChange={(e) => setDescription(e.target.value)}
            />

            <TextField
                fullWidth
                margin="normal"
                label="Fecha"
                type="date"
                InputLabelProps={{
                shrink: true,
                }}
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
            />
            <div></div>
            <div className='button-body'>
                <Button type="submit" variant="contained" style={{ backgroundColor: '#294f07', color: 'white'}}>
                    Agendar
                </Button>
            </div>
        </form>
    </div>
    );
}

export default MaintenanceForm;
