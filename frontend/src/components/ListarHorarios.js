// src/components/ListarHorarios.js
import React from 'react';
import {eliminarHorario} from '../services/api';

const ListarHorarios = ({ horarios, onEdit, fetchHorarios, error }) => {
    const handleEliminarHorario = async (id) => {
        try {
            await eliminarHorario(id);
            fetchHorarios();
            console.log(error)
        } catch (error) {
            
            console.error('Error al eliminar horario:', error);
        }
      };
    return (
      <div>
        
        {horarios.length === 0 && <p>No hay horarios disponibles. Agrega uno.</p>}
        {horarios.map((horario) => (
            <div key={horario['horario.id']}>
            <p>{horario.dia}: {horario.apertura} - {horario.cierre}</p>
            <button onClick={() => onEdit(horario)}>Editar</button>
            <button onClick={() => handleEliminarHorario(horario['horario.id'])}>Eliminar</button>
            </div>
        ))}
        </div>
    );
  };

export default ListarHorarios;
