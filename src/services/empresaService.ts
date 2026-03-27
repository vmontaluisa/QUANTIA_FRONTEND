import axios from 'axios';
import dayjs from "dayjs";
import API_URL from '../config/config';



///////////////////////////////////////////// BOORAR

export const fetchEmpresas = async () => {
  const response = await axios.get('${API_URL}empresas');
  return response.data;
};

export const getEmpresaById = async (id: number) => {
  const response = await axios.get(`${API_URL}empresas/${id}`);
  return response.data;
};

/////////////////////////////////////////////////////////////////

export const fetchListarUnaEmpresa = async (empresaId: number) => {
  const response = await axios.get(`${API_URL}empresa/listaruno/${empresaId}`);
  return response.data.data;
};

export const fetchCrearEmpresa = async (empresaData: any) => {
  const response = await axios.post('${API_URL}empresa/crear', empresaData);
  return response.data.data;
};

export const fetchEditarEmpresa = async (empresaId: number, empresaData: any) => {
  const response = await axios.put(`${API_URL}empresa/editar/${empresaId}`, empresaData);
  return response.data.data;
};

export const fetchEliminarEmpresa = async (empresaId: number) => {
  const response = await axios.delete(`${API_URL}empresa/eliminar/${empresaId}`);
  return response.data.data;
};
export const fetchListarEmpresas = async () => {
  const response = await axios.get('${API_URL}empresa/listar');
  return response.data.data;
};