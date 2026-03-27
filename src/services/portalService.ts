import axios from 'axios';
import dayjs from "dayjs";

import API_URL from '../config/config';

// Interceptor global para agregar el token Bearer a todas las solicitudes salientes
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

////////////////////////////////////////////////////////////////////////////////////


export const fetchProcesosRecomendados = async (empresaId: number) => {
  try {
    const response = await axios.get(`${API_URL}portal/procesos_recomendados_ai/${empresaId}`);
    return response.data.data; // Asegúrate que el JSON viene como { data: [...] }
  } catch (error) {
    console.error('❌ Error en fetchProcesosPorVencer:', error);
    return [];
  }
};



////////////////////////////////////////////////////////////////////////////////////

export const fetchProcesosPorVencer = async (empresaId: number) => {
  try {
    const response = await axios.get(`${API_URL}portal/procesos_proximos_vencer/${empresaId}`);
    return response.data.data; // Asegúrate que el JSON viene como { data: [...] }
  } catch (error) {
    console.error('❌ Error en fetchProcesosPorVencer:', error);
    return [];
  }
};



// Servicio para /procesos_vigentes
export const fetchProcesosVigentes = async () => {
  try {
    const response = await axios.get(`${API_URL}portal/procesos_vigentes`);
    return response.data.data;
  } catch (error) {
    console.error('❌ Error en fetchProcesosVigentes:', error);
    return [];
  }
};

// Servicio para /procesos_vigentes
export const fetchProcesosTodos = async () => {
  try {
    const response = await axios.get(`${API_URL}portal/procesos_todos`);
    return response.data.data;
  } catch (error) {
    console.error('❌ Error en fetchProcesosTodos:', error);
    return [];
  }
};


export const fetchCPCEmpresa = async (empresaId: number) => {
  try {
    const response = await axios.get(`${API_URL}portal/empresa_cpc/${empresaId}`);
    return response.data.data; // Asegúrate que el JSON viene como { data: [...] }
  } catch (error) {
    console.error('❌ Error en fetchCPCEmpresa:', error);
    return [];
  }
};

export const fetchTerminoEmpresa = async (empresaId: number) => {
  try {
    const response = await axios.get(`${API_URL}portal/empresa_terminos/${empresaId}`);
    return response.data.data; // Asegúrate que el JSON viene como { data: [...] }
  } catch (error) {
    console.error('❌ Error en fetchTerminoEmpresa:', error);
    return [];
  }
};

export const fetchProcesosVigentesUbicacion = async (empresaId: number) => {
  try {
    const response = await axios.get(`${API_URL}portal/procesos_proximos_ubicacion/${empresaId}`);
    return response.data.data; // Asegúrate que el JSON viene como { data: [...] }
  } catch (error) {
    console.error('❌ Error en fetchProcesosVigentesUbicacion:', error);
    return [];
  }
};

////////////////
export const fetchGraficosNube = async (empresaId: number) => {
  try {
    const response = await axios.get(`${API_URL}graficos/nube_palabras_empresa/${empresaId}`);
    return response.data.data; // Asegúrate que el JSON viene como { data: [...] }
  } catch (error) {
    console.error('❌ Error en fetchGraficosNube:', error);
    return [];
  }
};


export const fetchGraficosProvincias = async (empresaId: number) => {
  try {
    const response = await axios.get(`${API_URL}graficos/provincias/${empresaId}`);
    return response.data.data; // Asegúrate que el JSON viene como { data: [...] }
  } catch (error) {
    console.error('❌ Error en fetchGraficosProvincias:', error);
    return [];
  }
};

export const fetchGraficosEntidades = async (empresaId: number) => {
  try {
    const response = await axios.get(`${API_URL}graficos/entidades/${empresaId}`);
    return response.data.data; // Asegúrate que el JSON viene como { data: [...] }
  } catch (error) {
    console.error('❌ Error en fetchGraficosEntidades:', error);
    return [];
  }
};



export const fetchPublicacionesPorDia = async (empresaId: number) => {
  try {
    const response = await axios.get(`${API_URL}graficos/publicaciones_por_dia/${empresaId}`);
     const procesado= response.data.data.map((item: any) => ({
      x: dayjs(item.fecha).toDate(),
      y: item.cantidad
    }));
    return procesado
  } catch (error) {
    console.error('❌ Error en fetchPublicacionesPorDia:', error);
    return [];
  }
};


/////
export const fetchIndicadoresInicio = async (empresaId: number) => {
  try {
    const response = await axios.get(`${API_URL}indicadores/datos/${empresaId}`);
    return response.data.data; // Asegúrate que el JSON viene como { data: [...] }
  } catch (error) {
    console.error('❌ Error en fetchIndicadoresInicio:', error);
    return [];
  }
};


export const fetchPublicacionesPorHora = async (empresaId: number) => {
  try {
    const response = await axios.get(`${API_URL}graficos/publicaciones_por_hora/${empresaId}`);
    const datos = response.data?.data || [];

    const horasCompletas = Array.from({ length: 24 }, (_, i) => i);
    const mapa = new Map(datos.map((item: any) => [item.hora, item.cantidad]));
    const procesado= horasCompletas.map(hora => ({
      label: `${hora.toString().padStart(2, '0')}:00`,
      value: mapa.get(hora) || 0,
    }));
    return procesado;
  } catch (error) {
    console.error('❌ Error en fetchPublicacionesPorHora:', error);
    return [];
  }
};




export const fetchPublicacionesHoyPorHora = async (empresaId: number) => {
  try {
    const response = await axios.get(`${API_URL}graficos/publicaciones_hoy_por_hora/${empresaId}`);
    const datos = response.data?.data || [];

    const horasCompletas = Array.from({ length: 24 }, (_, i) => i);
    const mapa = new Map(datos.map((item: any) => [item.hora, item.cantidad]));
    const procesado= horasCompletas.map(hora => ({
      label: `${hora.toString().padStart(2, '0')}:00`,
      value: mapa.get(hora) || 0,
    }));
    return procesado;
  } catch (error) {
    console.error('❌ Error en fetchPublicacionesPorHora:', error);
    return [];
  }
};


////////////////////////////////////////////////////////////////////////////

export const fetchGraficosProvinciasTodos = async () => {
  try {
    const response = await axios.get(`${API_URL}graficos/procesos_provincia`);
    //return response.data.data; // Asegúrate que el JSON viene como { data: [...] }
     const procesado= response.data.data.map((item: any) => ({
      x: item.provincia,
      y: item.cantidad
    }));
    return procesado
  } catch (error) {
    console.error('❌ Error en fetchGraficosProvinciasTodos:', error);
    return [];
  }
};

export const fetchPublicacionesPorDiaTodos = async () => {
  try {
    const response = await axios.get(`${API_URL}graficos/procesos_dia`);
     const procesado= response.data.data.map((item: any) => ({
      x: dayjs(item.fecha).toDate(),
      y: item.cantidad
    }));
    return procesado
  } catch (error) {
    console.error('❌ Error en fetchPublicacionesPorDiaTodos:', error);
    return [];
  }
};

export const fetchVencerPorDiaTodos = async () => {
  try {
    const response = await axios.get(`${API_URL}graficos/procesos_vencer`);
     const procesado= response.data.data.map((item: any) => ({
      x: dayjs(item.fecha).toDate(),
      y: item.cantidad
    }));
    return procesado
  } catch (error) {
    console.error('❌ Error en fetchVencerPorDiaTodos:', error);
    return [];
  }
};

////////////////////////////////////////////////////////////////////////////////////////////////

export const fetchListadoUbicaiones = async() => { 
  try {
    const response = await axios.get(`${API_URL}portal/listado_ubicaciones`);
    return response.data.data; // Asegúrate que el JSON viene como { data: [...] }
  } catch (error) {
    console.error('❌ Error en fetchListadoUbicaiones:', error);
    return [];
  }
};

////////////////////////////////////////////////////////////////////////////////////////////////

export const fetchProcesosTermino = async (empresaId: number) => {  ///BORRAR
  try {
    const response = await axios.get(`${API_URL}portal/procesos_termino/${empresaId}`);
    return response.data.data; // Asegúrate que el JSON viene como { data: [...] }
  } catch (error) {
    console.error('❌ Error en fetchProcesosTermino:', error);
    return [];
  }
};

export const fetchProcesosCPC = async (empresaId: number) => { ///BORRAR
  try {
    const response = await axios.get(`${API_URL}portal/procesos_cpc/${empresaId}`);
    return response.data.data; // Asegúrate que el JSON viene como { data: [...] }
  } catch (error) {
    console.error('❌ Error en fetchProcesosCPC:', error);
    return [];
  }
};






////////////////////////////////////////////////////////////////////////////////////////////////BORRAR

export const fetchProcesos3 = async () => {
  const response = await axios.get('/api/procesos');
  return response.data;
};

export const getProcesoById_2 = async (id: string) => {

  const response = await axios.get('/api/procesos');
  return response.data;
/*
  const response = await fetch(`${import.meta.env.VITE_API_URL}/procesos/${id}`);
  if (!response.ok) throw new Error('Error al obtener el proceso');
  return await response.json();
*/
};


// src/services/procesoService.ts

export const getProcesoById3 = async (id: string) => {
  // Simulación de datos para pruebas
  const mock = {
    id,
    codigo: `CPC-${id}`,
    tipo_necesidad: 'SERVICIO',
    descripcion: 'Adquisición de servicios de desarrollo de software personalizado.',
    entidad_contratante: 'Ministerio de Innovación y Tecnología',
    entidad_link: 'https://compraspublicas.gob.ec/proceso/12345',
    fecha_publicacion_date: '2024-06-12',
    fecha_limite_date: '2024-06-20',
    provincia: 'Pichincha',
    canton: 'Quito',
    parroquia: 'Centro Histórico',
    direccion_entrega: 'Av. Amazonas y Juan de Ascaray',
    responsable: 'Gabriel Novoa',
    correo_responsable: 'g.novoa@estrategos.mobi',
    detalle: [
      {
        producto: 'Servicio de desarrollo de portal web',
        cantidad: 1,
        unidad: 'servicio',
        precio: 5000,
      },
      {
        producto: 'Mantenimiento de sistema existente',
        cantidad: 6,
        unidad: 'mes',
        precio: 800,
      },
    ],
    documentos: [
      {
        descripcion: 'Términos de Referencia',
        url: 'https://example.com/tdr.pdf',
      },
      {
        descripcion: 'Pliego de Condiciones',
        url: 'https://example.com/pliego.pdf',
      },
    ],
  };

  return new Promise((resolve) => {
    setTimeout(() => resolve(mock), 600); // Simula retardo de red
  });
};