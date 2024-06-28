import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Map from '../components/Map';
import EstablecimientosTabla from '../components/EstablecimientosTabla';
import AgenteVirtual from '../components/AgenteVirtual';
import { fetchEstablecimientos, preguntarAgenteVirtual } from '../services/api';

const HomePage = () => {
  const [establecimientos, setEstablecimientos] = useState([]);
  const [respuestaAgente, setRespuestaAgente] = useState('');

  useEffect(() => {
    const fetchEstablecimientosData = async () => {
      try {
        const data = await fetchEstablecimientos();
        setEstablecimientos(data);  // Actualiza el estado con los establecimientos obtenidos
      } catch (error) {
        console.error('Error fetching establecimientos:', error);
      }
    };

    fetchEstablecimientosData();
  }, []);

  const handlePreguntaAgente = async () => {
    try {
      const pregunta = '¿Cuál es el horario de apertura del establecimiento Cafetería Central?';
      const respuesta = await preguntarAgenteVirtual(pregunta);
      setRespuestaAgente(respuesta);
    } catch (error) {
      console.error('Error preguntando al agente virtual:', error);
    }
  };

  return (
    <div>
      <Header />
      <main>
        <Map establecimientos={establecimientos} />
        <EstablecimientosTabla establecimientos={establecimientos} />
        <AgenteVirtual pregunta={handlePreguntaAgente} respuesta={respuestaAgente} />
      </main>
    </div>
  );
};

export default HomePage;