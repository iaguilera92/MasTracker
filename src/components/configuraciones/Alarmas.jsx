import React, { useRef, useState, useEffect } from 'react';
import {
  Box, Container, Snackbar, Alert, Typography, Table, TableBody,
  TableCell, TableContainer, TableHead, TableRow, Paper, useTheme, useMediaQuery
} from '@mui/material';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import { motion } from 'framer-motion';

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
const letterVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: { delay: 0.4 + i * 0.1 },
  }),
};
const rowVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.3 + i * 0.1,
      duration: 0.4,
      ease: "easeOut",
    },
  }),
};
const containerVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

const Alarmas = () => {
  const [snackbar, setSnackbar] = useState({ open: false, message: '' });
  const containerRef = useRef(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const MotionTableRow = motion(TableRow);
  const MotionTableContainer = motion(TableContainer);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <Container
      maxWidth={false}
      disableGutters
      sx={{
        minHeight: '100vh',
        width: '100vw',
        overflowX: 'hidden',
        py: 1,
        px: isMobile ? 3 : 6,
        pb: 3.5,
        backgroundImage: 'url(fondo-blizz.avif)',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        backgroundPosition: 'center'
      }}
    >
      <Box ref={containerRef} sx={{ pt: 12, pb: 4, px: { xs: 1, md: 4 } }}>
        <Box display="flex" alignItems="center" mb={2} gap={1}>
          <WarningAmberIcon sx={{ color: '#ffb905', fontSize: 28 }} />
          <Typography
            variant="h5"
            component="div"
            sx={{
              fontWeight: 600,
              color: 'white',
              display: 'flex',
              gap: '2px',
              fontFamily: "'Montserrat', sans-serif",
            }}
          >
            {'Alarmas'.split('').map((char, i) => (
              <motion.span
                key={i}
                custom={i}
                variants={letterVariants}
                initial="hidden"
                animate="visible"
                style={{ display: 'inline-block' }}
              >
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            ))}
          </Typography>
        </Box>
        <MotionTableContainer
          component={Paper}
          sx={{ borderRadius: 3, backgroundColor: "white", overflowY: "scroll", }}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
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
                <MotionTableRow
                  key={index}
                  custom={index}
                  variants={rowVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <TableCell>{row.tipo}</TableCell>
                  <TableCell>{row.historial}</TableCell>
                  <TableCell>{row.vehiculo}</TableCell>
                  <TableCell>{row.hora}</TableCell>
                </MotionTableRow>
              ))}
            </TableBody>
          </Table>
        </MotionTableContainer>
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
