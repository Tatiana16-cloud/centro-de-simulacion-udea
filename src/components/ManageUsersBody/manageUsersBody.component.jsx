import React, { useState, useEffect } from 'react';
import Table from '../Table/table.component';
import FloatingWindow from '../FloatingWindow/floatingWindow.component';
import Toolbar from '../Toolbar/toolbar.component';
import UserService from '../../Services/user.service';
import SearchBox from '../SearchBox/searchbox.component';
import Modal from '../Modal/Modal.component';
import Button from '../Button/button.component';
import Dropdown from '../Dropdown/dropdown.component';
import './manageUsersBody.css';
import AddUserModal from '../AddUserModal/AddUserModal.component';

const ManageUsersBody = ({onActionEvent}) => {
  const[users,setUsers]=useState([])
  const [isOpen, setIsOpen] = useState(null);
  const [modalMessage, setModalMessage] = useState(null);

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

  const setModalEvent = (message,title)=> {
    setModalMessage({message, title})
    setIsOpen(true);
    setIsCreateFormVisible(false)
  }  



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
      <Modal
              isOpen={isOpen}
              onClose={() => { 
                setIsOpen(false)
              }}
              message={modalMessage?.message}
              title={modalMessage?.title}
            />
      { (isCreateFormVisible && (
            <FloatingWindow onClose={()=>setIsCreateFormVisible(false)}>
              <div className='add-user-form'>
              <AddUserModal onCreated={getAllUsers} setModalEvent={setModalEvent}/>
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
