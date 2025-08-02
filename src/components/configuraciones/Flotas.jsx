import React from 'react';
import {
  Box, Container, Grid, Typography, Card, CardContent, Button
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import { motion } from 'framer-motion';

const flotas = [
  { nombre: 'Flota 1', cantidad: 9 },
  { nombre: 'Flota 2', cantidad: 5 },
  { nombre: 'Flota 3', cantidad: 7 },
];

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

  const handleIrAFlota = (nombre) => {
    navigate('/flota', { state: { flota: nombre } });

  };

  return (
    <Container
      maxWidth={false}
      disableGutters
      sx={{
        minHeight: '100vh',
        width: '100vw',
        backgroundImage: 'url(fondo-blizz.avif)',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        backgroundPosition: 'center',
        py: 12,
        px: 4,
      }}
    >
      <Typography
        variant="h4"
        sx={{
          color: 'white',
          fontWeight: 700,
          mb: 4,
          fontFamily: "'Montserrat', sans-serif",
        }}
      >
        Flotas Agrupadas
      </Typography>

      <Grid container spacing={3}>
        {flotas.map((flota, index) => (
          <Grid item xs={12} md={4} key={index}>
            <motion.div
              custom={index}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
            >
              <Card
                sx={{
                  backgroundColor: 'white',
                  borderRadius: 3,
                  boxShadow: 3,
                  transition: 'transform 0.3s ease',
                  '&:hover': {
                    transform: 'scale(1.02)',
                  },
                }}
              >
                <CardContent>
                  <Box display="flex" alignItems="center" gap={1} mb={1}>
                    <DirectionsCarIcon sx={{ color: '#0064b4' }} />
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
