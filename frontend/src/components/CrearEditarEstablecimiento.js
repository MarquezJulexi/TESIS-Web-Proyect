// src/components/CrearEditarEstablecimiento.js
import React, { useState, useEffect  } from 'react';
import { crearEstablecimiento, actualizarEstablecimiento  } from '../services/api';
import CrearEditarHorarios from '../components/CrearEditarHorarios';

const CrearEditarEstablecimiento = ({ establecimiento, onSuccess, handleToggleFormulario  }) => {
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
      if (establecimiento) {
        await actualizarEstablecimiento(establecimiento.id, { nombre, direccion, latitud, longitud, descripcion, tipo });
      } else {
        await crearEstablecimiento({ nombre, direccion, latitud, longitud, descripcion, tipo });
      }
      if (onSuccess) {
        onSuccess();
      }
      handleToggleFormulario();
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
    <div>
      
      <h2>{establecimiento ? 'Editar' : 'Crear'} Establecimiento</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <input type="text" placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} />
      <input type="text" placeholder="Dirección" value={direccion} onChange={(e) => setDireccion(e.target.value)} />
      <input type="text" placeholder="Latitud" value={latitud} onChange={(e) => setLatitud(e.target.value)} />
      <input type="text" placeholder="Longitud" value={longitud} onChange={(e) => setLongitud(e.target.value)} />
      <input type="text" placeholder="Descripción" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
      <input type="text" placeholder="Tipo" value={tipo} onChange={(e) => setTipo(e.target.value)} />
      <button onClick={handleGuardarEstablecimiento}>{establecimiento ? 'Editar' : 'Crear'} Establecimiento</button>
      {establecimiento && (
        <>
          {!mostrarHorarios ? (
            <button onClick={handleToggleHorarios}>Añadir Horario</button>
          ) : (
            <>
              <CrearEditarHorarios establecimientoId={establecimiento.id} />
              <button onClick={handleToggleHorarios}>Cancelar</button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default CrearEditarEstablecimiento;
