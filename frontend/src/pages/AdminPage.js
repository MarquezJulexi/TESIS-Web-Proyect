// src/pages/AdminPage.js
import React, { useEffect, useState } from 'react';
import { fetchEstablecimientos, logoutAdmin } from '../services/api';
import { useNavigate } from 'react-router-dom';
import CrearEditarEstablecimiento from '../components/CrearEditarEstablecimiento';
import EstablecimientosLista from '../components/EstablecimientosLista';

const AdminPage = () => {
  const [establecimientos, setEstablecimientos] = useState([]);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchEstablecimientos()
      .then(data => setEstablecimientos(data))
      .catch(error => console.error('Error fetching establecimientos:', error));
  }, []);

  const handleLogout = async () => {
    try {
      await logoutAdmin();
      sessionStorage.removeItem('authenticated');
      navigate('/login');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  const handleToggleFormulario = () => {
    setMostrarFormulario(!mostrarFormulario);
  };

  return (
    <div>
      <h1>Gestión de Establecimientos</h1>
      <button onClick={handleLogout}>Cerrar Sesión</button>
      <div>
        <button onClick={handleToggleFormulario}>
          {mostrarFormulario ? 'Cancelar' : 'Nuevo Establecimiento'}
        </button>
        {mostrarFormulario && <CrearEditarEstablecimiento />}
      </div>
      <EstablecimientosLista establecimientos={establecimientos} />
    </div>
  );
};

export default AdminPage;
