// src/pages/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/api';

const LoginPage = () => {
    const [usuario, setUsername] = useState('');
    const [contrasena, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(usuario,contrasena,'login');
      await login({ usuario, contrasena });
      sessionStorage.setItem('authenticated', 'true');
      navigate('/admin');
    } catch (error) {
      setError('Credenciales inválidas. Por favor, inténtalo de nuevo.');
    }
  };

  return (
    <div>
      <h1>Inicio de Sesión</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Usuario:</label>
          <input
            type="text"
            value={usuario}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Contraseña:</label>
          <input
            type="password"
            value={contrasena}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Iniciar Sesión</button>
      </form>
    </div>
  );
};

export default LoginPage;
