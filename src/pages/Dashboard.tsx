import React ,  { useEffect, useState } from 'react';
import { Grid, Box, Typography } from '@mui/material';
import ProcesoTableGeneral from '../components/ProcesoTableGeneral';
import ProcesoTableGeneralRecomendaciones from '../components/ProcesoTableGeneralRecomendaciones';





import IndicadorCard from '../components/IndicadorCard';
import GraficoBarra from '../components/GraficoBarra';
import NubeTerminos from '../components/NubeTerminos';
import GraficoHistograma from '../components/GraficoHistograma'; 
import GraficoSerieTiempo from '../components/GraficoSerieTiempo';

import NotificationsIcon from '@mui/icons-material/Notifications';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';


import { fetchProcesosCPC } from '../services/portalService';
import { fetchProcesosRecomendados } from '../services/portalService';

import { fetchProcesosTermino } from '../services/portalService';
import { fetchProcesosPorVencer } from '../services/portalService';
import { fetchProcesosVigentesUbicacion } from '../services/portalService';
import { fetchIndicadoresInicio } from '../services/portalService';


import { fetchGraficosNube } from '../services/portalService';
import { fetchGraficosProvincias } from '../services/portalService';
import { fetchGraficosEntidades } from '../services/portalService';
import { fetchPublicacionesPorDia } from '../services/portalService';
import { fetchPublicacionesPorHora } from '../services/portalService';



import { Indicadores ,DataItem} from '../types'; // o ajusta la ruta si lo defines inline
import { API_URL_WS } from '../config/config'; // ajusta la ruta según corresponda


const Dashboard = () => {

  const EMPRESA_ID = 0; // Cambia esto al ID de la empresa que necesites

  const [procesosCPC, setProcesosCPC] = useState([]);
  const [procesosRecomendados, setProcesosRecomendados] = useState([]);
  const [procesosTermino, setProcesosTermino] = useState([]);

  const [procesosVencer, setProcesosVencer] = useState([]);
  const [procesosVencerUbicacion, setProcesosVencerUbicacion] = useState([]);

  const [graficosNube, setGraficosNube] = useState([]);
  const [graficosProvincias, setGraficosProvincias] = useState([]);
  const [graficosEntidades, setGraficosEntidades] = useState([]);

  const [graficosPublicacion, setGraficosPublicacion] = useState([]);
  const [graficosPublicacionHora, setGraficosPublicacionHora] = useState([]);
 // const [graficosPublicacionHora, setGraficosPublicacionHora] = useState<DataItem[]>([]);



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



        useEffect(() => {
          let ignore = false;

          const cargarDatos = async () => {
            if (ignore) return;
            try {
              const [dataCPC, dataTermino, dataVencer, dataVencerUbicacion, dataIndicadores, dataGraficoNube, dataGraficoProvincias, dataGraficoEntidades, dataGraficoPublicacion, dataGraficoPublicacionHora,dataProcesosRecomendados] = await Promise.all([
                fetchProcesosCPC(EMPRESA_ID),
                fetchProcesosTermino(EMPRESA_ID),
                fetchProcesosPorVencer(EMPRESA_ID),
                fetchProcesosVigentesUbicacion(EMPRESA_ID),
                fetchIndicadoresInicio(EMPRESA_ID),
                fetchGraficosNube(EMPRESA_ID),
                fetchGraficosProvincias(EMPRESA_ID),
                fetchGraficosEntidades(EMPRESA_ID),
                fetchPublicacionesPorDia(EMPRESA_ID),
                fetchPublicacionesPorHora(EMPRESA_ID),
                fetchProcesosRecomendados(EMPRESA_ID)
              ]);
              setProcesosCPC(dataCPC);
              setProcesosTermino(dataTermino);
              setProcesosVencer(dataVencer);
              setIndicadores(dataIndicadores);
              setProcesosVencerUbicacion(dataVencerUbicacion);
              setGraficosNube(dataGraficoNube);
              setGraficosProvincias(dataGraficoProvincias);
              setGraficosEntidades(dataGraficoEntidades);
              setGraficosPublicacion(dataGraficoPublicacion);
              setGraficosPublicacionHora(dataGraficoPublicacionHora);
              setProcesosRecomendados(dataProcesosRecomendados);
            } catch (error) {
              console.error("Error cargando procesos:", error);
            }
          };

          cargarDatos();

          // WebSocket connection for updates
          const socket = new WebSocket(API_URL_WS);
 
          socket.onopen = () => {
         //   console.log("✅ WebSocket conectado correctamente");
          };

          socket.onmessage = (event) => {
           // console.log("📨 Mensaje recibido del WebSocket:", event.data);

            if (event.data === "update_available") {
           //   console.log("🟢 Nueva información disponible. Actualizando...");
              cargarDatos();
            }
          };

          socket.onerror = (error) => {
         //   console.error("❌ WebSocket error:", error);
          };

          socket.onclose = () => {
         //   console.warn("⚠️ WebSocket cerrado");
          };

          return () => {
            ignore = true;
            socket.close();
          };
        }, []);





  return (
    <Box 
            sx={{ p: 3, flexGrow: 1, width: '100%' ,}}
    
    >
      <Typography variant="h4" gutterBottom>
        Procesos para la Empresa
       
      </Typography>

      {/* Indicadores superiores */}
      <Grid container spacing={2}   >

        <Grid size={{ xs: 12, md: 2 }} >
           <IndicadorCard icon={<NotificationsIcon fontSize='large' />}  label="Procesos vigentes" value={indicadores.procesos_vigentes} />
        </Grid>
        <Grid size={{ xs: 12, md: 2 }} >
                      <IndicadorCard icon={<CalendarMonthIcon  fontSize='large'  />} label={`Procesos vencen en  ${indicadores.VENTANA_DIAS_PRESENTACION_INDICADORES}D`}  value={indicadores.procesos_vencen_24h}/>
        </Grid>
        <Grid size={{ xs: 12, md: 1 }} > </Grid>

        <Grid size={{ xs: 12, md: 2 }} >
                      <IndicadorCard icon={<CalendarMonthIcon  fontSize='large'  />} label={`Publicados en  ${indicadores.VENTANA_DIAS_PRESENTACION_INDICADORES}D`}   value={indicadores.procesos_publicados_24H} />
        </Grid>

        <Grid size={{ xs: 12, md: 2 }} >
                      <IndicadorCard icon={<CalendarMonthIcon  fontSize='large'  />} label={`Publicados ciudad ${indicadores.VENTANA_DIAS_PRESENTACION_INDICADORES}D`}   value={indicadores.procesos_ciudad_24h}  />
        </Grid>


        <Grid size={{ xs: 12, md: 3 }} display="flex" flexDirection="column" justifyContent="center" alignItems="flex-end" sx={{ pl: 2, textAlign: 'right' }}>
          <Typography variant="body1" fontWeight="bold" color="background">{indicadores.ruc}</Typography>
          <Typography variant="body1" sx={{ whiteSpace: 'pre-line', color: '#1E293B' }} fontWeight="bold">{indicadores.nombre}</Typography>
          <Typography variant="body2" sx={{ whiteSpace: 'pre-line' }}>{indicadores.provincia_ciudad}</Typography>
        </Grid>

        <Grid size={{ xs: 12, md: 9 }} >


          <Box mb={4}>
            <ProcesoTableGeneralRecomendaciones
              title={`1.- Procesos Recomendados AI que cumplen al menos un CPC en su ubicación de interés `}
              subtitle="Procesos relevantes, ya que cumplen con criterios de negocio y ubicación"
              type="cpc"
              lineas={100}
              data={procesosRecomendados}
              exportar={true}
            />
          </Box>


          <Box mb={4}>
            <ProcesoTableGeneral
              title={`2.- Procesos por vencer en los próximos ${indicadores.VENTANA_DIAS_PRESENTACION_ALERTAS} días`}
              subtitle="Procesos que requieren acción inmediata ya que están por vencer (tomar en cuenta ubicación)"
              type="cpc"
              lineas={100}
              data={procesosVencer}
              exportar={true}
            />
          </Box>

          <Box mb={4}>
            <ProcesoTableGeneral
              title={`3.- Procesos por vencer en los próximos ${indicadores.VENTANA_DIAS_PRESENTACION_ALERTAS} días en su ubicación de interés`}
              subtitle="Procesos urgentes que vencen en los próximos 7 días y están dentro de tu zona geográfica de interés"
              type="cpc"
              lineas={100}
              data={procesosVencerUbicacion}
              exportar={true}
            />
          </Box>

          <Box mb={4}>
            <ProcesoTableGeneral
              title="4.- Procesos que cumplen al menos un CPC"
              subtitle="Procesos que coinciden con alguno de los códigos CPC marcados como relevantes para tu negocio"
              type="cpc"
              lineas={100}
              data={procesosCPC}
              exportar={true}
            />
          </Box>
          <Box mb={4}>
            <ProcesoTableGeneral
              title="5.- Procesos que no cumplen CPC pero sí términos"
              subtitle="Procesos que no tienen un CPC de tu interés, pero incluyen palabras clave relevantes que pueden convertirse en una oportunidad"
              type="terminos"
              lineas={100}
              data={procesosTermino}
              exportar={true}
            />
          </Box>


        </Grid>

 


        {/* Sección de gráficos */}
        <Grid size={{ xs: 12, md: 3 }}>

          <Box mb={1}>
          </Box>
          <Box mb={2}>
            <NubeTerminos title={`Terminos en los últimos ${indicadores.VENTANA_DIAS_PRESENTACION_GRAFICOS} días`} datos={graficosNube} />
          </Box>
          <Box mb={2}>
            <GraficoBarra
              title={`Publicados en los últimos ${indicadores.VENTANA_DIAS_PRESENTACION_GRAFICOS} días por provincia`}
              data={graficosProvincias}
              altura={400}
              horizontal={true}
              
            />
          </Box>
          <Box mb={2}>
            <GraficoSerieTiempo title={`Publicados en los últimos ${indicadores.VENTANA_DIAS_PRESENTACION_GRAFICOS} días`} data={graficosPublicacion}  altura={400} />

          </Box>
          <Box>
            <GraficoHistograma  title={`Horas de publicaciones durante ${indicadores.VENTANA_DIAS_PRESENTACION_GRAFICOS} días`} data={graficosPublicacionHora} altura={600} />
            
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
