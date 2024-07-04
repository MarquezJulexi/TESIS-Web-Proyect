// src/components/CrearEditarEstablecimiento.js
import React, { useState, useEffect  } from 'react';
import { crearEstablecimiento, actualizarEstablecimiento  } from '../services/api';
import CrearEditarHorarios from '../components/CrearEditarHorarios';
import './css/CrearEditarEstablecimiento.css';

const CrearEditarEstablecimiento = ({ establecimiento, onSuccess, onCancel  }) => {
  const [nombre, setNombre] = useState('');
  const [direccion, setDireccion] = useState('');
  const [latitud, setLatitud] = useState('');
  const [longitud, setLongitud] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [tipo, setTipo] = useState('');
  const [error, setError] = useState(''); // Aquí se define el estado y la función setError
  const [mostrarHorarios, setMostrarHorarios] = useState(false);

  useEffect(() => {
    if (establecimiento) {
      setNombre(establecimiento.nombre);
      setDireccion(establecimiento.direccion);
      setLatitud(establecimiento.latitud);
      setLongitud(establecimiento.longitud);
      setDescripcion(establecimiento.descripcion);
      setTipo(establecimiento.tipo);
    }
  }, [establecimiento]);

  const handleGuardarEstablecimiento = async () => {
    try {
      if (!nombre || !direccion || !latitud || !longitud) {
        setError('Por favor complete todos los campos obligatorios.');
        return;
      }

      if (isNaN(parseFloat(latitud)) || isNaN(parseFloat(longitud))) {
        setError('Latitud y Longitud deben ser números válidos. Ejemplo: -0.97476, -80.66443');
        return;
      }
      if (establecimiento) {
        await actualizarEstablecimiento(establecimiento.id, { nombre, direccion, latitud, longitud, descripcion, tipo });
      } else {
        await crearEstablecimiento({ nombre, direccion, latitud, longitud, descripcion, tipo });
      }
      if (onSuccess) {
        onSuccess();
      }
      onCancel();
    } catch (error) {
      if (error.response && error.response.status === 409) {
        setError('Establecimiento con este nombre ya existe');
      } else if (error.response && error.response.status === 403) {
        setError('No estás autorizado para realizar esta acción.');
      } else {
        setError('Error al crear establecimiento.');
      }
    }
  };



  const handleToggleHorarios = () => {
    setMostrarHorarios(!mostrarHorarios);
  };

  return (
    <div className="ce-popup-container">
      <div className="ce-crearEditarEstablecimiento">
        <h2>{establecimiento ? 'Editar' : 'Crear'} Establecimiento</h2>
        {error && <p className="ce-error-message">{error}</p>}
        <input type="text" placeholder="Nombre *" value={nombre} onChange={(e) => setNombre(e.target.value)} />
        <input type="text" placeholder="Dirección *" value={direccion} onChange={(e) => setDireccion(e.target.value)} />
        <input type="text" placeholder="Latitud *" value={latitud} onChange={(e) => setLatitud(e.target.value)} />
        <input type="text" placeholder="Longitud *" value={longitud} onChange={(e) => setLongitud(e.target.value)} />
        <input type="text" placeholder="Descripción" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
        <input type="text" placeholder="Tipo" value={tipo} onChange={(e) => setTipo(e.target.value)} />
        <button className="ce-button-primary" onClick={handleGuardarEstablecimiento}>{establecimiento ? 'Editar' : 'Crear'} Establecimiento</button>
        <button className="ce-button-secondary" onClick={onCancel}>Cancelar</button>
        {establecimiento && (
          <>
            {!mostrarHorarios ? (
              <button className="ce-button-secondary" onClick={handleToggleHorarios}>Añadir Horario</button>
            ) : (
              <>
                <div className="ce-backdrop" onClick={handleToggleHorarios}></div>
                <div className="ce-popup-horarios">
                  <div className="ce-popup-content">
                    <CrearEditarHorarios establecimientoId={establecimiento.id} onCancel={handleToggleHorarios} />
                  </div>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default CrearEditarEstablecimiento;
