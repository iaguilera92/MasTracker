import React, { useRef, useState } from 'react';
import {
  Box, Container, Snackbar, Alert, Typography, Table, TableBody,
  TableCell, TableContainer, TableHead, TableRow, Paper
} from '@mui/material';

const filas = [
  { tipo: 'Service', historial: 'Maintenance soon', vehiculo: '4560P10', hora: '15/04/2024 10:20' },
  { tipo: 'Over-speeding', historial: 'Slow down', vehiculo: '4560P11', hora: '15/04/2024 8:30' },
  { tipo: 'Ignition ON', historial: 'Ignition', vehiculo: '4560P11', hora: '15/04/2024 7:55' },
  { tipo: 'Theft detected', historial: 'Engine running', vehiculo: '4560P1', hora: '15/04/2024 7:50' },
  { tipo: 'DPF warning', historial: 'Check DPF', vehiculo: '4560P1', hora: '15/04/2024 7:45' },
  { tipo: 'Tow detected', historial: 'Disconnect', vehiculo: '4560P15', hora: '15/04/2024 7:25' },
  { tipo: 'Service again', historial: 'Refill AdBlue', vehiculo: '4560P14', hora: '15/04/2024 8:30' },
  { tipo: 'Ignition ON', historial: 'Maintenance soon', vehiculo: '4560P11', hora: '15/04/2024 7:55' },
  { tipo: 'Ignition ON again', historial: 'Ignition', vehiculo: '4560P1', hora: '15/04/2024 8:30' },
  { tipo: 'Tow detected', historial: 'Disconnect again', vehiculo: '4560P13', hora: '15/04/2024 1:15' },
];

const Alarmas = () => {
  const [snackbar, setSnackbar] = useState({ open: false, message: '' });
  const containerRef = useRef(null);

  return (
    <Container
      maxWidth={false}
      disableGutters
      sx={{
        minHeight: '100vh',
        width: '100vw',
        overflowX: 'hidden',
        py: 1,
        px: 0,
        pb: 3.5,
        backgroundImage: 'url(fondo-blizz.avif)',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        backgroundPosition: 'center'
      }}
    >
      <Box ref={containerRef} sx={{ pt: 12, pb: 4, px: { xs: 1, md: 4 } }}>
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 2, color: "white" }}>
          ALARMAS
        </Typography>

        <TableContainer component={Paper} sx={{ borderRadius: 3, backgroundColor: "white" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>TIPO</strong></TableCell>
                <TableCell><strong>HISTORIAL</strong></TableCell>
                <TableCell><strong>VEHÍCULO</strong></TableCell>
                <TableCell><strong>HORA</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filas.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.tipo}</TableCell>
                  <TableCell>{row.historial}</TableCell>
                  <TableCell>{row.vehiculo}</TableCell>
                  <TableCell>{row.hora}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity="success" sx={{ width: '100%' }}>{snackbar.message}</Alert>
      </Snackbar>
    </Container>
  );
};

export default Alarmas;
