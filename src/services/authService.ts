import axios from 'axios';
import dayjs from "dayjs";

import API_URL from '../config/config';


export const login = async (username: string, password: string) => {
  const response = await axios.post(`${API_URL}login`, { username, password });
  const token = response.data.access_token;
  localStorage.setItem('auth_token', token);
  return token;
};


export const getCurrentUser = async () => {
  const token = localStorage.getItem('auth_token');
  if (!token) throw new Error('No token found');

  const response = await axios.get(`${API_URL}me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};


export const getToken = () => localStorage.getItem('auth_token');


export const logout = () => localStorage.removeItem('auth_token');