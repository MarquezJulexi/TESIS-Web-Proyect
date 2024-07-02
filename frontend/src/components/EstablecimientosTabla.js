// src/components/EstablecimientosTabla.js
import React from 'react';

const EstablecimientosTabla = ({ establecimiento }) => {
  if (!establecimiento) {
    return (
      <div>
        <h2>Selecciona un establecimiento para ver detalles</h2>
      </div>
    );
  }

  const { nombre, direccion, descripcion, tipo, horarios } = establecimiento;

  return (
    <div>
      <h2>Detalles del Establecimiento</h2>
      <table>
        <tbody>
          <tr>
            <td>Nombre:</td>
            <td>{nombre}</td>
          </tr>
          <tr>
            <td>Dirección:</td>
            <td>{direccion}</td>
          </tr>
          <tr>
            <td>Descripción:</td>
            <td>{descripcion}</td>
          </tr>
          <tr>
            <td>Tipo:</td>
            <td>{tipo}</td>
          </tr>
          <tr>
            <td>Horarios:</td>
            <td>
              {horarios.map((horario, index) => (
                <div key={index}>
                  {horario.dia}, desde {horario.apertura} hasta {horario.cierre}
                </div>
              ))}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default EstablecimientosTabla;
