import {
  Grid, Box, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Paper, IconButton, DialogContentText
} from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useState, useEffect } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import ToggleOffIcon from '@mui/icons-material/ToggleOff';
import AddIcon from '@mui/icons-material/Add';
import { fetchListarEmpresaCPC } from '../services/empresa_cpcService';
import { fetchEliminarEmpresaCPC } from '../services/empresa_cpcService';
import { fetchCrearEmpresaCPC } from '../services/empresa_cpcService';
import { fetchEditarEmpresaCPC } from '../services/empresa_cpcService';

const CPCInteresPage = () => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({ id:0, codigo_cpc: '', producto: '', activo: true });
  const [rows, setRows] = useState([ ]);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const EMPRESA_ID = 0;

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const data = await fetchListarEmpresaCPC(EMPRESA_ID);
        setRows(data);
      } catch (error) {
        console.error('Error al cargar los CPC:', error);
      }
    };
    cargarDatos();
  }, []);

    const rowsFiltrados = rows.filter(row =>
    row.codigo_cpc.toLowerCase().includes(searchTerm.toLowerCase()) ||
    row.producto.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const rowsConIndice = rowsFiltrados.map((row, index) => ({ ...row, id_contador: index + 1 }));
  const handleEdit = (row: any) => {
    setFormData({ ...row, activo: !!row.activo });
    setOpen(true);
  };

  const handleDelete = (id: number) => {
    setDeleteId(id);
    setConfirmOpen(true);
  };

    const confirmDelete = async () => {
    if (deleteId === null) return;
    try{

            await fetchEliminarEmpresaCPC(deleteId);
      setRows((prev) => prev.filter((row) => row.id !== deleteId));
      setConfirmOpen(false);
      setDeleteId(null);
    }  catch (error) {
        console.error('Error al eliminar los CPC:', error);
      }
    }

  const columns: GridColDef[] = [
    {
      field: 'id_contador',
      headerName: 'ID',
      width: 70,
      sortable: false,
      filterable: false,
    
    },
    { field: 'codigo_cpc', headerName: 'Código CPC', width: 150 },
    { field: 'producto', headerName: 'Producto', flex: 1 },
    {
      field: 'acciones',
      headerName: 'Acciones',
      width: 150,
      sortable: false,
      filterable: false,
      renderCell: (params: any) => (
        <Box sx={{ display: 'flex', gap: 1 }}>
          <IconButton onClick={() => handleEdit(params.row)}>
            <EditIcon color="primary" />
          </IconButton>
          <IconButton onClick={() => handleDelete(params.row.id)}>
            <DeleteIcon color="error" />
          </IconButton>
        </Box>
      )
    }
  ];

  const handleSave = async () => {
    try {
      if (formData.id) {
        // Modo edición
        await fetchEditarEmpresaCPC(formData.id,formData.codigo_cpc, formData.producto);
      } else {
        // Modo creación
        await fetchCrearEmpresaCPC(EMPRESA_ID, formData.codigo_cpc, formData.producto);
      }
      const data = await fetchListarEmpresaCPC(EMPRESA_ID);
      setRows(data);
      setOpen(false);
    } catch (error) {
      console.error('Error al guardar el CPC:', error);
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
                                    height: '100%'
                                  }}                                  
                                  >

                            <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>                              
                                      Administración de CPC de Interés
                              </Typography>  

                            <TextField
                              label="Buscar CPC o Producto"
                              variant="outlined"
                              fullWidth
                              size="small"
                              value={searchTerm}
                              onChange={(e) => setSearchTerm(e.target.value)}
                              sx={{ mb: 2 }}
                            />                              

                            <Box mt={2} sx={{ flexGrow: 1, minHeight: 500, maxHeight: 'calc(100vh - 300px)', overflowY: 'auto' }}>
                              <DataGrid
                                getRowId={(row) => row.id || `${row.codigo_cpc}-${row.producto}`}
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
                              <DialogTitle>Agregar / Editar CPC</DialogTitle>
                              <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
                                <TextField
                                  label="Código CPC"
                                  value={formData.codigo_cpc}
                                  onChange={(e) => {
                                    if (e.target.value.length <= 5) {
                                      setFormData({ ...formData, codigo_cpc: e.target.value });
                                    }
                                  }}
                                  inputProps={{ maxLength: 5 }}
                                />
                                <TextField
                                  label="Producto"
                                  value={formData.producto}
                                  onChange={(e) => {
                                    if (e.target.value.length <= 200) {
                                      setFormData({ ...formData, producto: e.target.value });
                                    }
                                  }}
                                  inputProps={{ maxLength: 200 }}
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
                        setFormData({ id:0,codigo_cpc: '', producto: '', activo: true });
                        setOpen(true);
                      }}
                    >
                      Agregar CPC
                    </Button>
                  </Box>
             </Grid>


  <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
    <DialogTitle>Confirmar eliminación</DialogTitle>
    <DialogContent>
      <DialogContentText>
        ¿Estás seguro de que deseas eliminar este código CPC ? Esta acción no se puede deshacer.
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

export default CPCInteresPage;