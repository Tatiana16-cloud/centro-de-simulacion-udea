import React, { useEffect, useState } from 'react';
import "./AddPlace.css";
import PlaceService from "../../Services/place.service";
import { useDispatch, useSelector } from "react-redux";

function FormularioGestionarPlaces({onCreated, onModalEvent, place, onEditEvent}) {

  const placeService = new PlaceService()
  const [placeOutput, setPlaceOutput] = useState({});
  const [placeData, setPlaceData] = useState(null);
  const [isPlaceCreated, setIsPlaceCreated] = useState(false);
  const [isOpen, setIsOpen] = useState(null);
  const [modalMessage, setModalMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const storedPlaces = useSelector(state=>state.places)
  const dispatch = useDispatch();

  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [max_capacity, setCapacity] = useState("");
  const [location, setLocation] = useState("");

  useEffect(() => {
    if(place){
      setId(place.id)
      setName(place.name)
      setCapacity(place.max_capacity)
      setLocation(place.location)
    }

  }, [place]);

  const createPlace = async () => {
    const placeService = new PlaceService();
    const placeData = {
      id,
      name,
      max_capacity,
      location,
    };
    let response1 = null
    let error1 = null
    if(place){
      placeData.id = id
      const { response, error } = await placeService.updateData(placeData);
      response1 = response
      error1 = error
    }
    else{
      const { response, error } = await placeService.createData(placeData);
      response1 = response
      error1 = error
    }
    setLoading(false);
    console.log(response1)
  
    if (error1) {
      onModalEvent('No se pudo crear el espacio', 'Ha ocurrido un error');
      return;
    }
    console.log("Prueba 1")
    setLoading(true);
    const { response: response2, error: error2 } = await placeService.getById(response1?.insertId);
    setLoading(false);
    console.log(response2)
    if (error2) {
      onModalEvent('No se pudo crear el espacio', 'Ha ocurrido un error');
      return;
    }
    console.log("Prueba 2")
    
    
    if(place){
      
      onEditEvent()
      onModalEvent('El espacio fue actualizado exitosamente', 'Completado!');
    }
    else{
      onCreated();
      onModalEvent('El espacio fue creado exitosamente', 'Completado!');
    }
    setIsPlaceCreated(true);

  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log({
      id,
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
            defaultValue={name}
            onChange={(event) => setName(event.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="max_capacity">Capacidad máxima (aforo):</label>
          <input
            type="text"
            id="max_capacity"
            value={max_capacity}
            defaultValue={max_capacity}
            onChange={(event) => setCapacity(event.target.value)}
            required
          />
        </div>
        
        <div>
          <label htmlFor="location">Lugar:</label>
          <input
            type="text"
            id="location"
            value={location}
            defaultValue={location}
            onChange={(event) => setLocation(event.target.value)}
            required
          />
        </div>
        

      </div>
      <button type="submit" onClick={createPlace}>{place? "Guardar cambios":"Crear espacio"}</button>
    </form>
  );
}

export default FormularioGestionarPlaces;
