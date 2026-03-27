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

const GraficoBarraProvinciaTodos = ({ data, title,altura }: { data: { x: Date, y: number }[], title: string,altura:number }) => {
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
        containerComponent={
        <VictoryVoronoiContainer 
           
           />}
        padding={{ top: 35, bottom: 130, left: 15, right: 0 }}
        
        domainPadding={{ x:  0, y: 0 }}  
          domain={{ 
            y: [0, Math.max(...data.map(d => d.y)) + 10],
           }}


        height={altura}     
        width={400}
        
      >
        <VictoryAxis 
          tickFormat={(t) => {
              return t;
          }}
          tickValues={data.filter((_, i) => i % 1 === 0).map(d => d.x)}
          style={{
            tickLabels: { fontSize: 13, padding: 3, angle: -90, textAnchor: "end" }
          }}
        />
        <VictoryAxis dependentAxis />
        <VictoryBar
          
          data={data}
          labels={({ datum }) => {
            return `${datum.y} procesos\n${datum.x}`;
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


export default GraficoBarraProvinciaTodos;