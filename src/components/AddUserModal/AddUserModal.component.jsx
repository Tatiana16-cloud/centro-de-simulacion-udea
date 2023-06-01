import React, { useState } from "react";
import "./AddUserModal.css";
import UserService from "../../Services/user.service";
import { useSelector } from "react-redux";

function FormularioAñadirUsuario() {
  const userService = new UserService()
  const storedUsers = useSelector(state=>state.users)
  const [loading, setLoading] = useState(false);
  const [modalMessage, setModalMessage] = useState(null);
  const [isUserCreated, setIsUserCreated] = useState(false);
  const [isOpen, setIsOpen] = useState(null);

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [mail, setMail] = useState("");
  const [phone_number, setPhoneNumber] = useState("");

  const createUser = async () => {
    const userService = new UserService();
    const userData = {
      name,
      username,
      role,
      password,
      mail,
      phone_number
    };
    const { response, error } = await userService.createData(userData);
    setLoading(false);
  
    if (error) {
      setModalData('No se pudo crear la reserva', 'Ha ocurrido un error');
      return;
    }
  
    setLoading(true);
    const { response: response2, error: error2 } = await userService.getById(response?.insertId);
    setLoading(false);
  
    if (error2) {
      setModalData('No se pudo crear la reserva', 'Ha ocurrido un error');
      return;
    }
  
    storedUsers.push(response2[0]);
    setModalData('La reserva fue creada exitosamente', 'Completado!');
    setIsUserCreated(true);

  };

  const setModalData = (message,title)=> {
    setModalMessage({message, title})
    setIsOpen(true);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit} className="formulario">
      <div className="formulario-columnas">
        <div>
          <label htmlFor="name">Nombre del usuario:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="username">Nombre del usuario:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="role">Rol:</label>
          <select
            id="role"
            value={role}
            onChange={(event) => setRole(event.target.value)}
            required
          >
            <option value="">Seleccionar</option>
            <option value="Administrador">Administrador</option>
            <option value="Docente">Docente</option>
          </select>
        </div>
        <div>
          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="phone_number">Número de celular:</label>
          <input
            type="tel"
            id="phone_number"
            value={phone_number}
            onChange={(event) => setPhoneNumber(event.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="mail">Correo electrónico:</label>
          <input
            type="email"
            id="mail"
            value={mail}
            onChange={(event) => setMail(event.target.value)}
            required
          />
        </div>
      </div>
      <button type="submit" onClick={createUser}>Añadir usuario</button>
    </form>
  );
}

export default FormularioAñadirUsuario;
