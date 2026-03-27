import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Box
} from '@mui/material';
import {
  Home as HomeIcon,
  Notifications as NotificationsIcon,
  ListAlt as ListAltIcon,
  Inventory as InventoryIcon,
  Gavel as GavelIcon,
  Business as BusinessIcon,
  Settings as SettingsIcon,
  Pin as LocationOn
} from '@mui/icons-material';
import MapIcon from '@mui/icons-material/Map';
import { Link, useLocation } from 'react-router-dom';

import logo from '../assets/logo2024.png';

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { label: 'Inicio', path: '/', icon: <HomeIcon /> },
    { label: 'Vigentes', path: '/alertas', icon: <NotificationsIcon /> },
    { label: 'Procesos', path: '/procesos', icon: <ListAltIcon /> },
    { label: 'CPC de Interés', path: '/cpc-interes', icon: <InventoryIcon /> },
    { label: 'Términos de Interés', path: '/terminos-interes', icon: <GavelIcon /> },
    { label: 'Ubicaciones de Interés', path: '/ubicaciones-interes', icon: <MapIcon /> },
    { label: 'Empresa', path: '/empresa', icon: <BusinessIcon /> },
    //{ label: 'Configuraciones', path: '/configuraciones', icon: <SettingsIcon /> },
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 100,
        [`& .MuiDrawer-paper`]: {
          width: 200,
          boxSizing: 'border-box',
          borderRadius: 0,
          backgroundColor: '#1e293b',
          color: '#ffffff',
        },
      }}
    >
      <List>
        {menuItems.map((item, index) => {
          const isActive = location.pathname === item.path;

          return (
            <ListItem
              key={index}
              disablePadding
              sx={{
                backgroundColor: isActive ? '#334155' : 'transparent',
                '&:hover': {
                  backgroundColor: '#475569',
                },
              }}
            >
              <ListItemButton
                component={Link}
                to={item.path}
                sx={{
                  color: isActive ? '#ffffff' : '#CBD5E1',
                }}
              >
                <ListItemIcon sx={{ color: isActive ? '#ffffff' : '#CBD5E1' }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>

      <Box
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          p: 2,
          textAlign: 'center',
          boxShadow: '0px 0px 6px rgba(255,255,255,0.3)' 
        }}
      >
  <Box
    sx={{
      display: 'inline-block',
      borderRadius: '0px',
      p: 1,
    }}
  >

        <img src={logo} alt="Estrategos" style={{ width: 130 }} />
      </Box>

      </Box>
    </Drawer>
  );
};

export default Sidebar;
