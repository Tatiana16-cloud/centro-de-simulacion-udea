import React, { useState } from "react";
import "./AddUserModal.css";

function FormularioAñadirUsuario() {
  const [nombre, setNombre] = useState("");
  const [rol, setRol] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [numeroCelular, setNumeroCelular] = useState("");
  const [correoElectronico, setCorreoElectronico] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log({
      nombre,
      rol,
      contraseña,
      numeroCelular,
      correoElectronico,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="formulario">
      <div className="formulario-columnas">
        <div>
          <label htmlFor="nombre">Nombre de usuario:</label>
          <input
            type="text"
            id="nombre"
            value={nombre}
            onChange={(event) => setNombre(event.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="rol">Rol:</label>
          <select
            id="rol"
            value={rol}
            onChange={(event) => setRol(event.target.value)}
            required
          >
            <option value="">Seleccionar</option>
            <option value="Administrador">Administrador</option>
            <option value="Usuario">Usuario</option>
          </select>
        </div>
        <div>
          <label htmlFor="contraseña">Contraseña:</label>
          <input
            type="password"
            id="contraseña"
            value={contraseña}
            onChange={(event) => setContraseña(event.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="numeroCelular">Número de celular:</label>
          <input
            type="tel"
            id="numeroCelular"
            value={numeroCelular}
            onChange={(event) => setNumeroCelular(event.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="correoElectronico">Correo electrónico:</label>
          <input
            type="email"
            id="correoElectronico"
            value={correoElectronico}
            onChange={(event) => setCorreoElectronico(event.target.value)}
            required
          />
        </div>
      </div>
      <button type="submit">Añadir usuario</button>
    </form>
  );
}

export default FormularioAñadirUsuario;
