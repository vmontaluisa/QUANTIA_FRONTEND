import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Typography,
  Button,
  Paper,
  Grid,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from '@mui/material';
import { Autocomplete } from '@mui/material';

import AddIcon from '@mui/icons-material/Add';

import { fetchEditarEmpresa } from '../services/empresaService';
import { fetchListarUnaEmpresa } from '../services/empresaService';
import { fetchListadoUbicaiones } from '../services/portalService';


const EMPRESA_ID = 0;



const Empresa = () => {
  const [formData, setFormData] = useState({
    ruc: '',
    nombre: '',
    direccion: '',
    correo: '',
    responsable: '',
    cargo: '',
    cedula_responsable: '',
    campo_adicional_1: '',
    campo_adicional_2: '',
    activo: true,
    ciudad: '',
    notificacion_correo: '',
    notificacion_numero: '',
    pagina_web:'',
    resumen_empresa: '',
    openai_clave:'',
    openai_modelo:'',


  });

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [ubicacionesDisponibles, setUbicacionesDisponibles] = useState<string[]>([]);
  const [mensajeGrabado, setMensajeGrabado] = useState('');
  

 useEffect(() => {
  const cargarDatosEmpresa = async () => {
    const data = await fetchListarUnaEmpresa(1); // ID fijo o dinámico
    setFormData(data); // Asegúrate de que `setFormData` reciba el objeto `data`
    const cargarUbicaciones = async () => {
      const data = await fetchListadoUbicaiones();
      setUbicacionesDisponibles(data.map((item: any) => item.provincia_canton));
    };
    cargarUbicaciones();
  };

  cargarDatosEmpresa();
}, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {

      var mensaje='';
      var validacion=true
      if (!formData.correo.includes('@')) {
        mensaje=mensaje+'El campo "Correo" debe contener un "@"';
        validacion=false;
      }
      if (!formData.notificacion_correo.includes('@')) {
        mensaje=mensaje+', El campo "Correo de Notificación" debe contener un "@"';
        validacion=false;
      }
      if( !validacion) {
            setMensajeGrabado('NO SE ACTUALIZO: '+mensaje);
      }else{
            const response = await fetchEditarEmpresa(EMPRESA_ID, formData);
            setMensajeGrabado('Información actualizada correctamente');
      }
 
      setConfirmOpen(true);
    } catch (error) {
      console.error('Error al actualizar la empresa:', error);
      alert('Hubo un error al actualizar la información.');
    }
  };

  // Confirmación de guardado exitoso
  return (
    <>
      <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
        <DialogTitle>Actualización Información</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {mensajeGrabado}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmOpen(false)}>OK</Button>
        </DialogActions>
      </Dialog>

      <Grid container spacing={2}   >
          <Grid size={{ xs: 12, md: 12 }} > <br/> </Grid>
          <Grid size={{ xs: 12, md: 9 }} >
            <Paper elevation={3} sx={{ p: 2, width: '100%' }}>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>                              
                  Información de la Empresa

                </Typography>
                
              <Grid container spacing={2}>
                <Grid size={3} >
                  <TextField
                    label="RUC"
                    name="ruc"
                    value={formData.ruc}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, ''); // elimina todo lo que no sea número
                      if (value.length <= 13) {
                        setFormData((prev) => ({ ...prev, ruc: value }));
                      }
                    }}
                    fullWidth
                    variant="outlined"
                  />
                </Grid>
                <Grid size={9}>
                  <TextField
                    label="Nombre"
                    name="nombre"
                    value={formData.nombre}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value.length <= 200) {
                        handleChange(e);
                      }
                    }}
                    fullWidth
                    variant="outlined"
                  />
                </Grid>
                <Grid size={6}>
                  <TextField
                    label="Dirección"
                    name="direccion"
                    value={formData.direccion}
                    onChange={handleChange}
                    fullWidth
                    variant="outlined"
                  />
                </Grid>

                <Grid size={6}>
                  <Autocomplete
                    freeSolo
                    options={ubicacionesDisponibles}
                    value={formData.ciudad}
                    onInputChange={(event, newInputValue) => {
                      setFormData((prev) => ({ ...prev, ciudad: newInputValue }));
                    }}
                    renderInput={(params) => (
                      <TextField {...params} label="Ciudad" variant="outlined" fullWidth />
                    )}
                  />
                </Grid>

                <Grid size={12}>
                  <TextField
                    label="Correo"
                    name="correo"
                    value={formData.correo}
                       onChange={(e) => {
                      const value = e.target.value;
                      if (value.length <= 100) {
                        handleChange(e);
                      }
                    }}
                    fullWidth
                    variant="outlined"
                  />
                </Grid>
                 <Grid size={2}>
                  <TextField
                    label="Cédula Responsable"
                    name="cedula_responsable"
                    value={formData.cedula_responsable}
                      onChange={(e) => {
                      const value = e.target.value;
                      if (value.length <= 20) {
                        handleChange(e);
                      }
                    }}
                    fullWidth
                    variant="outlined"
                  />
                </Grid>

                <Grid size={4}>
                  <TextField
                    label="Responsable"
                    name="responsable"
                    value={formData.responsable}
                       onChange={(e) => {
                      const value = e.target.value;
                      if (value.length <= 200) {
                        handleChange(e);
                      }
                    }}
                    fullWidth
                    variant="outlined"
                  />
                </Grid>
                <Grid size={6}>
                  <TextField
                    label="Cargo"
                    name="cargo"
                    value={formData.cargo}
                       onChange={(e) => {
                      const value = e.target.value;
                      if (value.length <= 200) {
                        handleChange(e);
                      }
                    }}
                    fullWidth
                    variant="outlined"
                  />
                </Grid>
       <Grid size={12}>                 
  <Divider sx={{ my: 2 }} />
</Grid>

                <Grid size={12}>
                  <TextField
                    label="Página Web de la empresa"
                    name="pagina_web"
                    value={formData.pagina_web}
                      onChange={(e) => {
                      const value = e.target.value;
                      if (value.length <= 200) {
                        handleChange(e);
                      }
                    }}
                    fullWidth
                    variant="outlined"
                  />
                </Grid>
                <Grid size={12}>
                  <TextField
                    label="Resumen de la Empresa"
                    name="resumen_empresa"
                    value={formData.resumen_empresa}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value.length <= 2000) {
                        handleChange(e);
                      }
                    }}
                    fullWidth
                    variant="outlined"
                    multiline
                    minRows={4}
                  />
                </Grid>

       <Grid size={12}>                 
  <Divider sx={{ my: 2 }} />
</Grid>
                <Grid size={12}>
                  <TextField
                    label="Correo de Notificación"
                    name="notificacion_correo"
                    value={formData.notificacion_correo}
                      onChange={(e) => {
                      const value = e.target.value;
                      if (value.length <= 100) {
                        handleChange(e);
                      }
                    }}
                    fullWidth
                    variant="outlined"
                  />
                </Grid>
                <Grid size={12}>
                  <TextField
                    label="Número de Notificación"
                    name="notificacion_numero"
                    value={formData.notificacion_numero}
                     onChange={handleChange}
                    fullWidth
                    variant="outlined"
                  />
                </Grid>

            <Grid size={12}>
                  
  <Divider sx={{ my: 2 }} />
</Grid>

                   <Grid size={12}>
                  <TextField
                    label="Clave API OpenAI "
                    name="openai_clave"
                    value={formData.openai_clave}
                    onChange={handleChange}
                    fullWidth
                    variant="outlined"
                  />
                </Grid>


                                   <Grid size={12}>
                  <TextField
                    label="Open AI modelo"
                    name="openai_modelo"
                    value={formData.openai_modelo}
                    onChange={handleChange}
                    fullWidth
                    variant="outlined"
                  />
                </Grid>



                <Grid size={12}>
                  
  <Divider sx={{ my: 2 }} />
</Grid>

                   <Grid size={12}>
                  <TextField
                    label="Adicional 1"
                    name="campo_adicional_1"
                    value={formData.campo_adicional_1}
                    onChange={handleChange}
                    fullWidth
                    variant="outlined"
                  />
                </Grid>
                <Grid size={12}>
                  <TextField
                    label="Adicional 2"
                    name="campo_adicional_2"
                    value={formData.campo_adicional_2}
                    onChange={handleChange}
                    fullWidth
                    variant="outlined"
                  />
                </Grid>
                
              </Grid>
            </Paper>

          </Grid>



             <Grid size={{ xs: 12, md: 3 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Button 
                  variant="contained" 
                  color="primary" 
                   size="large"
                      sx={{ minWidth: '100%', py: 2 }}
                      startIcon={<AddIcon />}                      
                      onClick={handleSubmit}>
                    Actualizar Información
                  </Button>
                  </Box>
             </Grid>          
        </Grid>

    </>
  );
};

export default Empresa;