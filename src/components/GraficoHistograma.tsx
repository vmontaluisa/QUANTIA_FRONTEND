import React from 'react';
import { Paper, Typography } from '@mui/material';
import { VictoryChart, VictoryBar, VictoryAxis, VictoryTooltip ,VictoryLabel} from 'victory';
import { GraficoBarraProps } from '../types';

const GraficoHistograma: React.FC<GraficoBarraProps> = ({ title, data, altura = 300 }) => {
  const coloresAlternos = ['#3b82f6', '#93c5fd'];
  return (
    <Paper elevation={3} style={{ padding: 16 }}>
      <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 2 }}>
        {title}
      </Typography>
      <VictoryChart
        height={altura}
        domainPadding={30}
        padding={{ top: 20, bottom: 50, left: 80, right: 15 }}
        domain={{ 
            y: [0, Math.max(...data.map(d => d.value)) + 40],
           }}
      >
        <VictoryAxis
          dependentAxis
          style={{
            tickLabels: { fontSize: 10, fontWeight: 'bold' },
            grid: { stroke: '#ccc', strokeDasharray: '4,4' }
          }}
        />
        <VictoryAxis
          style={{
            tickLabels: { angle: 0, textAnchor: 'end', fontSize: 14 }
          }}
        />
        <VictoryBar
          horizontal
          data={data}
          x="label"
          y="value"
          labels={({ datum }) => `${datum.label}: ${datum.value}`}
          labelComponent={
                      <VictoryLabel 
                        text={({ datum }) => datum.value > 0 ? `${datum.label} (${datum.value})` : ''}
                        dy={0}
                        dx={5}
                        angle={0}
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
              fontSize: 12
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

export default GraficoHistograma;