import React from 'react';
import {
  Box, Container, Grid, Typography, Card, CardContent, Button, useTheme, useMediaQuery, Chip
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import { motion } from 'framer-motion';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

const flotas = [
  { nombre: 'Flota 1', cantidad: 9, destacada: true },
  { nombre: 'Flota 2', cantidad: 5, destacada: false },
  { nombre: 'Flota 3', cantidad: 7 },
];
const letterVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: { delay: 0.4 + i * 0.1 },
  }),
};
const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.6, ease: 'easeOut' },
  }),
};

const Flotas = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const handleIrAFlota = (nombre) => {
    navigate('/flota', { state: { flota: nombre } });

  };

  return (
    <Container
      maxWidth={false}
      disableGutters
      sx={{
        minHeight: '100%',
        width: '100vw',
        backgroundImage: 'url(fondo-blizz.avif)',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        backgroundPosition: 'center',
        py: 12,
        pb: 0,
        px: isMobile ? 3 : 6,
      }}
    >
      {/* TÍTULO */}
      <Box display="flex" alignItems="center" mb={2} gap={1}>
        <DirectionsCarIcon sx={{ color: '#ffb905', fontSize: 28 }} />
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
          {"Flotas".split('').map((char, i) => (
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


      <Grid container spacing={3}>
        {flotas.map((flota, index) => (
          <Grid item xs={12} md={4} key={index}>
            <motion.div
              custom={index}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <Card
                sx={{
                  position: 'relative', // <--- esto es clave
                  backgroundColor: 'white',
                  borderRadius: 3,
                  boxShadow: 3,
                  transition: 'transform 0.3s ease',
                  '&:hover': {
                    transform: 'scale(1.02)',
                  },
                }}
              >

                {flota.destacada && (
                  <Chip
                    label="⭐ Destacada"
                    size="small"
                    color="warning"
                    sx={{
                      position: 'absolute',
                      top: 10,
                      right: 10,
                      fontWeight: 'bold',
                      color: 'white',
                      boxShadow: 2
                    }}
                  />
                )}
                <CardContent>
                  <Box display="flex" alignItems="center" gap={1} mb={1}>
                    <Box
                      sx={{
                        backgroundColor: '#0064b4',
                        color: 'white',
                        width: 36,
                        height: 36,
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <DirectionsCarIcon fontSize="small" />
                    </Box>
                    <Typography variant="h6" fontWeight={600}>
                      {flota.nombre}
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary" mb={2}>
                    Vehículos registrados: {flota.cantidad}
                  </Typography>
                  <Button
                    variant="contained"
                    fullWidth
                    startIcon={<KeyboardArrowRightIcon />}
                    sx={{
                      backgroundColor: '#0064b4',
                      color: 'white',
                      fontWeight: 'bold',
                      borderRadius: 2,
                      textTransform: 'none',
                    }}
                    onClick={() => handleIrAFlota(flota.nombre)}
                  >
                    Ver vehículos
                  </Button>


                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Container >
  );
};

export default Flotas;
