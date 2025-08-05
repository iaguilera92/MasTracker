import React, { useRef, useState, useEffect } from 'react';
import {
  Box, Typography, Grid, Card, CardContent, Snackbar, Button, Alert, useTheme, useMediaQuery, Container, Collapse
} from '@mui/material';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import RestoreIcon from '@mui/icons-material/Restore'; // 👈 Asegúrate de tener esto importado
import { motion } from 'framer-motion';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Dashboard from '../Dashboard';
import CloseIcon from '@mui/icons-material/Close';
import { useLocation, useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { cargarVehiculos } from '../../helpers/HelperVehiculos';

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
  const navigate = useNavigate();
  const [vehiculos, setVehiculos] = useState([]);
  const location = useLocation();
  const { idFlota, nombreFlota } = location.state || {};
  const vehiculosFiltrados = vehiculos.filter(v => v.id_flota === idFlota);


  const handleExpandClick = (index) => {
    const wasExpanded = expandedIndex === index;
    setExpandedIndex(wasExpanded ? null : index);

    if (!wasExpanded) {
      setTimeout(() => {
        dashboardRefs.current[index]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 300); // pequeño delay para que se renderice primero
    }
  };

  useEffect(() => {
    const cargar = async () => {
      const timestamp = new Date().getTime();
      const url = `https://masautomatizacion.s3.us-east-2.amazonaws.com/PruebaNodeRed_vehiculo.xlsx?t=${timestamp}`;
      const data = await cargarVehiculos(url);
      setVehiculos(data);
    };

    cargar();
  }, []);

  const handleConfirmarRestaurar = async () => {
    setRestaurando(true);
    try {
      const url = `${window.location.hostname === "localhost" ? "http://localhost:9999" : ""}/.netlify/functions/restaurarVehiculos`;
      const res = await fetch(url, { method: "POST" });
      const result = await res.text();
      const parsed = result ? JSON.parse(result) : { message: "Excel de vehículos restaurado" };
      setSnackbar({ open: true, message: parsed.message });

      // Recargar vehículos después de restaurar
      await recargarVehiculos(); // 👈 asegúrate de tener esta función definida
      setTimeout(() => {
        setRestoreConfirmOpen(false);
        setRestaurando(false);
      }, 300);
    } catch (err) {
      console.error("❌ Error al restaurar Excel de vehículos:", err);
      setSnackbar({ open: true, message: "Error al restaurar Excel de vehículos" });
      setRestoreConfirmOpen(false);
      setRestaurando(false);
    }
  };

  const recargarVehiculos = async () => {
    const timestamp = new Date().getTime();
    const url = `https://masautomatizacion.s3.us-east-2.amazonaws.com/PruebaNodeRed_vehiculo.xlsx?t=${timestamp}`;
    const data = await cargarVehiculos(url);
    setVehiculos(data);
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
              <>
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

                {/* Nuevo botón Restaurar Vehículos */}
                <motion.div
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, ease: 'easeOut', delay: 0.3 }}
                >
                  <Button
                    variant="contained"
                    startIcon={<RestoreIcon />}
                    sx={{
                      height: 48,
                      backgroundColor: '#0064b4',
                      color: 'white',
                      fontWeight: 600,
                      borderRadius: 2,
                      '&:hover': {
                        backgroundColor: '#004d8c',
                      },
                    }}
                    onClick={() => setRestoreConfirmOpen(true)} // 👈 debe abrir el diálogo de confirmación
                  >
                    Restaurar vehículos
                  </Button>
                </motion.div>
              </>
            )}
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
                              {flota.id_vehiculo}

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
                            Vehículo: {flota.patente}

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
                            ? flota.fecha_ingreso?.toString().slice(0, 10)
                            : `Fecha ingreso: ${flota.fecha_ingreso?.toString().slice(0, 10)}`}
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
                        <Dashboard vehiculo={flota} />
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
