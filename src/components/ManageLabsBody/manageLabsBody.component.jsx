import React, { useEffect, useState } from 'react';
import Table from '../Table/table.component';
import './manageLabsBody.css'
import Toolbar from '../Toolbar/toolbar.component';
import Button from '../Button/button.component';
import FloatingWindow from '../FloatingWindow/floatingWindow.component';
import SearchBox from '../SearchBox/searchbox.component';
import Dropdown from '../Dropdown/dropdown.component';
import AddPractice from '../AddPractice/AddPractice.component';
import LabService from '../../Services/lab.service';

const ManageLabsBody = ({someProp}) => {
  const[labs,setLabs]=useState([])
  const [isCreateFormVisible, setIsCreateFormVisible] = useState(false);
  const labService = new LabService()

  useEffect(() => {
    getAllLabs()

  }, []);

  const getAllLabs = async()=>{
    const {response, error} = await labService.getAllData()
    if (error) {
      setLabs([]);
      // setPaginatedLabs(null)
      // setFilteredLabs(null)
      // setError(error);
    }else{
      setLabs(response);
      // setPaginatedLabs(paginateLabs(response, currentPage, pageSize))
      // setFilteredLabs(response)
      // setError(null);
    }

  }
  
  const dataExampleArray = [
    {
      someProperty1: 'Laboratorio hueso temporal',
      someProperty2: 'Microcirugía, aula 111',
      someProperty3: 'Microscopio con cámara, computador portatil, Simulador de rostro',
      someProperty4: 'Botones',
    }
  ]

  return (
    <div className='body'>
      <Toolbar>
      <Button text={'Ingresar práctica'} onClick={()=>setIsCreateFormVisible(true)}></Button>
        <SearchBox />
        <Dropdown
            label={'Filtrar por:'} 
            options={[
              { label: '', value: null},
              { label: 'Ordenar A - Z'},
              { label: 'Ordenar Z - A'},
            ]}
          />
      </Toolbar>
      { (isCreateFormVisible && (
            <FloatingWindow onClose={()=>setIsCreateFormVisible(false)}>
              <div className='add-lab-form'>
                 <AddPractice />
              </div>
            </FloatingWindow>
          ))}
        <Table 
              data={labs.map((lab)=> ({
                name: lab.name,
                location: lab.location,
                equipments: lab.equipments,
              }))}  
              headers={[
                'Nombre de la práctica',
                'Lugar de realización',
                'Equipos e insumos',
                'Gestión'
              ]}
            />
            {/* <AddPractice></AddPractice> */}
    </div>
  )
}

export default ManageLabsBody