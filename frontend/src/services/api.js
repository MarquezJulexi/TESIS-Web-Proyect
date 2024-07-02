import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api', //URL según tu backend
});

// Función para obtener todos los establecimientos
export const fetchEstablecimientos = async () => {
  try {
    const response = await api.get('/establecimientos');
    return response.data;
  } catch (error) {
    console.error('Error fetching establecimientos:', error);
    throw error;
  }
};

// Función para enviar la pregunta al agente virtual
export const preguntarAgenteVirtual = async (pregunta) => {
  try {
    const response = await api.post('/preguntar', { pregunta });
    return response.data.respuesta;
  } catch (error) {
    console.error('Error preguntando al agente virtual:', error);
    throw error;
  }
};
//Funcion para el login
export const login = async (usuario, contrasena) => {
  try {
    console.log(usuario.usuario, usuario.contrasena,'api');
    const response = await api.post('/login', { usuario:usuario.usuario, contrasena:usuario.contrasena });
    if (response.data.token) {
      sessionStorage.setItem('token', response.data.token);
    }
    if (response.data.message === 'Login successful') {
      return response.data;
    } else {
      
      throw new Error('Credenciales incorrectas');
    }
  } catch (error) {
    
    throw error;
  }
};


//Función para el logout
export const logoutAdmin = async () => {
  try {
    const response = await api.post('/logout');
    return response.data;
  } catch (error) {
    console.error('Error al cerrar sesión:', error);
    throw error;
  }
};

//Funcion para c  rear establecimientos
export const crearEstablecimiento = async (datosEstablecimiento) => {
  try {
    const response = await api.post('/establecimientos', datosEstablecimiento);
    return response.data;
  } catch (error) {
    console.error('Error al crear establecimiento:', error);
    throw error;
  }
};

export default api;