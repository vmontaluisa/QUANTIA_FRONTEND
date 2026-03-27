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




 // ====================== EMPRESA CPC ======================
export const fetchCrearEmpresaCPC = async (empresaId: number, codigo_cpc: string, producto: string) => {
  try {
    const response = await axios.post(`${API_URL}empresa_cpc/crear`, null, {
      params: { empresa_id: empresaId, codigo_cpc, producto }
    });
    return response.data.data;
  } catch (error) {
    console.error('❌ Error en fetchCrearEmpresaCPC:', error);
    return null;
  }
};

export const fetchEditarEmpresaCPC = async (cpcId: number, codigo_cpc_nuevo: string, nuevoProducto: string) => {
  try {
    const response = await axios.put(`${API_URL}empresa_cpc/editar/${cpcId}`, null, {
      params: { producto: nuevoProducto, codigo_cpc: codigo_cpc_nuevo }
    });
    return response.data.data;
  } catch (error) {
    console.error('❌ Error en fetchEditarEmpresaCPC:', error);
    return null;
  }
};

export const fetchEliminarEmpresaCPC = async (cpcId: number) => {
  try {
    const response = await axios.delete(`${API_URL}empresa_cpc/eliminar/${cpcId}`);
    return response.data.data;
  } catch (error) {
    console.error('❌ Error en fetchEliminarEmpresaCPC:', error);
    return null;
  }
};


export const fetchListarEmpresaCPC = async (empresaId: number) => {
  try {
    const response = await axios.get(`${API_URL}empresa_cpc/listar/${empresaId}`);
    return response.data.data; // Asegúrate que el JSON viene como { data: [...] }
  } catch (error) {
    console.error('❌ Error en fetchListarEmpresaCPC:', error);
    return [];
  }
};
