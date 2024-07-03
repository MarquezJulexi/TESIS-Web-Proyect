// src/pages/AdminPage.js
import React, { useEffect, useState } from 'react';
import { fetchEstablecimientos, logoutAdmin } from '../services/api';
import { useNavigate } from 'react-router-dom';
import CrearEditarEstablecimiento from '../components/CrearEditarEstablecimiento';
import EstablecimientosLista from '../components/EstablecimientosLista';
import CambiarContra from '../components/CambiarContra';

const AdminPage = () => {
  const [establecimientos, setEstablecimientos] = useState([]);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [mostrarCambio, setMostrarCambio] = useState(false); // inicializar variable que va a tener el mostrar cambiarContra
  const [establecimientoSeleccionado, setEstablecimientoSeleccionado] = useState(null);
  const [mensaje, setMensaje] = useState('');
  const navigate = useNavigate();

  /*useEffect(() => {
    fetchEstablecimientos()
      .then(data => setEstablecimientos(data))
      .catch(error => console.error('Error fetching establecimientos:', error));
  }, []);*/
  const fetchAndSetEstablecimientos = async () => {
    try {
      const data = await fetchEstablecimientos();
      setEstablecimientos(data);
    } catch (error) {
      console.error('Error fetching establecimientos:', error);
    }
  };

  useEffect(() => {
    fetchAndSetEstablecimientos();
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

  const handleMostrarCambio=async () => {
    setMostrarCambio(true);
  };
  const handleOcultarCambio=async () => {
    setMostrarCambio(false);
  };
  const handleToggleFormulario = () => {
    if (mostrarFormulario) {
      setEstablecimientoSeleccionado(null); // Reiniciar el estado seleccionado al cerrar el formulario
    }
    setMostrarFormulario(!mostrarFormulario);
  };
  const handleEditEstablecimiento = (establecimiento) => {
    setEstablecimientoSeleccionado(establecimiento);
    setMostrarFormulario(true);
  };

  const mostrarMensajeTemporal = (msg) => {
    setMensaje(msg);
    setTimeout(() => {
      setMensaje('');
    }, 3000); // El mensaje desaparece después de 3 segundos
  };
  return (
    <div>
      <h1>Gestión de Establecimientos</h1>
      <button onClick={handleLogout}>Cerrar Sesión</button>
      <button onClick={handleMostrarCambio}>Cambiar Contraseña</button>
      {mostrarCambio && (
        <CambiarContra onCancel={handleOcultarCambio} />
      )}
      <div>
        <button onClick={handleToggleFormulario}>
          {mostrarFormulario ? 'Cancelar' : 'Nuevo Establecimiento'}
        </button>
        {mostrarFormulario && <CrearEditarEstablecimiento 
        establecimiento={establecimientoSeleccionado}
        onSuccess={fetchAndSetEstablecimientos} 
        handleToggleFormulario={handleToggleFormulario} />}
      </div>
      {mensaje && <p>{mensaje}</p>}
      <div>
        <EstablecimientosLista 
          establecimientos={establecimientos} 
          onEdit={handleEditEstablecimiento} 
          onEliminar={fetchAndSetEstablecimientos}
          mostrarMensaje={mostrarMensajeTemporal}
        />
      </div>
      
    </div>
  );
};

export default AdminPage;
