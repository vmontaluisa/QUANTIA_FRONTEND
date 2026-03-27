import React from 'react';
import { Paper, Typography, Box } from '@mui/material';

import {
  VictoryChart,
  VictoryBar,
  VictoryAxis,
  VictoryTooltip,
  VictoryVoronoiContainer,
  VictoryTheme,
  VictoryLabel
} from 'victory';

const GraficoSerieTiempo = ({ data, title,altura }: { data: { x: Date, y: number }[], title: string,altura:number }) => {
    const coloresAlternos = ['#3b82f6', '#93c5fd'];

  return (


    <Paper elevation={2} sx={{ p: 2, height: '100%' }}>
      <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 2 }}>
        {title}
      </Typography>
      <Box sx={{ height: altura }}>
      <VictoryChart
        theme={VictoryTheme.material}
        scale={{ x: "time" }}
        containerComponent={<VictoryVoronoiContainer />}
        padding={{ top: 20, bottom: 10, left: 45, right: 60 }}
        horizontal
        domainPadding={{ x: 5 }}  
          domain={{ 
            y: [0, Math.max(...data.map(d => d.y)) + 40],
           }}


        height={altura}              
      >
        <VictoryAxis 
          tickFormat={(t) => {
            const date = new Date(t);
            return `${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
          }}
          tickValues={data.filter((_, i) => i % 1 === 0).map(d => d.x)}
        />
        <VictoryAxis dependentAxis />
        <VictoryBar
          horizontal
          data={data}
          labels={({ datum }) => {
            const date = new Date(datum.x);
            const diasSemana = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
            const dia = diasSemana[date.getDay()];
            return `${datum.y} procesos\n${dia}, ${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
          }}
          labelComponent={
            <VictoryTooltip 
              dy={0} 
              dx={10} 
              style={{ fontSize: 13 , color:"blue" }} 
              flyoutStyle={{ stroke: "none", fill: "yellow" }}
              pointerLength={0}
              renderInPortal={false}
            />
          }

          style={{
            data: {
              fill: ({ index }) => coloresAlternos[index % coloresAlternos.length],
              width: 15
              },
            labels: {
              fontSize: 10,
              fill: "#000",
              padding: 4,
            }
          }}
          barRatio={0.8}
          barWidth={12}
          cornerRadius={2}
        />
      </VictoryChart>
    </Box>
    </Paper>
  );
};


export default GraficoSerieTiempo;