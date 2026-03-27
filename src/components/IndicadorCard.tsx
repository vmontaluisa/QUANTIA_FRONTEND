import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';

import { IndicadorCardProps } from '../types'; // o ajusta la ruta si lo defines inline


const IndicadorCard: React.FC<IndicadorCardProps> = ({ icon, label, value }) => {
  return (
    <Card elevation={1} sx={{ p: 2, alignItems: 'center', height: 140, display: 'flex' }} >
      <CardContent>
        
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography  >{icon}</Typography>
          <Typography variant="h3" sx={{ fontSize: 50, color: '#1e88e5', fontWeight: 800 }}  >{value}</Typography>
        </Box>
        <Typography color="textSecondary" variant="body2">
          {label}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default IndicadorCard;