import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getProcesoById } from '../services/portalService';

import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import DescriptionIcon from '@mui/icons-material/Description';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


import {
  fetchListarEmpresaUbicacion,
} from '../services/procesoService';


import {
  Typography, Box, Paper, CircularProgress, Divider,
  Link as MuiLink, Table, TableBody, TableCell,
  TableHead, TableRow, Grid, Button
} from '@mui/material';

const ProcesoDetalle = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [proceso, setProceso] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const parsedId = parseInt(id, 10);
      if (!isNaN(parsedId)) {
        fetchListarEmpresaUbicacion(parsedId).then((data) => {
          setProceso(data);
          setLoading(false);
        });
      } else {
        console.error("ID no es un número válido");
        setLoading(false);
      }
    }
  }, [id]);

  if (loading) return <CircularProgress />;

  return (


      <Grid container spacing={2}   >
         <Grid size={{ xs: 12, md: 9 }} ><br /></Grid>
     
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

                                                    <Typography variant="h4"   >Detalle del Proceso  <br/> </Typography>


 <Divider sx={{ my: 3 }} />
                                                            <Grid container spacing={2}>
                                                                    <Grid  size={{ xs: 12, md: 6 }}  ><strong>Código:</strong> {proceso.codigo}</Grid>
                                                                    <Grid size={{ xs: 12, md: 6 }}   ><strong>Tipo:</strong> {proceso.tipo_necesidad}</Grid>
                                                                    <Grid size={{ xs: 12, md: 12 }} ><strong>Descripción:</strong> <div style={{ textAlign: 'justify' }}>{proceso.descripcion}</div></Grid>
                                                                    <Grid size={{ xs: 12, md: 12 }}><strong>Entidad Contratante:</strong> {proceso.entidad_contratante}</Grid>
                                                                    <Grid size={{ xs: 12, md: 6 }}><strong>Fecha Publicación:</strong> {proceso.fecha_publicacion_date}</Grid>
                                                                    <Grid size={{ xs: 12, md: 12 }} ><strong>Fecha Límite:</strong> {proceso.fecha_limite_date}</Grid>
                                                                    <Grid size={{ xs: 12, md: 12 }}><strong>Dirección Entrega:</strong> <div style={{ textAlign: 'justify' }}>{proceso.direccion_entrega}</div></Grid>
                                                                    <Grid size={{ xs: 12, md: 12 }}><strong>Funcionario Encargado:</strong> {proceso.contacto}</Grid>
                                                                </Grid>

                                                                <Divider sx={{ my: 3 }} />
                                                       
                                                                <Typography variant="h6">Detalle del Objeto de Compra</Typography>
                                                                <Table size="small" sx={{ mt: 2 }}>
                                                                    <TableHead>
                                                                    <TableRow>
                                                                        <TableCell><strong>CPC</strong> </TableCell>
                                                                        <TableCell><strong>Cantidad</strong></TableCell>
                                                                        <TableCell><strong>Unidad</strong></TableCell>
                                                                        <TableCell><strong>Descripción</strong></TableCell>
                                                                    </TableRow>
                                                                    </TableHead>
                                                                    <TableBody>
                                                                    {proceso.datos_compras?.map((item: any, index: number) => (
                                                                        <TableRow key={index}>
                                                                        <TableCell><div style={{ textAlign: 'justify' }}> <strong>{item.CPC}</strong>: {item.CPC_categoria}</div></TableCell>
                                                                        <TableCell>{item.Cantidad}</TableCell>
                                                                        <TableCell>{item.Producto_unidad}</TableCell>
                                                                        <TableCell><div style={{ textAlign: 'justify' }}>{item.Producto_descripcion}</div></TableCell>
                                                                        </TableRow>
                                                                    ))}
                                                                    </TableBody>
                                                                </Table>

                                                             <br /><br />

                                                                <Typography variant="h6">Documentos Anexos</Typography>
                                                                <ul>
                                                                    {proceso.datos_documentos?.map((doc: any, index: number) => (
                                                                    <li key={index}>
                                                                        <MuiLink href={doc.documentos_anexos_enlace} target="_blank" 
                                                                        rel="noopener"
                                                                        sx={{ color: 'primary.dark', fontWeight: 'bold', textDecoration: 'underline' }}
                                                                        >
                                                                        {doc.Descripción}
                                                                        </MuiLink>
                                                                    </li>
                                                                    ))}
                                                                </ul>


                                                                <Divider sx={{ my: 3 }} />

  


                                                    {/* Agrega más campos según sea necesario */}


                                    </Box>
                                </Paper>
                    </Grid>


                 <Grid size={{ xs: 12, md: 3 }}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'stretch', mb: 2 }}>
                    
                     <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                      sx={{ py: 2 }}
                      startIcon={<ArrowBackIcon />}
                      onClick={() => navigate(-1)}
                    >
                      Regresar
                    </Button>

                    <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                      sx={{ mt: 2, py: 2 }}
                      href={proceso.entidad_link}
                      target="_blank"
                      rel="noopener"
                      startIcon={<OpenInNewIcon />}
                    >
                      Ver en Portal
                    </Button>
{/*

                    <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                      sx={{ mt: 2, py: 2 }}
                      onClick={() => alert('Funcionalidad para generar propuesta')}
                      startIcon={<DescriptionIcon />}
                    >
                      Generar Propuesta
                    </Button>

                    <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                      sx={{ mt: 2, py: 2 }}
                      onClick={() => alert('Proceso marcado para seguimiento')}
                      startIcon={<VisibilityIcon />}
                    >
                      Marcar Seguimiento
                    </Button>
*/}                    

                  </Box>
                </Grid>


         </Grid> 


  );
};

export default ProcesoDetalle;