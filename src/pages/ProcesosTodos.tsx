import React, { useState, useEffect } from 'react';
import { Grid, Box, Typography } from '@mui/material';
import ProcesoTableGeneral from '../components/ProcesoTableGeneral';
import NubeTerminos from '../components/NubeTerminos';
import { fetchProcesosTodos } from '../services/portalService';
import { fetchIndicadoresInicio } from '../services/portalService';
import { fetchPublicacionesPorDiaTodos } from '../services/portalService';
import { fetchVencerPorDiaTodos } from '../services/portalService';
import { fetchGraficosProvinciasTodos } from '../services/portalService';
import { fetchPublicacionesHoyPorHora } from '../services/portalService';


import GraficoBarraTodos from '../components/GraficoBarraTodos';
import GraficoBarraProvinciaTodos from '../components/GraficoBarraProvinciaTodos';
import GraficoHistogramaHorizontal from '../components/GraficoHistogramaHorizontal'; 


import { Indicadores ,DataItem} from '../types'; // o ajusta la ruta si lo defines inline

import { API_URL_WS } from '../config/config'; // ajusta la ruta según corresponda



const Procesos = () => {

   const EMPRESA_ID = 0; // Cambia esto al ID de la empresa que necesites

  const [procesosTodos, setProcesosTodos] = useState([]);
  const [graficoTodosDia, setGraficoTodosDia] = useState([]);
  const [graficoVencerPublicados, setGraficoVencerPublicados] = useState([]);
  const [graficoTodosProvincia, setGraficoTodosProvincia] = useState([]);
  const [graficoTodosHoy, setGraficoTodosHoy] = useState([]);

  const [indicadores, setIndicadores] = useState<Indicadores>({
    procesos_vigentes: 0,
    procesos_vencen_24h: 0,
    procesos_publicados_24H: 0,
    procesos_ciudad_24h: 0,
    provincia: '',
    ciudad: '',
    provincia_ciudad: '',
    ruc: '',
    nombre: '',
    VENTANA_DIAS_PRESENTACION_INDICADORES:0,
    VENTANA_DIAS_PRESENTACION_ALERTAS:0,
    VENTANA_DIAS_PRESENTACION_GRAFICOS:0,
    VENTANA_DIAS_PRESENTACION:0,
    VENTANA_DIAS_PRESENTACION_TODOS:0,
  });



  // Definir cargarDatos fuera del useEffect para reutilizarlo con el WebSocket
  const cargarDatos = async () => {
    try {
      const data = await fetchProcesosTodos();
      const indicadores = await fetchIndicadoresInicio(EMPRESA_ID);
      const graficoTodosDia= await fetchPublicacionesPorDiaTodos();
      const graficoVencerPublicados= await fetchVencerPorDiaTodos();
      const graficoTodosProvincia= await fetchGraficosProvinciasTodos();
      const graficoTodosHoy= await fetchPublicacionesHoyPorHora(EMPRESA_ID);

      setProcesosTodos(data);
      setIndicadores(indicadores);
      setGraficoTodosDia(graficoTodosDia);
      setGraficoVencerPublicados(graficoVencerPublicados)
      setGraficoTodosProvincia(graficoTodosProvincia)
      setGraficoTodosHoy(graficoTodosHoy);
    } catch (error) {
      console.error('Error al cargar procesos:', error);
    }
  };

  useEffect(() => {
    cargarDatos();
    // WebSocket para recibir actualizaciones y recargar datos si hay cambios
    const socket = new WebSocket(API_URL_WS);

          socket.onopen = () => {
          //  console.log("✅ WebSocket conectado correctamente");
          };

          socket.onmessage = (event) => {
          //  console.log("📨 Mensaje recibido del WebSocket:", event.data);

            if (event.data === "update_available") {
          //    console.log("🟢 Nueva información disponible. Actualizando...");
              cargarDatos();
            }
          };

          socket.onerror = (error) => {
       //     console.error("❌ WebSocket error:", error);
          };

          socket.onclose = () => {
       //     console.warn("⚠️ WebSocket cerrado");
          };

    return () => socket.close();
  }, []);

  return (
    <Box 
            sx={{ p: 2, flexGrow: 1, width: '100%' ,}}
    
    >


      {/* Indicadores superiores */}
      <Grid container spacing={2}   >
   
        <Grid size={{ xs: 12, md:3 }} >  
          <GraficoBarraTodos title={`Publicados en los últimos ${indicadores.VENTANA_DIAS_PRESENTACION_GRAFICOS} días`} data={graficoTodosDia}  altura={250} />
        </Grid>
        <Grid size={{ xs: 12, md:3 }} >  
          <GraficoBarraTodos title={`Publicaciones por vencer en los próximos ${indicadores.VENTANA_DIAS_PRESENTACION_GRAFICOS} días`} data={graficoVencerPublicados}  altura={250} />
        </Grid>
        <Grid size={{ xs: 12, md:3 }} >  
          <GraficoBarraProvinciaTodos title={`Publicados por provincia  en los últimos ${indicadores.VENTANA_DIAS_PRESENTACION_GRAFICOS} días`} data={graficoTodosProvincia}  altura={250} />
        </Grid>


        <Grid size={{ xs: 12, md:3 }} >  
            <GraficoHistogramaHorizontal  title={`Publicaciones del día de hoy`} data={graficoTodosHoy} altura={250} />
      </Grid>

        <Grid size={{ xs: 12, md: 12 }} >
          <Box mb={1}>
            <ProcesoTableGeneral title={`Todos los Procesos (los publicados en los últimos  ${indicadores.VENTANA_DIAS_PRESENTACION_TODOS} días)`}    type="cpc" lineas={100} data={procesosTodos}   exportar={false}  />
          </Box>
       </Grid>

 

      </Grid>
    </Box>
  );
};

export default Procesos;