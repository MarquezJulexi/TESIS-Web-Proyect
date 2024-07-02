// src/components/CrearEditarEstablecimiento.js
import React, { useState } from 'react';
import { crearEstablecimiento } from '../services/api';

const CrearEditarEstablecimiento = ({ establecimiento }) => {
  const [nombre, setNombre] = useState('');
  const [direccion, setDireccion] = useState('');
  const [latitud, setLatitud] = useState('');
  const [longitud, setLongitud] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [tipo, setTipo] = useState('');

  const handleCrearEstablecimiento = async () => {
    try {
      await crearEstablecimiento({ nombre, direccion, latitud, longitud, descripcion, tipo });
      // Lógica adicional después de crear el establecimiento
    } catch (error) {
      console.error('Error al crear establecimiento:', error);
    }
  };

  return (
    <div>
      <h2>{establecimiento ? 'Editar' : 'Crear'} Establecimiento</h2>
      <input type="text" placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} />
      <input type="text" placeholder="Dirección" value={direccion} onChange={(e) => setDireccion(e.target.value)} />
      <input type="text" placeholder="Latitud" value={latitud} onChange={(e) => setLatitud(e.target.value)} />
      <input type="text" placeholder="Longitud" value={longitud} onChange={(e) => setLongitud(e.target.value)} />
      <input type="text" placeholder="Descripción" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
      <input type="text" placeholder="Tipo" value={tipo} onChange={(e) => setTipo(e.target.value)} />
      <button onClick={handleCrearEstablecimiento}>{establecimiento ? 'Editar' : 'Crear'} Establecimiento</button>
    </div>
  );
};

export default CrearEditarEstablecimiento;
