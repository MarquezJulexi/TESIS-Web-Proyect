// src/components/EstablecimientosLista.js
import React from 'react';
import { eliminarEstablecimiento } from '../services/api';

const EstablecimientosLista = ({ establecimientos, onEdit, onEliminar, mostrarMensaje  }) => {
  const handleEliminar = async (id) => {
    try {
      const response = await eliminarEstablecimiento(id);
      mostrarMensaje(response.message);
      onEliminar(); // Actualizar la lista de establecimientos
    } catch (error) {
      console.error('Error eliminando establecimiento:', error);
      alert('Error eliminando establecimiento');
    }
  };
  return (
    <div>
      {establecimientos.map(est => (
        <div key={est.id}>
          <h2>{est.nombre}</h2>
          <p>{est.direccion}</p>
          <button onClick={() => onEdit(est) }>Editar</button>
          <button onClick={() => handleEliminar(est.id)}>Eliminar</button>
        </div>
      ))}
    </div>
  );
};

export default EstablecimientosLista;
