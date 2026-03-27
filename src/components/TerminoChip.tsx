import React from 'react';
import { Card, CardContent, Typography, Chip, Box } from '@mui/material';
import { TerminoChipProps } from '../types'; // o ajusta la ruta si lo defines inline


const TerminoChip: React.FC<TerminoChipProps> = ({ termino }) => {
  return <Chip label={termino} variant="outlined" size="small" color="secondary" />;
};

export default TerminoChip;