import React, { useRef, useState } from 'react';
import {
  Box, Typography, Grid, Card, CardContent, Snackbar, Button, Alert, useTheme, useMediaQuery, Container, Collapse
} from '@mui/material';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import AddIcon from '@mui/icons-material/Add';
import { motion } from 'framer-motion';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Dashboard from '../Dashboard';
import CloseIcon from '@mui/icons-material/Close';
import { useLocation } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const flota = [
  // Flota 1 (9 registros)
  { id: '4560P1', vehiculo: 'HF JT 66', fechaIngreso: '2022-10-10', nombreFlota: 'Flota 1' },
  { id: '4560P2', vehiculo: 'CU PX 94', fechaIngreso: '2022-10-11', nombreFlota: 'Flota 1' },
  { id: '4560P3', vehiculo: 'BH YT 41', fechaIngreso: '2022-10-12', nombreFlota: 'Flota 1' },
  { id: '4560P4', vehiculo: 'FV HB 13', fechaIngreso: '2022-10-16', nombreFlota: 'Flota 1' },
  { id: '4560P5', vehiculo: 'AA AA 11', fechaIngreso: '2022-10-17', nombreFlota: 'Flota 1' },
  { id: '4560P6', vehiculo: 'BB BB 22', fechaIngreso: '2022-10-18', nombreFlota: 'Flota 1' },
  { id: '4560P7', vehiculo: 'CC CC 33', fechaIngreso: '2022-10-19', nombreFlota: 'Flota 1' },
  { id: '4560P8', vehiculo: 'DD DD 44', fechaIngreso: '2022-10-20', nombreFlota: 'Flota 1' },
  { id: '4560P9', vehiculo: 'EE EE 55', fechaIngreso: '2022-10-21', nombreFlota: 'Flota 1' },

  // Flota 2 (5 registros)
  { id: '4560P10', vehiculo: 'BW FM 16', fechaIngreso: '2022-10-16', nombreFlota: 'Flota 2' },
  { id: '4560P11', vehiculo: 'CU PX 84', fechaIngreso: '2022-10-16', nombreFlota: 'Flota 2' },
  { id: '4560P12', vehiculo: 'BH YT 71', fechaIngreso: '2022-10-17', nombreFlota: 'Flota 2' },
  { id: '4560P13', vehiculo: 'FF FF 66', fechaIngreso: '2022-10-18', nombreFlota: 'Flota 2' },
  { id: '4560P14', vehiculo: 'GG GG 77', fechaIngreso: '2022-10-19', nombreFlota: 'Flota 2' },

  // Flota 3 (7 registros)
  { id: '4560P15', vehiculo: 'DV HC 179', fechaIngreso: '2022-10-17', nombreFlota: 'Flota 3' },
  { id: '4560P16', vehiculo: 'CF WY 13', fechaIngreso: '2022-10-20', nombreFlota: 'Flota 3' },
  { id: '4560P17', vehiculo: 'HH HH 88', fechaIngreso: '2022-10-21', nombreFlota: 'Flota 3' },
  { id: '4560P18', vehiculo: 'II II 99', fechaIngreso: '2022-10-22', nombreFlota: 'Flota 3' },
  { id: '4560P19', vehiculo: 'JJ JJ 00', fechaIngreso: '2022-10-23', nombreFlota: 'Flota 3' },
  { id: '4560P20', vehiculo: 'KK KK 10', fechaIngreso: '2022-10-24', nombreFlota: 'Flota 3' },
  { id: '4560P21', vehiculo: 'LL LL 20', fechaIngreso: '2022-10-25', nombreFlota: 'Flota 3' },
];


const letterVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: { delay: 0.4 + i * 0.1 },
  }),
};

const Flota = () => {
  const [snackbar, setSnackbar] = useState({ open: false, message: '' });
  const containerRef = useRef(null);
  const [expandedIndex, setExpandedIndex] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const dashboardRefs = useRef([]);
  const { state } = useLocation();
  const nombreFlota = state?.flota;
  const vehiculosFiltrados = flota.filter(f => f.nombreFlota === nombreFlota);

  const handleExpandClick = (index) => {
    const wasExpanded = expandedIndex === index;
    setExpandedIndex(wasExpanded ? null : index);

    if (!wasExpanded) {
      setTimeout(() => {
        dashboardRefs.current[index]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 300); // pequeño delay para que se renderice primero
    }
  };


  return (
    <Container
      maxWidth={false}
      disableGutters
      sx={{
        minHeight: '100vh',
        width: '100vw',
        overflowX: 'hidden',
        py: 1,
        px: isMobile ? 4 : 6,
        pb: 3.5,
        backgroundImage: 'url(fondo-blizz.avif)',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        backgroundPosition: 'center',
      }}
    >
      <Box ref={containerRef} sx={{ pt: 12, pb: 4, px: { xs: 0, md: 4 } }}>
        {/* Título con botón */}
        <Box display="flex" justifyContent="space-between" alignItems="stretch" mb={1}>
          {/* TÍTULO */}
          <Box
            display="flex"
            alignItems="center"
            gap={1}
            sx={{
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              border: '2px solid #ffb905',
              borderRadius: 3,
              px: 2.5,
              py: 1,
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
              height: 48,
            }}
          >
            <DirectionsCarIcon sx={{ color: '#ffb905', fontSize: 24 }} />
            <Typography
              variant="h6"
              component="div"
              sx={{
                fontWeight: 600,
                color: 'white',
                display: 'flex',
                gap: '2px',
                fontFamily: "'Montserrat', sans-serif",
                fontSize: '1.125rem',
              }}
            >
              {nombreFlota.split('').map((char, i) => (
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

          {/* BOTONES */}
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'stretch' }}>
            {!isMobile && (
              <motion.div
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
              >
                <Button
                  variant="outlined"
                  startIcon={<ArrowBackIcon />}
                  sx={{
                    height: 48,
                    color: 'white',
                    borderColor: 'white',
                    fontWeight: 600,
                    borderRadius: 2,
                    '&:hover': {
                      backgroundColor: 'rgba(255,255,255,0.1)',
                    },
                  }}
                  onClick={() => navigate('/flotas')}
                >
                  Volver
                </Button>
              </motion.div>
            )}

            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.4 }}
            >
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                sx={{
                  height: 48,
                  backgroundColor: '#ffb905',
                  color: 'black',
                  fontWeight: 600,
                  borderRadius: 2
                }}
                onClick={() => setSnackbar({ open: true, message: 'Función no implementada' })}
              >
                Agregar Flota
              </Button>
            </motion.div>
          </Box>
        </Box>


        {/* CONTENIDO PRINCIPAL */}
        <Box sx={{ minHeight: '100vh', py: 2, px: { xs: 0, md: 0 } }}>
          <Grid container spacing={2} justifyContent="center">
            {vehiculosFiltrados.map((flota, index) => (
              <Grid item xs={12} key={index}>
                <motion.div
                  initial={{ opacity: 0, x: 200 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.3, duration: 0.6 }}
                  style={{ display: 'flex', justifyContent: 'center' }}
                >
                  <Card
                    sx={{
                      width: '100%',
                      borderRadius: 4,
                      overflow: 'hidden',
                      boxShadow: 4,
                      backgroundColor: 'white',
                    }}
                  >
                    {/* Título */}
                    <CardContent sx={{ px: 2, py: 1.2 }}>
                      <Box
                        display="flex"
                        flexDirection="row"
                        justifyContent="space-between"
                        alignItems="center"
                        gap={1}
                        flexWrap="wrap"
                      >
                        <Box display="flex" alignItems="center" gap={1} flex={1} sx={{ minWidth: 0 }}>
                          {/* ID en su propio box */}
                          {!isMobile && (
                            <Box
                              sx={{
                                px: 1.5,
                                py: 0.5,
                                border: '2px solid #0064b4',
                                borderRadius: 2,
                                fontWeight: 'bold',
                                fontSize: '0.875rem',
                                color: '#0064b4',
                                whiteSpace: 'nowrap',
                                flexShrink: 0,
                              }}
                            >
                              {flota.id}
                            </Box>
                          )}

                          {/* Vehículo en su propio box */}
                          <Box
                            sx={{
                              px: 1.5,
                              py: 0.5,
                              border: '2px solid #0064b4',
                              borderRadius: 2,
                              fontWeight: 600,
                              fontSize: '0.875rem',
                              color: '#0064b4',
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              flexShrink: 0, // evita que se reduzca
                            }}
                          >
                            Vehículo: {flota.vehiculo}
                          </Box>
                        </Box>

                        <Typography
                          variant="body2"
                          sx={{
                            color: '#888',
                            fontWeight: 500,
                            fontSize: '0.875rem',
                            textAlign: 'right',
                            whiteSpace: 'nowrap',
                            flexShrink: 0,
                          }}
                        >
                          {isMobile
                            ? flota.fechaIngreso
                            : `Fecha ingreso: ${flota.fechaIngreso}`}
                        </Typography>
                        {/* Círculo con el ícono */}
                        <motion.div
                          onClick={() => handleExpandClick(index)}
                          initial={false}
                          animate={{
                            rotate: expandedIndex === index ? 720 : 0,
                            backgroundColor: expandedIndex === index ? '#c62828' : '#0064b4', // rojo vs azul
                          }}
                          transition={{ duration: 0.4 }}
                          style={{
                            width: 38,
                            height: 38,
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            flexShrink: 0,
                          }}
                        >
                          {expandedIndex === index ? (
                            <CloseIcon sx={{ color: 'white', fontSize: 22 }} />
                          ) : (
                            <DirectionsCarIcon sx={{ color: 'white', fontSize: 22 }} />
                          )}
                        </motion.div>


                      </Box>
                    </CardContent>

                    {/* Contenido Expandible con animación */}
                    <Collapse in={expandedIndex === index} timeout="auto" unmountOnExit>
                      <Box sx={{ px: 2, pt: 0, pb: 2, backgroundColor: 'white' }}>
                        <Dashboard />
                      </Box>
                    </Collapse>

                    {/* Botón al final */}
                    <Button
                      fullWidth
                      onClick={() => handleExpandClick(index)}
                      sx={{
                        textTransform: 'none',
                        color: 'white',
                        backgroundColor: '#0064b4',
                        borderTop: '1px solid #ddd',
                        fontWeight: 'bold',
                        fontSize: 14,
                        py: 0.8,
                        borderRadius: 0,
                      }}
                    >
                      <motion.div
                        animate={expandedIndex === index ? { y: 0 } : { y: [0, 6, 0] }}
                        transition={{ duration: 1.2, repeat: 2 }}
                      >
                        <KeyboardArrowDownIcon
                          sx={{
                            transform: expandedIndex === index ? 'rotate(180deg)' : 'rotate(0deg)',
                            transition: 'transform 0.3s ease',
                          }}
                        />
                      </motion.div>
                    </Button>
                  </Card>

                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Box>


      </Box>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity="info" sx={{ width: '100%' }}>{snackbar.message}</Alert>
      </Snackbar>
    </Container>
  );
};

export default Flota;
