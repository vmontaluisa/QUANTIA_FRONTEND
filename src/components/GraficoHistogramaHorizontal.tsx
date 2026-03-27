import React from 'react';
import { Paper, Typography } from '@mui/material';
import { VictoryChart, VictoryBar, VictoryAxis, VictoryTooltip,VictoryLabel,VictoryPortal } from 'victory';
import { GraficoBarraProps } from '../types';

const GraficoHistogramaHorizontal: React.FC<GraficoBarraProps> = ({ title, data, altura = 300 }) => {
  const coloresAlternos = ['#3b82f6', '#93c5fd'];
  return (
    <Paper elevation={3} style={{ padding: 10 }}>
      <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 2 }}>
        {title}
      </Typography>
      <VictoryChart
        height={altura}
        width={400}
        domainPadding={30}
        padding={{ top: 20, bottom: 50, left: 30, right: 15 }}

        domain={{ 
            y: [0, Math.max(...data.map(d => d.value)) + 5],
           }}
      >
        <VictoryAxis
          dependentAxis
          style={{
            tickLabels: { fontSize: 12 },
            grid: { stroke: '#ccc', strokeDasharray: '4,4' }
          }}
        />
        <VictoryAxis
          style={{
            tickLabels: {
              fontSize: 12,
              padding: 35,
              textAnchor: 'left',  // centra las etiquetas horizontalmente
              angle: -90
            }
          }}
        />
        <VictoryBar
          
          data={data}
          x="label"
          y="value"
          labelComponent={
                  
                      <VictoryLabel 
                        text={({ datum }) => datum.value > 0 ? `${datum.label} (${datum.value})` : ''}
                        dy={5}
                        dx={30}
                        angle={-90}
                        style={{ fontSize: 12, fill: '#1e293b' }}
                      />
                  
          }

          style={{
            data: {
              fill: ({ index }) => coloresAlternos[index % coloresAlternos.length],
              width: 15
            },
            labels: {
              fill: '#000',
              fontSize: 10
            }
          }}

          barRatio={0.8}
          barWidth={12}
          cornerRadius={2}


        />
      </VictoryChart>
    </Paper>
  );
};

export default GraficoHistogramaHorizontal;