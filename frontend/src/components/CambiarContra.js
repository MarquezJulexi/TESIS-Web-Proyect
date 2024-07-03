import React, { useState } from 'react';
import { cambiarContrasena } from '../services/api'; // Asegúrate de tener tu función para hacer la llamada a la API

const CambiarContra = ({ onCancel }) => {
  const [newPassword, setNewPassword] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');

  const handleCambiarContrasena = async () => {
    try {
      const response = await cambiarContrasena({ new_password: newPassword });
      setMensaje(response.message);
    } catch (error) {
      setError('Error al cambiar la contraseña.');
    }
  };

  return (
    <div>
      <h2>Cambiar Contraseña</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {mensaje && <p style={{ color: 'green' }}>{mensaje}</p>}
      <input
        type="password"
        placeholder="Nueva Contraseña"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <button onClick={handleCambiarContrasena}>Guardar</button>
      <button onClick={onCancel}>Cancelar</button>
    </div>
  );
};

export default CambiarContra;
