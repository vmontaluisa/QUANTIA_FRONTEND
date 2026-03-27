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


// ====================== PROCESO UBICACIONES ======================

export const fetchListarEmpresaUbicacion = async (procesoId: number) => {
  try {
    const response = await axios.get(`${API_URL}proceso/listaruno/${procesoId}`);
    return response.data.data;
  } catch (error) {
    console.error('❌ Error en fetchListarEmpresaUbicacion:', error);
    return null;
  }
};