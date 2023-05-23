import React, { useState } from "react";
import "./AddReservation.css";
import ReservationService from "../../Services/reservation.service";
import Modal from "../Modal/Modal.component";
import { useDispatch, useSelector } from "react-redux";

function FormularioGestionarReservas() {

  const reservationService = new ReservationService()
  const [reservationOutput, setReservationOutput] = useState({});
  const [reservationData, setReservationData] = useState(null);
  const [isReservationCreated, setIsReservationCreated] = useState(false);
  const [isOpen, setIsOpen] = useState(null);
  const [modalMessage, setModalMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const storedReservations = useSelector(state=>state.reservations)
  const dispatch = useDispatch();

  const [date, setFecha] = useState("");
  const [faculty, setEntidad] = useState("");
  const [program, setPrograma] = useState("");
  const [semester, setSemestre] = useState("");
  const [affiliation, setAfiliacion] = useState("");
  const [participants, setParticipantes] = useState("");
  const [responsible, setResponsable] = useState("");
  const [start_time, setHoraInicio] = useState("");
  const [end_time, setHoraFin] = useState("");
  const [activity, setActividad] = useState("");
  const [location, setLugar] = useState("");
  const [equipment, setEquipos] = useState("");
  const [description, setDescripcion] = useState("");

  const createReservation = async () => {
    const reservationService = new ReservationService();
    const reservationData = {
      date,
      faculty,
      program,
      semester,
      affiliation,
      participants,
      responsible,
      start_time,
      end_time,
      activity,
      location,
      equipment,
      description
    };
  
    const { response, error } = await reservationService.createData(reservationData);
    setLoading(false);
  
    if (error) {
      setModalData('No se pudo crear la reserva', 'Ha ocurrido un error');
      return;
    }
  
    setLoading(true);
    const { response: response2, error: error2 } = await reservationService.getById(response?.insertId);
    setLoading(false);
  
    if (error2) {
      setModalData('No se pudo crear la reserva', 'Ha ocurrido un error');
      return;
    }
  
    storedReservations.push(response2[0]);
    setModalData('La reserva fue creada exitosamente', 'Completado!');
    setIsReservationCreated(true);

  };
  

  const setModalData = (message,title)=> {
    setModalMessage({message, title})
    setIsOpen(true);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log({
      date,
      faculty,
      program,
      semester,
      affiliation,
      participants,
      responsible,
      start_time,
      end_time,
      activity,
      location,
      equipment,
      description
    });
  };

  return (
    <form onSubmit={handleSubmit} className="formulario">
      <div className="formulario-columnas">
      <div>
          <label htmlFor="date">Fecha de la activity:</label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(event) => setFecha(event.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="faculty">Facultad o faculty:</label>
          <select
            id="faculty"
            value={faculty}
            onChange={(event) => setEntidad(event.target.value)}
            required
          >
            <option value="">Seleccionar</option>
            <option value="Medicina">
              Medicina
            </option>
            <option value="Anestesiología">
            Anestesiología
            </option>
            <option value="Microbiología">
            Microbiología
            </option>
          </select>
        </div>
        <div>
          <label htmlFor="program">Programa:</label>
          <select
            id="program"
            value={program}
            onChange={(event) => setPrograma(event.target.value)}
            required
          >
            <option value="">Seleccionar</option>
            <option value="Medicina">
              Medicina
            </option>
            <option value="Instrumentación quirúrgica">
              Instrumentación quirúrgica
            </option>
            <option value="Bioingeniería">
              Bioingeniería
            </option>
          </select>
        </div>
        <div>
          <label htmlFor="semester">Semestre</label>
          <input
            type="text"
            id="semester"
            value={semester}
            onChange={(event) => setSemestre(event.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="affiliation">Afiliación:</label>
          <select
            id="affiliation"
            value={affiliation}
            onChange={(event) => setAfiliacion(event.target.value)}
            required
          >
            <option value="">Seleccionar</option>
            <option value="Pregrado">
              Pregrado
            </option>
            <option value="Posgrado">
              Posgrado 
            </option>
            <option value="Extensión">
            Extensión
            </option>
            <option value="Investigación">
            Investigación
            </option>
            <option value="Administrativo">
            Administrativo
            </option>
            <option value="Semillero">
            Semillero
            </option>
            <option value="Otro">
            Otro
            </option>
          </select>
        </div>
        <div>
          <label htmlFor="participants">Número de participants:</label>
          <input
            type="text"
            id="participants"
            value={participants}
            onChange={(event) => setParticipantes(event.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="responsible">Nombre del responsible:</label>
          <input
            type="text"
            id="responsible"
            value={responsible}
            onChange={(event) => setResponsable(event.target.value)}
            required
          />
        </div>
        
        <div>
          <label htmlFor="start_time">Hora de inicio:</label>
          <input
            type="time"
            id="start_time"
            value={start_time}
            onChange={(event) => setHoraInicio(event.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="end_time">Hora de fin:</label>
          <input
            type="time"
            id="end_time"
            value={end_time}
            onChange={(event) => setHoraFin(event.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="activity">Actividad:</label>
          <select
            id="activity"
            value={activity}
            onChange={(event) => setActividad(event.target.value)}
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
          <label htmlFor="location">Lugar:</label>
          <select
            id="location"
            value={location}
            onChange={(event) => setLugar(event.target.value)}
            required
          >
            <option value="">Seleccionar</option>
            <option value="Sala 1">
              Sala 1
            </option>
            <option value="Sala 2">
              Sala 2
            </option>
            <option value="Sala 3">
              Sala 3
            </option>
          </select>
        </div>
        <div>
            <label htmlFor="equipment">Equipos e insumos:</label>
            <select
                id="equipment"
                value={equipment}
                onChange={(event) => setEquipos(event.target.value)}
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

        <div className="description">
          <label htmlFor="description">Descripción:</label>
          <textarea
            id="description"
            value={description}
            onChange={(event) => setDescripcion(event.target.value)}
          />
        </div>
      </div>
      <button type="submit" onClick={createReservation}>Realizar reserva</button>
    </form>
  );
}

export default FormularioGestionarReservas;
