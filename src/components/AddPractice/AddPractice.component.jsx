import React, { useState } from "react";
import "./AddPractice.css";

function FormularioGestionarReservas(onCreated) {
  const [nombre, setNombre] = useState("");
  const [equipos, setEquipos] = useState("");
  const [lugar, setLugar] = useState("");
  const [observacion, setObservacion] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log({
      nombre,
      equipos,
      lugar,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="formulario">
      <div className="formulario-columnas">
        <div>
          <label htmlFor="nombre">Nombre de la práctica:</label>
          <input
            type="text"
            id="nombre"
            value={nombre}
            onChange={(event) => setNombre(event.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="nombre">Equipos</label>
          <input
            type="text"
            id="equipos"
            value={nombre}
            onChange={(event) => setNombre(event.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="lugar">Lugar:</label>
          <select
            id="lugar"
            value={lugar}
            onChange={(event) => setLugar(event.target.value)}
            required
          >
            <option value="">Seleccionar</option>
            <option value="Simulación de sistemas eléctricos">
              Sala 1
            </option>
            <option value="Simulación de procesos industriales">
              Sala 2
            </option>
            <option value="Simulación de circuitos electrónicos">
              Sala 3
            </option>
          </select>
        </div>


        <div className="descripcion">
          <label htmlFor="descripcion">Observaciones:</label>
          <textarea
            id="descripcion"
            value={observacion}
            onChange={(event) => setObservacion(event.target.value)}
            required
          />
        </div>
      </div>
      <button type="submit">Realizar reserva</button>
    </form>
  );
}

export default FormularioGestionarReservas;
