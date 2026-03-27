import axios from 'axios';
import dayjs from "dayjs";
import API_URL from '../config/config';




// Interceptor global para agregar el token Bearer a todas las solicitudes salientes
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


// ====================== EMPRESA TERMINOS ======================
export const fetchCrearEmpresaTermino = async (empresaId: number, termino: string) => {
  try {
    const response = await axios.post(`${API_URL}empresa_terminos/crear`, null, {
      params: { empresa_id: empresaId, termino }
    });
    return response.data.data;
  } catch (error) {
    console.error('❌ Error en fetchCrearEmpresaTermino:', error);
    return null;
  }
};

export const fetchEditarEmpresaTermino = async (terminoId: number, nuevoTermino: string) => {
  try {
    const response = await axios.put(`${API_URL}empresa_terminos/editar/${terminoId}`, null, {
      params: { termino: nuevoTermino }
    });
    return response.data.data;
  } catch (error) {
    console.error('❌ Error en fetchEditarEmpresaTermino:', error);
    return null;
  }
};

export const fetchEliminarEmpresaTermino = async (terminoId: number) => {
  try {
    const response = await axios.delete(`${API_URL}empresa_terminos/eliminar/${terminoId}`);
    return response.data.data;
  } catch (error) {
    console.error('❌ Error en fetchEliminarEmpresaTermino:', error);
    return null;
  }
};


export const fetchListarEmpresaTermino = async (empresaId: number) => {
  try {
    const response = await axios.get(`${API_URL}empresa_terminos/listar/${empresaId}`);
    return response.data.data; // Asegúrate que el JSON viene como { data: [...] }
  } catch (error) {
    console.error('❌ Error en fetchListarEmpresaTermino:', error);
    return [];
  }
};


