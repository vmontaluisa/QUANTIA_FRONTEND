// GraficoBarra.tsx
import React from 'react';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme, VictoryLabel, VictoryTooltip } from 'victory';
import { Paper, Typography, Box } from '@mui/material';
import { DataItem, GraficoBarraProps} from '../types'; // o ajusta la ruta si lo defines inline




const GraficoBarra: React.FC<GraficoBarraProps> = ({ title, data,altura ,horizontal=true}) => {
    const coloresAlternos = ['#3b82f6', '#93c5fd'];

  return (
    <Paper elevation={2} sx={{ p: 2, height: '100%' }}>
      <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 2 }}>
        {title}
      </Typography>
      <Box sx={{ height: altura }}>
        <VictoryChart
          theme={VictoryTheme.material}
          domainPadding={5}
          height={altura}
          horizontal={horizontal}
          padding={{ left: 10, right: 20, top: 20, bottom: 20 }}
          domain={{ 
            y: [0, Math.max(...data.map(d => d.value)) + 20],
           }}
        >
        <VictoryAxis
            dependentAxis
            style={{
              tickLabels: { fontSize: 10, fill: '#333' }
            }}
          />
          <VictoryAxis
            style={{
              tickLabels: { fontSize: 10, fill: '#333' }
            }}
          />
          <VictoryBar
            data={data}
            x="label"
            y="value"
            labels={({ datum }) => `${datum.label} (${datum.value})`}
            labelComponent={            
              <VictoryLabel
                text={({ datum }) => `${datum.label} (${datum.value})`}
                dx={5}
                style={{ fontSize: 15, fill: "#000", textAnchor: "start" }}
              />
            }

            
            style={{
              data: {
              fill: ({ index }) => coloresAlternos[index % coloresAlternos.length],
                width: 15
              },
              labels: { fontSize: 15, fill: '#333' }
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

export default GraficoBarra;