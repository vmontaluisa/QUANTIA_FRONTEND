import React from 'react';
import { Chip } from '@mui/material';
import { CPCChipProps } from '../types'; // o ajusta la ruta si lo defines inline



const CPCChip: React.FC<CPCChipProps> = ({ codigo }) => {
  return <Chip label={`CPC: ${codigo}`} color="primary" size="small" />;
};

export default CPCChip;
