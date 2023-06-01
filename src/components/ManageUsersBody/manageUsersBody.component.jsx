import React, { useState, useEffect } from 'react';
import Table from '../Table/table.component';
import FloatingWindow from '../FloatingWindow/floatingWindow.component';
import Toolbar from '../Toolbar/toolbar.component';
import UserService from '../../Services/user.service';
import SearchBox from '../SearchBox/searchbox.component';
import Button from '../Button/button.component';
import Dropdown from '../Dropdown/dropdown.component';
import './manageUsersBody.css';
import AddUserModal from '../AddUserModal/AddUserModal.component';

const ManageUsersBody = ({onActionEvent}) => {
  const[users,setUsers]=useState([])
  const [isCreateFormVisible, setIsCreateFormVisible] = useState(false);

  const userService = new UserService()

  useEffect(() => {
    getAllUsers()
  }, []);

  const getAllUsers = async ()=>{
    const {response, error} = await userService.getAllData()
    if (error) {
      setUsers([]);
    }else{
      setUsers(response);
    }
  }

  const dataExampleArray = [
    {
      someProperty1: 'someProperty1',
      someProperty2: 'someProperty2',
      someProperty3: 'someProperty3',
      someProperty4: 'someProperty4',
      someProperty5: 'someProperty5',
      someProperty6: 'someProperty6',
    },
  ];

  return (
    <div className="body">
      <Toolbar>
      <Button text={'Ingresar usuario'} onClick={()=>setIsCreateFormVisible(true)}></Button>
        <SearchBox />
        <Dropdown
          label={'Ordenar por:'}
          options={[
            { label: '', value: null },
            { label: 'Rol' },
            { label: 'Ordenar A - Z' },
            { label: 'Ordenar Z - A' },
          ]}
        />
      </Toolbar>
      { (isCreateFormVisible && (
            <FloatingWindow onClose={()=>setIsCreateFormVisible(false)}>
              <div className='add-user-form'>
              <AddUserModal />
              </div>
            </FloatingWindow>
          ))}
      <Table 
          data={users.map((user)=> ({
            id: user.id,
            name: user.name,
            role: user.role,
            phone_number: user.phone_number,
            email: user.mail
          }))} 
          headers={[
            'Id',
            'Nombre del usuario',
            'Rol',
            'Número de celular',
            'Correo electrónico',
            'Gestión'
          ]}
      />
      
    </div>
  );
};

export default ManageUsersBody;
