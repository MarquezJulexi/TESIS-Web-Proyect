// src/components/CrearEditarHorarios.js
import React, { useState, useEffect } from 'react';
import { agregarHorario, actualizarHorario, obtenerHorarios } from '../services/api';
import ListarHorarios from './ListarHorarios';

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
      setHorarios(data);
      setError('');
      console.log(establecimientoId);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setError('No hay horarios para el establecimiento');
      } else {
        setError('Error al obtener horarios');
      }
    }
  };


useEffect(() => {
      fetchHorarios();
  }, []);

  const mostrarMensajeTemporal = (msg) => {
    setMensaje(msg);
    setTimeout(() => {
      setMensaje('');
    }, 3000);
  };

  const handleAgregarHorario = async () => {
    try {
      await agregarHorario(establecimientoId, { dia_semana: diaSemana, hora_apertura: horaApertura, hora_cierre: horaCierre });
      await fetchHorarios();
      mostrarMensajeTemporal('Horario agregado exitosamente');
    } catch (error) {
      console.error('Error al agregar horario:', error);
      mostrarMensajeTemporal('Error al agregar horario');
    }
  };

  const handleActualizarHorario = async () => {
    try {
      console.log(horarioActual);
      await actualizarHorario(horarioActual['horario.id'], { dia_semana: diaSemana, hora_apertura: horaApertura, hora_cierre: horaCierre });
      await fetchHorarios();
      mostrarMensajeTemporal('Horario actualizado exitosamente');
    } catch (error) {
      console.error('Error al actualizar horario:', error);
      mostrarMensajeTemporal('Error al actualizar horario');
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

  const handleEdit = (horario) => {
    setHorarioActual(horario);
    setDiaSemana(horario.dia || '');
    setHoraApertura(horario.apertura || '');
    setHoraCierre(horario.cierre || '');
  };



  return (
    <div>
      <h3>Horarios</h3>
      {mensaje && <p>{mensaje}</p>}
      <input
        type="text"
        placeholder="Día de la Semana"
        value={diaSemana}
        onChange={(e) => setDiaSemana(e.target.value)}
      />
      <input
        type="text"
        placeholder="Hora de Apertura"
        value={horaApertura}
        onChange={(e) => setHoraApertura(e.target.value)}
      />
      <input
        type="text"
        placeholder="Hora de Cierre"
        value={horaCierre}
        onChange={(e) => setHoraCierre(e.target.value)}
      />
      <button onClick={handleSubmit}>
        {horarioActual ? 'Actualizar Horario' : 'Agregar Horario'}
      </button>

      <ListarHorarios horarios={horarios} onEdit={handleEdit} fetchHorarios={fetchHorarios}  error={error}/>
    </div>
  );
};


export default CrearEditarHorarios;
