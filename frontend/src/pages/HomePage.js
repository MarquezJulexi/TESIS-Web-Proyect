import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Map from '../components/Map';
import EstablecimientosTabla from '../components/EstablecimientosTabla';
import AgenteVirtual from '../components/AgenteVirtual';
import { fetchEstablecimientos } from '../services/api';
import './css/HomePage.css';

const HomePage = () => {
  const [establecimientos, setEstablecimientos] = useState([]);
  const [tablaEstablecimiento, setTablaEstablecimiento] = useState(null);

  useEffect(() => {
    const fetchEstablecimientosData = async () => {
      try {
        const data = await fetchEstablecimientos();
        setEstablecimientos(data);  // Actualiza el estado con los establecimientos obtenidos
      } catch (error) {
        console.error('Error fetching establecimientos:', error);
      }
    };

    fetchEstablecimientosData(); // Llama a la función para obtener los establecimientos al cargar la página
  }, []);

  const handleEstablecimientoSelect = (establecimiento) => {
    setTablaEstablecimiento(establecimiento);
  };

  return (
    <div className="hp-homepage">
      <header className="hp-header">
        <Header />
      </header>
      <div className="hp-main-content">
        <div className="hp-left-column">
          <EstablecimientosTabla establecimiento={tablaEstablecimiento} />
        </div>
        <div className="hp-right-column">
          <Map establecimientos={establecimientos} onEstablecimientoSelect={handleEstablecimientoSelect} />
        </div>
      </div>
      <div className="hp-agent-container">
        <AgenteVirtual />
      </div>
    </div>
  );
};

export default HomePage;