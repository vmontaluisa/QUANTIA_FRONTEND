import React, { useState, useEffect } from 'react';

import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import DescriptionIcon from '@mui/icons-material/Description';
import GridOnIcon from '@mui/icons-material/GridOn';
import NotificationImportantIcon from '@mui/icons-material/NotificationImportant';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Link } from 'react-router-dom';
import { Proceso, ProcesoTableProps } from '../types';

import CircularProgress from '@mui/material/CircularProgress';

import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  TextField,
} from '@mui/material';
import Tooltip from '@mui/material/Tooltip';


const ProcesoTableGeneralRecomendaciones: React.FC<ProcesoTableProps> = ({ title, type, lineas, data,exportar }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(lineas || 100);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(!data);
  const [orderBy, setOrderBy] = useState<keyof Proceso | null>(null);
  const [orderDirection, setOrderDirection] = useState<'asc' | 'desc'>('asc');

  useEffect(() => {
    if (data) {
      setLoading(false);
    }
  }, [data]);

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const normalize = (value: string) => value?.toString().toLowerCase().trim() ?? '';

  const filteredData = (data ?? []).filter((row) => {
    const searchTerm = normalize(search);
    return (
      normalize(row.codigo).includes(searchTerm) ||
      normalize(row.canton).includes(searchTerm) ||
      normalize(row.descripcion).includes(searchTerm) ||
      normalize(row.entidad_contratante).includes(searchTerm)
    );
  });

  const handleSort = (property: keyof Proceso) => {
    const isAsc = orderBy === property && orderDirection === 'asc';
    setOrderDirection(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const sortedData = [...filteredData].sort((a, b) => {
    if (!orderBy) return 0;
    const aValue = a[orderBy] ?? '';
    const bValue = b[orderBy] ?? '';
    return (orderDirection === 'asc'
      ? aValue > bValue
      : aValue < bValue) ? 1 : -1;
  });

  const paginatedData = sortedData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const exportToExcel = () => {
    const exportData = filteredData.map((row, index) => ({
      '#': page * rowsPerPage + index + 1,
      'CÓDIGO': row.codigo,
      'TÉRMINO': row.P2_terminos,
      'FECHA PUBLICACIÓN': row.fecha_publicacion_date,
      'FECHA LÍMITE': row.fecha_limite_date,
      'CANTÓN': row.canton,
      'DESCRIPCIÓN': row.descripcion,
      'ENTIDAD CONTRATANTE': row.entidad_contratante,
      'URL': row.entidad_link
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Procesos');

    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(blob, 'procesos.xlsx');
  };

  // Estado y función para expandir/collapsear entidad_contratante
  const [expandedRows, setExpandedRows] = useState<{ [key: number]: boolean }>({});
  const toggleExpand = (index: number) => {
    setExpandedRows((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  return (
      <Paper elevation={3} sx={{ p: 2, width: '100%' }}>
        <Box>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
          {title}
        </Typography>
        <TextField
          placeholder="Buscar"
          fullWidth
          size="small"
          variant="outlined"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ mb: 2 }}
        />


        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" sx={{ mt: 4, mb: 4 }}>
            <CircularProgress />
          </Box>
        ) : filteredData.length === 0 ? (
          <Typography variant="body1" align="center" sx={{ mt: 4 }}>


            Espere por favor...
                        <br />
                        <br />
                        <br />


                        <CircularProgress />            
          </Typography>
        ) : (



        <TableContainer sx={{ maxHeight: 600 }}>
          <Table stickyHeader size="small">
            <TableHead>
              <TableRow>
                <TableCell sx={{ textAlign: 'center', px: 1, py: 0.5, verticalAlign: 'top', fontWeight: 'bold', backgroundColor: '#e0e0e0' }}><strong>#</strong></TableCell>
                <TableCell sx={{ textAlign: 'center', px: 1, py: 0.5, verticalAlign: 'top', fontWeight: 'bold', backgroundColor: '#e0e0e0' }}><strong>CÓDIGO</strong></TableCell>
                <TableCell
                  onClick={() => handleSort('P2_terminos')}
                  sx={{ cursor: 'pointer', textAlign: 'center', px: 1, py: 0.5, verticalAlign: 'top', fontWeight: 'bold', backgroundColor: '#e0e0e0' }}
                >
                  <span style={{ textDecoration: 'underline' }}><strong>RECOMENDACION</strong></span> {orderBy === 'P2_terminos' && (orderDirection === 'asc' ? ' ▲' : ' ▼')}
                </TableCell>
                <TableCell
                  onClick={() => handleSort('fecha_publicacion_date')}
                  sx={{ cursor: 'pointer', textAlign: 'center', px: 1, py: 0.5, verticalAlign: 'top', fontWeight: 'bold', backgroundColor: '#e0e0e0', width: '150px' }}
                >
                  <span style={{ textDecoration: 'underline' }}><strong>FECHA PUBLICACIÓN</strong></span> {orderBy === 'fecha_publicacion_date' && (orderDirection === 'asc' ? ' ▲' : ' ▼')}
                </TableCell>
                <TableCell
                  onClick={() => handleSort('fecha_limite_date')}
                  sx={{ cursor: 'pointer', textAlign: 'center', px: 1, py: 0.5, verticalAlign: 'top', fontWeight: 'bold', backgroundColor: '#e0e0e0', width: '150px' }}
                >
                  <span style={{ textDecoration: 'underline' }}><strong>FECHA LÍMITE</strong></span> {orderBy === 'fecha_limite_date' && (orderDirection === 'asc' ? ' ▲' : ' ▼')}
                </TableCell>
                <TableCell
                  onClick={() => handleSort('canton')}
                  sx={{ cursor: 'pointer', textAlign: 'center', px: 1, py: 0.5, verticalAlign: 'top', fontWeight: 'bold', backgroundColor: '#e0e0e0' }}
                >
                  <span style={{ textDecoration: 'underline' }}><strong>CANTÓN</strong></span> {orderBy === 'canton' && (orderDirection === 'asc' ? ' ▲' : ' ▼')}
                </TableCell>
                <TableCell sx={{ width: '25%', textAlign: 'center', px: 1, py: 0.5, verticalAlign: 'top', fontWeight: 'bold', backgroundColor: '#e0e0e0' }}>
                  <strong>DESCRIPCIÓN</strong>
                </TableCell>
                <TableCell
                  onClick={() => handleSort('entidad_contratante')}
                  sx={{ width: '17%', cursor: 'pointer', textAlign: 'center', px: 1, py: 0.5, verticalAlign: 'top', fontWeight: 'bold', backgroundColor: '#e0e0e0' }}
                >
                  <span style={{ textDecoration: 'underline' }}><strong>ENTIDAD CONTRATANTE</strong></span> {orderBy === 'entidad_contratante' && (orderDirection === 'asc' ? ' ▲' : ' ▼')}
                </TableCell>
                <TableCell sx={{ textAlign: 'center', px: 1, py: 0.5, verticalAlign: 'top', fontWeight: 'bold', backgroundColor: '#e0e0e0' }}>
                  <strong>ACCIONES</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedData.map((row, index) => (
                <TableRow key={index} sx={{ backgroundColor: index % 2 === 0 ? '#fafafa' : 'white' }}>
                  <TableCell sx={{ textAlign: 'center', px: 1, py: 0.5 }}>{page * rowsPerPage + index + 1}</TableCell>
                  <TableCell sx={{ px: 1, py: 0.5, fontWeight: 'bold', width: '170px' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, whiteSpace: 'nowrap' }}>
                      {row.codigo}
                      


                          <Tooltip title="Recomendación de IA entre 1 a 5" arrow>
                            <Box
                              sx={{
                                width: 24,
                                height: 24,
                                borderRadius: '50%',
                                backgroundColor:
                                  row.P3 === 5 ? '#d32f2f' :    // red for 5 (very high recommendation)
                                  row.P3 === 4 ? '#f57c00' :    // orange
                                  row.P3 === 3 ? '#fbc02d' :    // yellow
                                  row.P3 === 2 ? '#388e3c' :    // green
                                  '#1976d2',                    // blue for 1 or default
                                color: 'white',
                                fontSize: '0.85rem',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontWeight: 'bold',
                              }}
                            >
                              {row.P3}
                            </Box>
                          </Tooltip>



                    </Box>
                  </TableCell>
                  <TableCell sx={{ textAlign: 'justify', px: 1, py: 0.5, lineHeight: '1.1' }}>
                    {row.P3_terminos}


                    
                  
                  </TableCell>
                  <TableCell sx={{ px: 1, py: 0.5 }}>{row.fecha_publicacion_date}</TableCell>
                  <TableCell sx={{ px: 1, py: 0.5 }}>{row.fecha_limite_date}</TableCell>
                  <TableCell sx={{ textAlign: 'justify', px: 1, py: 0.5, textTransform: 'uppercase', lineHeight: '1.1' }}>{row.canton}</TableCell>
                  <TableCell sx={{ width: '25%', textAlign: 'justify', px: 1, py: 0.5, textTransform: 'uppercase', letterSpacing: '-0.25px', lineHeight: '1.1' }}>{row.descripcion}</TableCell>
                  <TableCell sx={{ width: '17%', textAlign: 'justify', px: 1, py: 0.5, textTransform: 'uppercase', letterSpacing: '-0.25px', lineHeight: '1.1' }}>
                    <Box component="span">
                      {expandedRows[index] ? row.entidad_contratante : `${row.entidad_contratante?.slice(0, 50)}${row.entidad_contratante?.length > 50 ? '...' : ''}`}
                      {row.entidad_contratante?.length > 50 && (
                        <Box
                          component="button"
                          onClick={() => toggleExpand(index)}
                          sx={{ ml: 1, fontSize: '0.75rem', color: '#1976d2', background: 'none', border: 'none', cursor: 'pointer' }}
                        >
                          {expandedRows[index] ? 'Ver menos' : 'Ver más'}
                        </Box>
                      )}
                    </Box>
                  </TableCell>
                  <TableCell sx={{ textAlign: 'center', px: 1, py: 0.5 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                      <a
                        href={row.entidad_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="Abrir enlace externo"
                      >
                        <OpenInNewIcon fontSize="small" />
                      </a>
                      <Link to={`/proceso/${row.id}`} title="Ver detalle del proceso">
                        <DescriptionIcon fontSize="small" sx={{ cursor: 'pointer' }} />
                      </Link>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>


        )}

        <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
          <TablePagination
            component="div"
            count={filteredData.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={[50, 100]}
          />
          {exportar && (
            <button
              onClick={exportToExcel}
              style={{
                padding: '5px 16px',
                backgroundColor: '#1976d2',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontWeight: 'bold',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
              }}
            >
              <GridOnIcon fontSize="small" sx={{ mr: 1 }} />
              Descargar Excel
            </button>
          )}

        </Box>


      </Box>





      
    </Paper>
  );
};

export default ProcesoTableGeneralRecomendaciones;
