// src/components/CrearEditarHorarios.js
import React, { useState, useEffect } from 'react';
import { agregarHorario, actualizarHorario, eliminarHorario, obtenerHorarios } from '../services/api';

const CrearEditarHorarios = ({ establecimientoId }) => {
  const [horarios, setHorarios] = useState([]);
  const [diaSemana, setDiaSemana] = useState('');
  const [horaApertura, setHoraApertura] = useState('');
  const [horaCierre, setHoraCierre] = useState('');
  const [horarioActual, setHorarioActual] = useState(null);
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState(''); // Aquí se define el estado y la función setError

  const fetchHorarios = async () => {
    try {
      const data = await obtenerHorarios(establecimientoId);
      setHorarios(data); //`data` es un arreglo de objetos con propiedades `id`, `dia_semana`, `hora_apertura`, `hora_cierre`
    } catch (error) {
        if (error.response && error.response.status === 404) {
            setError('No hay ningun horario. Agrega uno');
          } 
    }
  };
  useEffect(() => {
    if (establecimientoId) {
      fetchHorarios();
    }
  }, [establecimientoId]);

  const mostrarMensajeTemporal = (msg) => {
    setMensaje(msg);
    setTimeout(() => {
      setMensaje('');
    }, 3000);
  };

  const handleAgregarHorario = async () => {
    try {
      await agregarHorario(establecimientoId, { dia_semana: diaSemana, hora_apertura: horaApertura, hora_cierre: horaCierre });
      await fetchHorarios(); // Actualizar la lista de horarios después de agregar
      mostrarMensajeTemporal('Horario agregado exitosamente');
    } catch (error) {
      console.error('Error al agregar horario:', error);
      mostrarMensajeTemporal('Error al agregar horario');
    }
  };

  const handleActualizarHorario = async () => {
    try {
      await actualizarHorario(horarioActual.id, { dia_semana: diaSemana, hora_apertura: horaApertura, hora_cierre: horaCierre });
      await fetchHorarios(); // Actualizar la lista de horarios después de actualizar
      mostrarMensajeTemporal('Horario actualizado exitosamente');
    } catch (error) {
      console.error('Error al actualizar horario:', error);
      mostrarMensajeTemporal('Error al actualizar horario');
    }
  };

  const handleEliminarHorario = async (id) => {
    try {
      await eliminarHorario(id);
      await fetchHorarios(); // Actualizar la lista de horarios después de eliminar
      mostrarMensajeTemporal('Horario eliminado exitosamente');
    } catch (error) {
      console.error('Error al eliminar horario:', error);
      mostrarMensajeTemporal('Error al eliminar horario');
    }
  };

  const handleSubmit = () => {
    if (horarioActual) {
      handleActualizarHorario();
    } else {
      handleAgregarHorario();
    }
    setDiaSemana('');
    setHoraApertura('');
    setHoraCierre('');
    setHorarioActual(null);
  };

  return (
    <div>
      <h3>Horarios</h3>
      {mensaje && <p>{mensaje}</p>}
      <input type="text" placeholder="Día de la Semana" value={diaSemana} onChange={(e) => setDiaSemana(e.target.value)} />
      <input type="text" placeholder="Hora de Apertura" value={horaApertura} onChange={(e) => setHoraApertura(e.target.value)} />
      <input type="text" placeholder="Hora de Cierre" value={horaCierre} onChange={(e) => setHoraCierre(e.target.value)} />
      <button onClick={handleSubmit}>{horarioActual ? 'Actualizar Horario' : 'Agregar Horario'}</button>

      <div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
        {horarios.map((horario) => (
          <div key={horario.id}>
            <p>{horario.dia_semana}: {horario.hora_apertura} - {horario.hora_cierre}</p>
            <button onClick={() => {
              setHorarioActual(horario);
              setDiaSemana(horario.dia_semana);
              setHoraApertura(horario.hora_apertura);
              setHoraCierre(horario.hora_cierre);
            }}>Editar</button>
            <button onClick={() => handleEliminarHorario(horario.id)}>Eliminar</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CrearEditarHorarios;
