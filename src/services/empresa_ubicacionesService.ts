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


// ====================== EMPRESA UBICACIONES ======================
export const  fetchCrearEmpresaUbicacion = async (empresaId: number, ubicacion: string) => {
  const response = await axios.post(`${API_URL}empresa_ubicaciones/crear`, null, {
    params: { empresa_id:empresaId, ubicacion }
  });
  return response.data.data;
};

export const  fetchEditarEmpresaUbicacion = async (ubicacionId: number, nuevaUbicacion: string) => {
  const response = await axios.put(`${API_URL}empresa_ubicaciones/editar/${ubicacionId}`, null, {
    params: { nueva_ubicacion: nuevaUbicacion }
  });
  return response.data.data;
};

export const  fetchEliminarEmpresaUbicacion = async (ubicacionId: number) => {
  const response = await axios.delete(`${API_URL}empresa_ubicaciones/eliminar/${ubicacionId}`);
  return response.data.data;
};



export const fetchListarEmpresaUbicacion = async (empresaId: number) => {
  const response = await axios.get(`${API_URL}empresa_ubicaciones/listar/${empresaId}`);
  return response.data.data; // Asegúrate que el JSON viene como { data: [...] }
};