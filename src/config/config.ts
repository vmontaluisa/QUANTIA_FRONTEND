// src/config.ts

/*
const API_URL =
  window.location.hostname === 'localhost' || 
  window.location.hostname === '127.0.0.1'
    ? 'http://localhost:8000/api/'
    : window.location.hostname === '192.168.100.150'
      ? 'http://192.168.100.150:8000/api/'
      : window.location.hostname.includes('devtunnels.ms')
        ? 'https://kwb0wt78-8000.brs.devtunnels.ms/api/'
        : 'https://tu-dominio-produccion.com/api/'; // Reemplaza por tu dominio real si aplica

const API_URL_WS =
  window.location.hostname === 'localhost' || 
  window.location.hostname === '127.0.0.1'
    ? 'ws://localhost:8000/ws/updates'
    : window.location.hostname === '192.168.100.150'
      ? 'ws://192.168.100.150:8000/ws/updates'
      : window.location.hostname.includes('devtunnels.ms')
        ? 'wss://kwb0wt78-8000.brs.devtunnels.ms/ws/updates'
        : 'wss://tu-dominio-produccion.com/ws/updates'; // Reemplaza por tu dominio real si aplica
*/
//const API_URL = 'http://192.168.100.150:8000/api/';
//const API_URL_WS='https//192.168.100.150:8000/ws/updates';


//const API_URL = 'https//147.182.239.89:8000/api/';
//const API_URL_WS='https//147.182.239.89:8000/ws/updates';

const API_URL = import.meta.env.VITE_API_URL;
const API_URL_WS = import.meta.env.VITE_API_URL_WS;



export default API_URL;
export { API_URL_WS };
