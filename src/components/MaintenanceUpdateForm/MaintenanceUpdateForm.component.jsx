import React, { useState } from 'react';
import {
    MenuItem,
    TextField,
    Box,
    Button,
  } from '@material-ui/core';

import './MaintenanceUpdateForm.css'
import { useEffect } from 'react';

function MaintenanceUpdateForm({updateMaintenance, supportData}) {
    const maintenanceStatus = ['CLOSED', 'DONE'];
    const maintenanceStatusLabels = ['Cerrado', 'Completado'];

    const [status, setStatus] = useState('');
    const [description, setDescription] = useState('');

    useEffect(()=>{
        console.log(supportData)
        setStatus(supportData?.status)
        setDescription(supportData?.process_description)
    },[supportData])

    const handleSubmit = (e)=>{
        e.preventDefault();
        
        if (status !== '' && description !== '') {
            updateMaintenance({
                status: maintenanceStatus[maintenanceStatusLabels.findIndex((_status)=> status===_status)],
                process_description: description,
            })
        }
    }

    return (
    <div className='form-body'>
        <div className='toolbar-support'>
            Gestionar mantenimiento
        </div>
        <form component="form" className='form-support' onSubmit={handleSubmit}>
            <TextField
                select
                label="Estado"
                value={status}
                defaultValue={status}
                onChange={(e) => setStatus(e.target.value)}
                required
            >
                {maintenanceStatusLabels.map((status) => (
                <MenuItem key={status} value={status}>
                    {status}
                </MenuItem>
                ))}
            </TextField>

            <TextField
                fullWidth
                margin="normal"
                label="Proceso Realizado"
                defaultValue={description}
                multiline
                rows={4}
                rowsMax={20}
                variant="outlined"
                onChange={(e) => setDescription(e.target.value)}
            />

            <div></div>
            <div className='button-body'>
                <Button type="submit" variant="contained" style={{ backgroundColor: '#294f07', color: 'white'}}>
                    Actualizar
                </Button>
            </div>
        </form>
    </div>
    );
}

export default MaintenanceUpdateForm;
