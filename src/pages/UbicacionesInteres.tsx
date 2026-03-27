import {
  Grid, Box, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Checkbox, FormControlLabel, Paper, IconButton, DialogContentText
} from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useState, useEffect } from 'react';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import ToggleOffIcon from '@mui/icons-material/ToggleOff';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

import {
  fetchCrearEmpresaUbicacion,
  fetchEditarEmpresaUbicacion,
  fetchEliminarEmpresaUbicacion,
  fetchListarEmpresaUbicacion
} from '../services/empresa_ubicacionesService';

import { fetchListadoUbicaiones } from '../services/portalService';

const UbicacionesInteres = () => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({ id: 0, ubicacion: '' });
  const [rows, setRows] = useState([  ]);
  const [allRows, setAllRows] = useState([]);
  const [ubicacionesDisponibles, setUbicacionesDisponibles] = useState<string[]>([]);

  const EMPRESA_ID = 0;

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const data = await fetchListarEmpresaUbicacion(EMPRESA_ID);
        setRows(data);
        setAllRows(data);

        const ubicaciones = await fetchListadoUbicaiones();
        setUbicacionesDisponibles(ubicaciones.map((item: any) => item.provincia_canton));
      } catch (error) {
        console.error('Error al cargar los datos:', error);
      }
    };
    cargarDatos();
  }, []);

  const rowsConIndice = rows.map((row, index) => ({ ...row, id_contador: index + 1 }));

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [pendingDeleteId, setPendingDeleteId] = useState<number | null>(null);


  const handleEdit = (row: any) => {
    setFormData({ id: row.id, ubicacion: row.ubicacion });
    setOpen(true);
  };

  const requestDelete = (id: number) => {
    setPendingDeleteId(id);
    setConfirmOpen(true);
  };

  const confirmDelete = async () => {
    if (pendingDeleteId !== null) {
      try {
        await fetchEliminarEmpresaUbicacion(pendingDeleteId);
        setRows((prev) => prev.filter((row) => row.id !== pendingDeleteId));
      } catch (error) {
        console.error('Error al eliminar el término:', error);
      } finally {
        setPendingDeleteId(null);
        setConfirmOpen(false);
      }
    }
  };

  const columns: GridColDef[] = [

        {
      field: 'id_contador',
      headerName: 'ID',
      width: 70,
      sortable: false,
      filterable: false,
    
    },
    { field: 'ubicacion', headerName: 'Ubicación', flex: 1 },
    {
      field: 'acciones',
      headerName: 'Acciones',
      width: 150,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', gap: 1 }}>
          <IconButton onClick={() => handleEdit(params.row)}>
            <EditIcon color="primary" />
          </IconButton>
          <IconButton onClick={() => requestDelete(params.row.id)}>
            <DeleteIcon color="error" />
          </IconButton>
        </Box>
      ),
    },
  ];

  const handleSave = async () => {
    try {
 
    
    
            if (formData.id) {
              // Modo edición
              await fetchEditarEmpresaUbicacion(formData.id, formData.ubicacion);
            } else {
              // Modo creación
              await fetchCrearEmpresaUbicacion(EMPRESA_ID, formData.ubicacion);
            }
            const data = await fetchListarEmpresaUbicacion(EMPRESA_ID);
            setRows(data);
            setOpen(false);
    
    

    
    
    } catch (error) {
      console.error('Error al guardar el término:', error);
    } finally {
      setOpen(false);
    }
  };

  return (
     
      <Grid container spacing={2}   >
      <Grid size={{ xs: 12, md: 9 }} > <br /> </Grid>
          <Grid size={{ xs: 12, md: 9 }} >
                   <Paper elevation={3} sx={{ p: 2, width: '100%' }}>
                          <Box 
                                  sx={{ width: '100%', maxWidth: '100%', 
                                    flex: 1, display: 'flex', 
                                    flexDirection: 'column', 
                                    alignItems: 'stretch',
                                    px: 3,
                                    py: 2,                           
                                  }}
                                  
                                  >
                           
                            <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>                              
  
                              Administración de Ubicaciones de Interés 
                            </Typography>


                            <TextField
                              label="Buscar ubicación"
                              variant="outlined"
                              fullWidth
                              sx={{ mb: 2 }}
                              onChange={(e) => {
                                const valor = e.target.value.toLowerCase();
                                const filtrados = valor === ''
                                  ? allRows
                                  : allRows.filter((row) => row.ubicacion.toLowerCase().includes(valor));
                                setRows(filtrados);
                              }}
                            />


                            <Box mt={2} sx={{ flexGrow: 1, minHeight: 400, maxHeight: 'calc(100vh - 350px)', overflowY: 'auto' }}>
                              <DataGrid
                                 getRowId={(row) => row.id || `${row.ubicacion}`}
                                rows={rowsConIndice}
                                columns={columns}
                                
                              
                              />
                            </Box>

                            <Dialog 
                            open={open} 
                            onClose={() => setOpen(false)}
                              PaperProps={{
                                sx: { minWidth: 800 }
                              }}
                            >
                              <DialogTitle>Agregar / Editar Ubicación</DialogTitle>
                              <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
                                <Autocomplete
                                  freeSolo
                                  options={ubicacionesDisponibles}
                                  value={formData.ubicacion}
                                  onInputChange={(event, newInputValue) => {
                                    setFormData({ ...formData, ubicacion: newInputValue });
                                  }}
                                  renderInput={(params) => <TextField {...params} label="Ubicación" variant="outlined" fullWidth />}
                                />
                              </DialogContent>
                              <DialogActions>
                                <Button onClick={() => setOpen(false)}>Cancelar</Button>
                                <Button variant="contained" onClick={handleSave}>Guardar</Button>
                              </DialogActions>
                            </Dialog>

                          </Box>
                    </Paper>
            </Grid>

             <Grid size={{ xs: 12, md: 3 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Button
                     variant="contained"
                      size="large"
                      sx={{ minWidth: '100%', py: 2 }}
                      startIcon={<AddIcon />}

                      onClick={() => {
                        setFormData({ id: 0, ubicacion: '' });
                        setOpen(true);
                      }}
                    >
                      Agregar Ubicación
                    </Button>
                  </Box>
             </Grid>

  <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
    <DialogTitle>Confirmar eliminación</DialogTitle>
    <DialogContent>
      <DialogContentText>
        ¿Estás seguro de que deseas eliminar esta ubicación? Esta acción no se puede deshacer.
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={() => setConfirmOpen(false)}>Cancelar</Button>
      <Button onClick={confirmDelete} variant="contained" color="error">Eliminar</Button>
    </DialogActions>
  </Dialog>

  </Grid>
  );
};

export default UbicacionesInteres;