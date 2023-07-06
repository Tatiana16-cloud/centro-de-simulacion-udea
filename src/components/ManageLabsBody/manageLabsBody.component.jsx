import React, { useEffect, useState } from 'react';
import LabService from '../../Services/lab.service';
import Table from '../Table/table.component';
import FloatingWindow from '../FloatingWindow/floatingWindow.component';
import './manageLabsBody.css'
import Toolbar from '../Toolbar/toolbar.component';
import Button from '../Button/button.component';
import SearchBox from '../SearchBox/searchbox.component';
import Dropdown from '../Dropdown/dropdown.component';
import AddPractice from '../AddPractice/AddPractice.component';

const ManageLabsBody = ({someProp}) => {
  const[labs,setLabs]=useState([]);
  const [isCreateFormVisible, setIsCreateFormVisible] = useState(false);

  const labService = new LabService()

  const dataExampleArray = [
    {
      someProperty1: 'someProperty1A',
      someProperty2: 'someProperty2A',
      someProperty3: 'someProperty3A',
      someProperty4: 'someProperty4A',
      someProperty5: 'someProperty5A',
      someProperty6: 'someProperty6A',
    }
  ]

  useEffect(() => {
    getAllLabs()
  }, []);

  const getAllLabs = async()=>{
    const {response, error} = await labService.getAllData()

    if (error) {
      setLabs([]);
      // setPaginatedPracticessetPractices(null)
      // setFilteredPracticessetPractices(null)
      // setError(error);
    }else{
      setLabs(response);
      // setPaginatedPractices(paginatePractices(response, currentPage, pageSize))
      // setFilteredPracticessetPractices(response)
      // setError(null);
    }
  }

  return (
    <div className='body'>
      { (isCreateFormVisible && (
            <FloatingWindow onClose={()=>setIsCreateFormVisible(false)}>
              <div className='add-lab-form'>
                <AddPractice/>
              </div>
            </FloatingWindow>
          ))}
      <Toolbar>
        <Button text={'Ingresar práctica'} onClick={()=>setIsCreateFormVisible(true)}/>
        <SearchBox />
        <Dropdown
            label={'Filtrar por:'} 
            options={[
              { label: '', value: null},
              { label: 'Rol'},
              { label: 'Ordenar A - Z'},
              { label: 'Ordenar Z - A'},
            ]}
          />
      </Toolbar>
        <Table 
              data={labs.map((lab)=> ({
                id: lab.id,
                name: lab.name,
                location: lab.location,
              }))}  
              headers={[
                'ID',
                'Nombre de la práctica',
                'Lugar de realización',
                'Acciones'
              ]}
            />
    </div>
  )
}

export default ManageLabsBody