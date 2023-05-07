import React, { useState } from "react";
import "./AddUserModal.css";

const AddUserModal = ({ show, onHide }) => {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handlePhoneChange = (event) => {
    setPhone(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // aquí se podría enviar la información del formulario a una base de datos o hacer otra acción necesaria
    setName("");
    setRole("");
    setPassword("");
    setPhone("");
    setEmail("");
    onHide();
  };

  return (
    <div className={`modal ${show ? "show" : ""}`} onClick={onHide}>
      <div className="modal-content" onClick={(event) => event.stopPropagation()}>
        <h2>Añadir usuario</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Nombre de usuario:
            <input type="text" value={name} onChange={handleNameChange} />
          </label>
          <label>
            Rol:
            <select value={role} onChange={handleRoleChange}>
              <option value="">Selecciona un rol</option>
              <option value="administrador">Administrador</option>
              <option value="usuario">Usuario</option>
            </select>
          </label>
          <label>
            Contraseña:
            <input type="password" value={password} onChange={handlePasswordChange} />
          </label>
          <label>
            Número de celular:
            <input type="tel" value={phone} onChange={handlePhoneChange} />
          </label>
          <label>
            Correo electrónico:
            <input type="email" value={email} onChange={handleEmailChange} />
          </label>
          <button type="submit">Añadir</button>
        </form>
      </div>
    </div>
  );
};

export default AddUserModal;
