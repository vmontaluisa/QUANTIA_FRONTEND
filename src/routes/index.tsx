// src/routes/index.tsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import Alertas from '../pages/procesosVigentes';
import Procesos from '../pages/ProcesosTodos';
import CPCInteres from '../pages/CPCInteres';
import TerminosInteres from '../pages/TerminosInteres';
import UbicacionesInteres from '../pages/UbicacionesInteres';

import Empresa from '../pages/Empresa';
import Configuraciones from '../pages/Configuraciones';
import ProcesoDetalle from '../pages/ProcesoDetalle';


const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/alertas" element={<Alertas />} />
      <Route path="/procesos" element={<Procesos />} />
      <Route path="/cpc-interes" element={<CPCInteres />} />
      <Route path="/terminos-interes" element={<TerminosInteres />} />
      <Route path="/ubicaciones-interes" element={<UbicacionesInteres />} />
      <Route path="/empresa" element={<Empresa />} />
      <Route path="/configuraciones" element={<Configuraciones />} />

      <Route path="/proceso/:id" element={<ProcesoDetalle />} />

    </Routes>
  );
};

export default AppRoutes;