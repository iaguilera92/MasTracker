import { Box, Typography, Container, Grid, Button, useMediaQuery, useTheme, IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { useInView } from 'react-intersection-observer';
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import "./css/Informations.css"; // Importamos el CSS
import "swiper/css";
import BuildCircleIcon from '@mui/icons-material/BuildCircle';

const anuncios = [
  {
    title: "Servicio de Grúa 24/7hrs",
    description: "Disponibles día y noche para emergencias o traslados planificados.",
    image: "/Informations-1.webp",
    bgColor: "linear-gradient(180deg, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.3))",
    textColor: "white",
    descriptors: [
      "Cobertura regional rápida.",
      "Equipo capacitado y seguro.",
      "Para fallas o faenas industriales.",
      "Coordinación con tu operación."
    ]
  },
  {
    title: "Servicio de Mecánica Integral",
    description: "Reparación y ajuste de motores diésel y BNC con herramientas expertas.",
    image: "/Informations-2.webp",
    bgColor: "linear-gradient(180deg, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.2))",
    textColor: "white",
    descriptors: [
      "Atención en terreno o taller.",
      "Técnicos certificados.",
      "Repuestos de calidad.",
      "Ideal para maquinaria pesada."
    ]
  },
  {
    title: "Mantenimientos Preventivos",
    description: "Evita fallos con inspecciones periódicas a equipos eléctricos y mecánicos.",
    image: "/Informations-3.webp",
    bgColor: "linear-gradient(180deg, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.2))",
    textColor: "white",
    descriptors: [
      "Limpieza de componentes clave.",
      "Ajustes normativos.",
      "Informe técnico claro.",
      "Planes según uso y riesgo."
    ]
  },
  {
    title: "Asistencia Remota",
    description: "Soporte técnico inmediato vía acceso remoto seguro y confiable.",
    image: "/Informations-4.webp",
    bgColor: "linear-gradient(180deg, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.2))",
    textColor: "white",
    descriptors: [
      "Monitoreo en tiempo real.",
      "Uso de TeamViewer o AnyDesk.",
      "Solución sin desplazarse.",
      "Ideal para zonas remotas."
    ]
  }
];


const Informations = () => {
  // Controla la vista del componente
  const [isGrabbing, setIsGrabbing] = useState(false);
  const { ref, inView } = useInView({
    threshold: 0.1, // Se activa cuando el 20% del componente es visible
    triggerOnce: true, // La animación ocurre solo una vez
  });
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [showArrow, setShowArrow] = useState(true);

  const [swiperInstance, setSwiperInstance] = useState(null);
  const { ref: swiperRef, inView: swiperInView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });
  const [hasAnimated, setHasAnimated] = useState(false);


  //ANIMACIÓN DESCRIPTORES
  useEffect(() => {
    if (swiperInView && swiperInstance && !hasAnimated && isMobile) {
      const timeout = setTimeout(() => {
        swiperInstance.slideTo(0, 1000);
        setHasAnimated(true);
      }, 500);

      return () => clearTimeout(timeout);
    }
  }, [swiperInView, swiperInstance, hasAnimated, isMobile]);


  const irASiguienteSlide = () => {
    if (swiperInstance) {
      swiperInstance.slideNext();
    }
  };

  const contactarPorWhatsapp = (titulo) => {
    const mensaje = `Hola, estoy interesado en el servicio: *${titulo}*. ¿Podrías darme más información?`;
    const telefono = "56922292189";
    const url = `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, "_blank");
  };

  useEffect(() => {
    if (inView) {
      setShouldAnimate(true);
    }
  }, [inView]);


  return (
    <Box
      sx={{
        position: "relative",
        zIndex: 10,
        py: 0,
        pt: isMobile ? 10 : 9,
        marginTop: 0,
        marginBottom: "0px",
        color: "white",
        overflow: "hidden",
        minHeight: "100vh", // ✅ fuerza que el fondo se muestre completo
      }}
    >

      {/* Fondo con imagen fija */}
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          backgroundImage: "url(fondo-blizz.avif)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          zIndex: -1,
        }}
      >
        {/* Capa oscura encima del fondo */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.3)",
            zIndex: 1,
            pointerEvents: "none",
          }}
        />
      </Box>



      <Container sx={{ textAlign: "center", color: "white", maxWidth: "1400px !important", }}>
        <Box ref={ref} sx={{ position: "relative", textAlign: "center", mb: 2, mt: 4 }}>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.6, ease: 'easeOut' }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: { xs: 1, md: 2 }, // Menor espacio entre icono y texto en mobile
                mb: 1,
                px: 2, // padding horizontal mínimo
              }}
            >
              <BuildCircleIcon sx={{ fontSize: { xs: 28, md: 32 }, color: "#ffb905" }} />

              <Typography
                variant="h4"
                gutterBottom
                sx={{
                  fontFamily: "'Montserrat', Helvetica, Arial, sans-serif !important",
                  fontSize: { xs: "1.5rem", md: "2rem" },
                  paddingLeft: { xs: 0, md: "0px" },  // ❗ Mobile sin padding
                  paddingRight: { xs: 0, md: "30px" },
                  letterSpacing: "3px",
                  my: 0,
                  position: "relative",
                  zIndex: 1,
                  color: "white",
                }}
              >
                {isMobile ? "Servicios" : "Servicios Más Tracker"}
              </Typography>
            </Box>


          </motion.div>

          {/* Línea debajo del título con animación (con retraso de 2 segundos) */}
          <motion.hr
            initial={{ opacity: 0 }} // Comienza invisible
            animate={shouldAnimate ? { opacity: 1 } : {}} // Aparece completamente
            transition={{ duration: 0.8, delay: 1.6 }} // Aparece después de 1s y dura 1s
            style={{
              position: "absolute",
              top: isMobile ? "calc(80% - 12px)" : "calc(100% - 30px)", // Ajusta la posición
              left: "5%",
              width: "90%", // Mantiene su tamaño desde el inicio
              border: "1px solid white",
              zIndex: 0,
              background: "white",
              clipPath: "polygon(0% 0%, 0% 0%, 15% 100%, 0% 100%, 0% 0%, 100% 0%, 84% 100%, 100% 100%, 100% 0%)",
            }}
          />

        </Box>

        {/* Columna de los descriptores */}
        <Grid item xs={12} md={6}>
          <Box ref={swiperRef} sx={{ overflow: "visible", display: isMobile ? "block" : "block", position: "relative", px: 1, pt: 2, pb: 5 }}>

            {swiperInView && (
              <Swiper
                spaceBetween={24}
                slidesPerView={isMobile ? 1.2 : 4.1}
                onSwiper={setSwiperInstance}
                initialSlide={anuncios.length - 1} // Comienza en el último
                centeredSlides={false}
                pagination={{ clickable: true }}
                onSlideChange={(swiper) => {
                  const index = swiper.activeIndex;
                  setShowArrow(index < 3 && isMobile);
                }}
              >
                {anuncios.map((anuncio, index) => (
                  <SwiperSlide key={index}>
                    <motion.div
                      initial={!isMobile ? { opacity: 0, x: 100 } : undefined}
                      animate={!isMobile ? { opacity: 1, x: 0 } : undefined}
                      transition={!isMobile ? { duration: 0.6, delay: 1.6 + index * 0.3, ease: "easeOut" } : undefined}
                    >
                      <Box
                        sx={{
                          width: "100%",
                          height: "420px", // Más largo
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "space-between", // distribuye arriba y abajo
                          alignItems: "center",
                          backgroundImage: `url(${anuncio.image})`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                          borderRadius: "16px",
                          position: "relative",
                          overflow: "hidden",
                          color: "white",
                          p: 0.5,
                          cursor: isGrabbing ? 'grabbing' : 'grab',
                          transition: 'cursor 0.2s ease',
                        }}
                        onPointerDown={() => setIsGrabbing(true)}
                        onPointerUp={() => setIsGrabbing(false)}
                        onPointerLeave={() => setIsGrabbing(false)}
                      >
                        {/* Capa oscura */}
                        <Box
                          sx={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%",
                            background: "linear-gradient(180deg, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0))",
                            zIndex: 2
                          }}
                        />

                        {/* Contenido textual */}
                        <Box
                          sx={{
                            zIndex: 3,
                            px: 2,
                            pt: 3,
                            flexGrow: 1,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "flex-start",
                            textAlign: "center",
                          }}
                        >
                          <Typography variant="h6" sx={{ fontWeight: "bold", fontSize: "20px", mb: 1 }}>
                            {anuncio.title}
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{
                              fontSize: { xs: '0.85rem', sm: '0.95rem' },
                              maxWidth: 400,
                              mb: 1,
                            }}
                          >
                            {anuncio.description}
                          </Typography>

                          <Box
                            sx={{
                              display: 'flex',
                              flexDirection: 'column',
                              gap: 1.2,
                              mt: 1
                            }}
                          >
                            {anuncio.descriptors?.map((text, index) => (
                              <motion.div
                                key={index}
                                initial={{ opacity: 0, x: 10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.2, duration: 0.5 }}
                              >
                                <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                                  <Box
                                    sx={{
                                      minWidth: 22,
                                      height: 22,
                                      borderRadius: '50%',
                                      bgcolor: '#ffb905',
                                      color: 'black',
                                      fontSize: '0.75rem',
                                      fontWeight: 'bold',
                                      display: 'flex',
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                      boxShadow: '0px 2px 5px rgba(0,0,0,0.2)',
                                      mr: 1
                                    }}
                                  >
                                    {index + 1}
                                  </Box>
                                  <Typography
                                    variant="body2"
                                    sx={{
                                      fontSize: '0.85rem',
                                      lineHeight: 1.4,
                                      color: 'white',
                                      textAlign: 'left'
                                    }}
                                  >
                                    {text}
                                  </Typography>
                                </Box>
                              </motion.div>
                            ))}
                          </Box>

                        </Box>

                        {/* Botón Contactar */}
                        <Box sx={{ zIndex: 3, mb: 2, width: "100%", display: "flex", justifyContent: "center" }}>
                          <Button
                            variant="contained"
                            size="medium"
                            onClick={() => contactarPorWhatsapp(anuncio.title)}
                            sx={{
                              px: 4,
                              py: 1.2,
                              width: "80%",
                              maxWidth: 320,
                              backgroundColor: "#ffb905",
                              color: "#000",
                              fontWeight: "bold",
                              borderRadius: "30px",
                              textTransform: "none",
                              fontSize: "1rem",
                              boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)",
                              transition: "all 0.3s ease-in-out",
                              "&:hover": {
                                backgroundColor: "#e6a800",
                                transform: "scale(1.05)",
                                boxShadow: "0px 6px 18px rgba(0, 0, 0, 0.3)"
                              },
                              "&:active": {
                                transform: "scale(0.98)",
                                boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.2)"
                              }
                            }}
                          >
                            Contactar
                          </Button>
                        </Box>

                      </Box>
                    </motion.div>
                  </SwiperSlide>
                ))}
              </Swiper>
            )}
            {showArrow && (
              <motion.div
                animate={{
                  x: [0, 5, 0], // Flota hacia la derecha y vuelve
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                style={{
                  position: "absolute",
                  top: -12,
                  right: isMobile ? 10 : 37,
                  zIndex: 10,
                }}
              >
                <IconButton
                  onClick={irASiguienteSlide}
                  sx={{
                    color: "white",
                    transition: "opacity 0.3s ease-in-out",
                    backgroundColor: "transparent",
                    boxShadow: "none",
                    padding: 0,
                    "&:hover": {
                      backgroundColor: "transparent",
                    },
                  }}
                >
                  <ArrowForwardIcon fontSize="large" sx={{ fontSize: "23px" }} />
                </IconButton>
              </motion.div>
            )}

          </Box>
        </Grid>

      </Container>
    </Box >
  );
};

export default Informations;