import React from 'react';
import { Card, CardContent, Typography, Chip, Box } from '@mui/material';
import { AlertCardProps } from '../types'; // o ajusta la ruta si lo defines inline




const AlertCard: React.FC<AlertCardProps> = ({ titulo, descripcion, fecha, tags = [] }) => {
  return (
    <Card variant="outlined" sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>{titulo}</Typography>
        <Typography variant="body2" color="text.secondary" paragraph>{descripcion}</Typography>
        <Typography variant="caption" color="text.secondary">Fecha: {fecha}</Typography>
        <Box mt={1} display="flex" gap={1} flexWrap="wrap">
          {tags.map((tag, index) => (
            <Chip key={index} label={tag} size="small" />
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

export default AlertCard;
