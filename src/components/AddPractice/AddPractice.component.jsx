import React, { useState } from "react";
import "./AddPractice.css";
import LabService from "../../Services/lab.service";
import Modal from "../Modal/Modal.component";
import { useDispatch, useSelector } from "react-redux";


function FormularioGestionarLabs() {
  const labService = new LabService()
  const [labOutput, setLabOutput] = useState({});
  const [labData, setLabData] = useState(null);
  const [isLabCreated, setIsLabCreated] = useState(false);
  const [isOpen, setIsOpen] = useState(null);
  const [modalMessage, setModalMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const storedLabs = useSelector(state=>state.labs)
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [equipments, setEquipments] = useState("");
  
  const createLab = async () => {
    const labService = new LabService();
    const labData = {
      name,
      location,
      equipments
    };
  
    const { response, error } = await labService.createData(labData);
    setLoading(false);
  
    if (error) {
      setModalData('No se pudo crear la práctica', 'Ha ocurrido un error');
      return;
    }
  
    setLoading(true);
    const { response: response2, error: error2 } = await labService.getById(response?.insertId);
    setLoading(false);
  
    if (error2) {
      setModalData('No se pudo crear la práctica', 'Ha ocurrido un error');
      return;
    }
  
    storedLabs.push(response2[0]);
    setModalData('La práctica fue creada exitosamente', 'Completado!');
    setIsLabCreated(true);

  };
  

  const setModalData = (message,title)=> {
    setModalMessage({message, title})
    setIsOpen(true);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log({
      name,
      location,
      equipments
    });
  };
  
  return (
    <form onSubmit={handleSubmit} className="formulario">
      <div className="formulario-columnas">
        <div>
          <label htmlFor="name">Nombre de la práctica:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="location">Lugar:</label>
          <select
            id="location"
            value={location}
            onChange={(event) => setLocation(event.target.value)}
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
            <label htmlFor="equipments">Equipos e insumos:</label>
            <select
                id="equipments"
                value={equipments}
                onChange={(event) => setEquipments(event.target.value)}
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
      </div>
      <button type="submit" onClick={createLab}>Crear práctica</button>
    </form>
  );
}



export default FormularioGestionarLabs;
