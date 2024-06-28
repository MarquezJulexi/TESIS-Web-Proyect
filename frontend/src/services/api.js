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

export default api;