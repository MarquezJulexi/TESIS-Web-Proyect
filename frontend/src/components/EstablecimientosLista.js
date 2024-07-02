// src/components/EstablecimientosLista.js
import React from 'react';

const EstablecimientosLista = ({ establecimientos }) => {
  return (
    <div>
      {establecimientos.map(est => (
        <div key={est.id}>
          <h2>{est.nombre}</h2>
          <p>{est.direccion}</p>
        </div>
      ))}
    </div>
  );
};

export default EstablecimientosLista;
