import React from 'react';

export interface Usuario {
  id: number;
  nombre: string;
  email: string;
  rol: string;
  activo: boolean;
}

export interface Empresa {
  id: number;
  ruc: string;
  nombre: string;
  direccion?: string;
  correo?: string;
  responsable?: string;
  cargo?: string;
  cedula_responsable?: string;
  activo: boolean;
}

export interface Proceso {
  id: number;
  codigo: string;
  descripcion: string;
  estado: string;
  fecha_limite: string;
  fecha_publicacion: string;
  entidad_contratante: string;
  provincia_canton: string;
  direccion_entrega?: string;
  contacto?: string;
  tipo_proceso?: string;
}

export interface Termino {
  id: number;
  empresa_id: number;
  termino: string;
  activo: boolean;
}

export interface CPC {
  id: number;
  empresa_id: number;
  codigo_cpc: string;
  producto: string;
  activo: boolean;
}

// types/index.ts o en el mismo archivo de IndicadorCard.tsx si no tienes tipos globales

export interface IndicadorCardProps {
  icon: React.ReactNode;            // Emoji o ícono representado como string
  label: string;           // Texto descriptivo del indicador
  value: number | string;  // Valor numérico o cadena formateada
}



export interface AlertCardProps {
  titulo: string;
  descripcion: string;
  fecha: string;
  tags?: string[];
}


export interface CPCChipProps {
  codigo: string;
}


export interface DataItem {
  label: string;
  value: number;
}

export interface GraficoBarraProps {
  title: string;
  data: DataItem[];
  altura?: number;
  horizontal?: boolean;
}



export interface Proceso {
  id: number;
  codigo: string;
  descripcion: string;
  fecha_publicacion_date: string;
  fecha_limite_date: string;
  entidad_contratante: string;
  entidad_link: string;
  P2_terminos?: string;
  P1:number
  P2:number;
  canton: string;
  provincia: string;
  P3?: number;
  P3_terminos?: string;
}

export interface ProcesoTableProps {
  title: string;
  type: 'cpc' | 'terminos' | 'seguimiento';
  lineas?: number;
   data: Proceso[]; 
   exportar?:boolean
}


export interface TerminoChipProps {
  termino: string;
}


export interface LayoutContextProps {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
}


export type Indicadores = {
  procesos_vigentes: number;
  procesos_vencen_24h: number;
  procesos_publicados_24H: number;
  procesos_ciudad_24h: number;
  provincia: string;
  ciudad: string;
  provincia_ciudad: string;
  ruc: string;
  nombre: string;
  VENTANA_DIAS_PRESENTACION_ALERTAS: number;
  VENTANA_DIAS_PRESENTACION_INDICADORES: number;
  VENTANA_DIAS_PRESENTACION_GRAFICOS: number;
  VENTANA_DIAS_PRESENTACION: number;
  VENTANA_DIAS_PRESENTACION_TODOS:number;


};


export interface DataItem {
  label: string;
  value: number;
}