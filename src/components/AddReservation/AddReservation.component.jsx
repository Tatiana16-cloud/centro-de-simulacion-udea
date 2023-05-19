import React, { useState } from "react";
import "./AddReservation.css";

function FormularioGestionarReservas() {
  const [nombre, setNombre] = useState("");
  const [fecha, setFecha] = useState("");
  const [entidad, setEntidad] = useState("");
  const [horaInicio, setHoraInicio] = useState("");
  const [horaFin, setHoraFin] = useState("");
  const [tipo, setTipo] = useState("");
  const [descripcion, setDescripcion] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log({
      nombre,
      fecha,
      entidad,
      horaInicio,
      horaFin,
      tipo,
      descripcion,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="formulario">
      <div className="formulario-columnas">
      <div>
          <label htmlFor="fecha">Fecha de la actividad:</label>
          <input
            type="date"
            id="fecha"
            value={fecha}
            onChange={(event) => setFecha(event.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="tipo">Facultad o entidad:</label>
          <select
            id="tipo"
            value={tipo}
            onChange={(event) => setTipo(event.target.value)}
            required
          >
            <option value="">Seleccionar</option>
            <option value="Simulación de sistemas eléctricos">
              Lorem ipsum dolor
            </option>
            <option value="Simulación de procesos industriales">
            Lorem ipsum dolor
            </option>
            <option value="Simulación de circuitos electrónicos">
            Lorem ipsum dolor
            </option>
          </select>
        </div>
        <div>
          <label htmlFor="tipo">Programa:</label>
          <select
            id="tipo"
            value={tipo}
            onChange={(event) => setTipo(event.target.value)}
            required
          >
            <option value="">Seleccionar</option>
            <option value="Simulación de sistemas eléctricos">
              Medicina
            </option>
            <option value="Simulación de procesos industriales">
              Instrumentación quirúrgica
            </option>
            <option value="Simulación de circuitos electrónicos">
              Bioingeniería
            </option>
          </select>
        </div>
        <div>
          <label htmlFor="nombre">Semestre</label>
          <input
            type="text"
            id="nombre"
            value={nombre}
            onChange={(event) => setNombre(event.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="tipo">Afiliación:</label>
          <select
            id="tipo"
            value={tipo}
            onChange={(event) => setTipo(event.target.value)}
            required
          >
            <option value="">Seleccionar</option>
            <option value="">
              Pregrado
            </option>
            <option value="">
              Posgrado 
            </option>
            <option value="">
            Extensión
            </option>
            <option value="">
            Investigación
            </option>
            <option value="">
            Administrativo
            </option>
            <option value="">
            Semillero
            </option>
            <option value="">
            Otro
            </option>
          </select>
        </div>
        <div>
          <label htmlFor="nombre">Número de participantes:</label>
          <input
            type="text"
            id="nombre"
            value={nombre}
            onChange={(event) => setNombre(event.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="nombre">Nombre del responsable:</label>
          <input
            type="text"
            id="nombre"
            value={nombre}
            onChange={(event) => setNombre(event.target.value)}
            required
          />
        </div>
        
        <div>
          <label htmlFor="horaInicio">Hora de inicio:</label>
          <input
            type="time"
            id="horaInicio"
            value={horaInicio}
            onChange={(event) => setHoraInicio(event.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="horaFin">Hora de fin:</label>
          <input
            type="time"
            id="horaFin"
            value={horaFin}
            onChange={(event) => setHoraFin(event.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="tipo">Actividad:</label>
          <select
            id="tipo"
            value={tipo}
            onChange={(event) => setTipo(event.target.value)}
            required
          >
            <option value="">Seleccionar</option>
            <option value="Simulación de sistemas eléctricos">
              Simulación de sistemas eléctricos
            </option>
            <option value="Simulación de procesos industriales">
              Simulación de procesos industriales
            </option>
            <option value="Simulación de circuitos electrónicos">
              Simulación de circuitos electrónicos
            </option>
          </select>
        </div>
        <div>
          <label htmlFor="tipo">Lugar:</label>
          <select
            id="tipo"
            value={tipo}
            onChange={(event) => setTipo(event.target.value)}
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
        <div>
            <label htmlFor="tipo">Equipos e insumos:</label>
            <select
                id="tipo"
                value={tipo}
                onChange={(event) => setTipo(event.target.value)}
                required
            >
                <option value="">Seleccionar</option>
                <label>
                    Checkbox: <input type="checkbox" name="myCheckbox" />
                </label>
                <option value="Equipo de paro">
                <input type="checkbox" name="equipoDeParo" />
                Equipo de paro
                </option>
                <option value="Baby">
                <input type="checkbox" name="baby" />
                Baby
                </option>
                <option value="Jeringas">
                <input type="checkbox" name="jeringas" />
                Jeringas
                </option>
            </select>
        </div>

        <div className="descripcion">
          <label htmlFor="descripcion">Descripción:</label>
          <textarea
            id="descripcion"
            value={descripcion}
            onChange={(event) => setDescripcion(event.target.value)}
            required
          />
        </div>
      </div>
      <button type="submit">Realizar reserva</button>
    </form>
  );
}

export default FormularioGestionarReservas;
