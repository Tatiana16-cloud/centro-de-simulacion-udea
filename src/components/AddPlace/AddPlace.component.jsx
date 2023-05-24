import React, { useState } from "react";
import "./AddPlace.css";
import PlaceService from "../../Services/place.service";
import { useDispatch, useSelector } from "react-redux";

function FormularioGestionarPlaces() {

  const placeService = new PlaceService()
  const [placeOutput, setPlaceOutput] = useState({});
  const [placeData, setPlaceData] = useState(null);
  const [isPlaceCreated, setIsPlaceCreated] = useState(false);
  const [isOpen, setIsOpen] = useState(null);
  const [modalMessage, setModalMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const storedPlaces = useSelector(state=>state.places)
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [max_capacity, setCapacity] = useState("");
  const [location, setLocation] = useState("");

  const createPlace = async () => {
    const placeService = new PlaceService();
    const placeData = {
      name,
      max_capacity,
      location,
    };
  
    const { response, error } = await placeService.createData(placeData);
    setLoading(false);
  
    if (error) {
      setModalData('No se pudo crear el espacio', 'Ha ocurrido un error');
      return;
    }
  
    setLoading(true);
    const { response: response2, error: error2 } = await placeService.getById(response?.insertId);
    setLoading(false);
  
    if (error2) {
      setModalData('No se pudo crear el espacio', 'Ha ocurrido un error');
      return;
    }
  
    storedPlaces.push(response2[0]);
    setModalData('El espacio fue creado exitosamente', 'Completado!');
    setIsPlaceCreated(true);

  };
  

  const setModalData = (message,title)=> {
    setModalMessage({message, title})
    setIsOpen(true);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log({
      name,
      max_capacity,
      location
    });
  };

  return (
    <form onSubmit={handleSubmit} className="formulario">
      <div className="formulario-columnas">
      <div>
          <label htmlFor="name">Nombre del espacio:</label>
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
          <input
            type="text"
            id="location"
            value={location}
            onChange={(event) => setLocation(event.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="max_capacity">Capacidad máxima (aforo):</label>
          <input
            type="text"
            id="max_capacity"
            value={max_capacity}
            onChange={(event) => setCapacity(event.target.value)}
            required
          />
        </div>

      </div>
      <button type="submit" onClick={createPlace}>Crear espacio</button>
    </form>
  );
}

export default FormularioGestionarPlaces;
