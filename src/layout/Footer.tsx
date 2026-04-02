import React from 'react';
import { Box, Typography } from '@mui/material';
import { APP_VERSION } from '../utils/constantes';

const Footer = () => {
  return (
    <Box component="footer" py={2} textAlign="center">
      <Typography variant="body2" color="textSecondary">
        &copy; {new Date().getFullYear()} Estrategos & Software  V:{APP_VERSION}
      </Typography>
    </Box>
  );
};

export default Footer;
