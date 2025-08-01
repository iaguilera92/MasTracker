import React, { useState, useEffect } from "react";
import { Container, Grid, Card, CardActionArea, CardMedia, Typography, Box, Button, useTheme, useMediaQuery, } from "@mui/material";
import { styled } from "@mui/system";
import { motion } from "framer-motion";
import { FaHubspot } from "react-icons/fa";
import { useInView } from "react-intersection-observer";
import { useNavigate } from "react-router-dom";
import "./css/Features.css"; // Importamos el CSS

// Datos de ejemplo
const features =
  [
    { id: 1, title: "Minería y Energía", desc: "Soluciones eléctricas y de automatización para procesos exigentes y entornos críticos.", image: "feature-1.webp" },
    { id: 2, title: "Agua y Saneamiento", desc: "Automatización y control para sistemas de tratamiento, distribución y monitoreo.", image: "feature-2.webp" },
    { id: 3, title: "Digitalización y Supervisión Web", desc: "Plataformas SCADA y web para monitoreo remoto y control eficiente.", image: "feature-3.webp" }
  ];


// Animación de aparición desde la derecha con efecto de cascada
const cardAnimation = {
  hidden: { opacity: 0, x: 150 },
  visible: (index) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, delay: index * 0.3, ease: "easeOut" },
  }),
};

// StyledCardActionArea: al hacer hover, el overlay se despliega y la imagen hace zoom
const StyledCardActionArea = styled(CardActionArea)({
  position: "relative",
  "&:hover .overlay": {
    top: 0,
    height: "100%",
    backgroundColor: "rgba(3, 103, 191, 0.8)",
  },
  "&:hover .additional": {
    opacity: 1,
  },
  "&:hover .card-media": {
    transform: "scale(1.3)",
  },
});

// Overlay: inicialmente ocupa la mitad inferior con fondo semitransparente
const Overlay = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  left: 0,
  right: 0,
  height: "75%",
  backgroundColor: "rgba(3, 103, 191, 0.4)",
  color: theme.palette.common.white,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "flex-start",
  padding: theme.spacing(2),
  transition: "all 0.3s ease",
}));

// Descripción y botón, inicialmente ocultos
const AdditionalContent = styled(Box)({ opacity: 0, transition: "opacity 0.3s ease", });

function Features({ videoReady, scrollToInformations }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const [buttonRef, buttonInView] = useInView({ threshold: 0.9, triggerOnce: true, });
  const [hasAnimated, setHasAnimated] = useState(false);
  const navigate = useNavigate();

  //EVITAR ANIMACIÓN DUPLICADA
  useEffect(() => {
    let timer;
    if (inView && !hasAnimated) {
      if (videoReady) {
        timer = setTimeout(() => {
          setHasAnimated(true);
        }, 0);
      }
    }
    return () => clearTimeout(timer);
  }, [videoReady, inView, hasAnimated]);

  return (
    <Box
      sx={{
        backgroundImage: 'url(fondo-blizz.avif)',
        backgroundSize: 'cover',  // Asegura que la imagen cubra todo el contenedor
        backgroundPosition: 'center',  // Centra la imagen en el fondo
        backgroundAttachment: 'fixed',  // Asegura que la imagen de fondo no se mueva al hacer scroll
        py: 4,
        paddingBottom: "15px",
        color: "white",  // Ajusta el color del texto para que sea visible sobre el fondo
      }}
    >
      <Container sx={{ py: 0, maxWidth: "1500px !important", backgroundPosition: "bottom center", backgroundRepeat: "no-repeat" }}>
        <Box ref={ref}>
          <Grid container spacing={2}>
            {features.map((feature, index) => (
              <Grid item xs={12} md={4} key={feature.id}>
                <motion.div
                  initial="hidden"
                  animate={hasAnimated ? "visible" : "hidden"}
                  variants={cardAnimation}
                  custom={index}
                >
                  <Card sx={{ position: "relative", overflow: "hidden" }}>
                    <StyledCardActionArea href={feature.link} target="_self">
                      <CardMedia
                        className="card-media"
                        component="img"
                        image={feature.image}
                        alt={feature.title}
                        sx={{
                          height: isMobile ? 205 : 250,
                          transition: "transform 1s",
                        }}
                      />
                      <Overlay className="overlay">
                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: "bold",
                            marginTop: isMobile ? "20px" : "30px",
                            mb: 1,
                            textAlign: "left",
                            width: "100%",
                            marginLeft: "9px",
                            fontSize: "1.4rem",
                          }}
                        >
                          {feature.title}
                        </Typography>

                        <AdditionalContent className="additional">
                          <Typography
                            variant="body2"
                            sx={{ mb: 1, px: 1, fontSize: "1rem" }}
                          >
                            {feature.desc}
                          </Typography>

                          {/* ✅ Botón personalizado, fuera del <button> de CardActionArea */}
                          <Box sx={{ textAlign: "center", mt: 2 }}>
                            <Box
                              component="span"
                              role="button"
                              tabIndex={0}
                              className="btn-3-features"
                              sx={{
                                zIndex: 5,
                                cursor: "pointer",
                                display: "inline-block",
                              }}
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation(); // Evita que se dispare el href del CardActionArea
                                const nombreFeature = feature.title;
                                const mensaje = `¡Hola! Me interesó ${encodeURIComponent(nombreFeature)} ¿Me comentas?`;
                                window.open(
                                  `https://api.whatsapp.com/send?phone=56922292189&text=${mensaje}`,
                                  "_blank"
                                );
                              }}
                              onKeyDown={(e) => {
                                if (e.key === "Enter" || e.key === " ") {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  const nombreFeature = feature.title;
                                  const mensaje = `¡Hola! Me interesó ${encodeURIComponent(nombreFeature)} ¿Me comentas?`;
                                  window.open(
                                    `https://api.whatsapp.com/send?phone=56922292189&text=${mensaje}`,
                                    "_blank"
                                  );
                                }
                              }}
                            >
                              <span>Contratar</span>
                            </Box>
                          </Box>
                        </AdditionalContent>
                      </Overlay>
                    </StyledCardActionArea>
                  </Card>

                </motion.div>
              </Grid>
            ))}
          </Grid>
          <br />
          <Box sx={{ display: "flex", justifyContent: "center", my: 2 }}>
            <motion.div
              ref={isMobile ? buttonRef : null}
              initial={{ opacity: 0, y: 50 }}
              animate={
                isMobile
                  ? (buttonInView ? { opacity: 1, y: 0 } : {})
                  : (hasAnimated ? { opacity: 1, y: 0 } : {})
              }
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              <Button
                onClick={() => { navigate('/servicios'); }}
                variant="contained"
                target="_self"
                sx={{
                  textTransform: "none",
                  fontWeight: "bold",
                  letterSpacing: "3.1px",
                  fontFamily: "albert sans, sans-serif",
                  border: "1px solid #007de0",
                  fontSize: { xs: "10px", sm: "1.1rem" },
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                  overflow: "hidden",
                  width: { xs: "100%", sm: "460px" },
                  maxWidth: "460px",
                  height: "50px",
                  backgroundColor: "#007de0",
                  transition: "width 0.3s ease",
                  "&:hover": {
                    width: { xs: "100%", sm: "470px" },
                    backgroundColor: "#007de0",
                  },
                  "&:hover .icon": {
                    opacity: 1,
                    transform: "translateX(-10px)",
                  },
                  "&:hover .letter": {
                    transform: "translateX(15px)",
                  },
                }}
                ref={ref} // Se activa el observador para el botón
              >
                <Box sx={{ position: "relative", display: "flex", alignItems: "center" }}>
                  <Box
                    component="span"
                    className={`icon ${hasAnimated ? "animate" : ""}`} // Activar animación al estar en vista
                    sx={{
                      position: "absolute",
                      left: 0,
                      display: "flex",
                      alignItems: "center",
                      opacity: hasAnimated ? 0 : 1,  // Al hacer scroll, se oculta el icono
                      transform: hasAnimated ? "translateX(10px)" : "translateX(0)", // Mover el icono a la derecha
                      transition: "all 1s ease", // Transición suave
                      zIndex: 2,
                    }}
                  >
                    <FaHubspot style={{ color: "#fff", fontSize: "1.5rem" }} />
                  </Box>
                </Box>
                <Box
                  component="span"
                  fontSize={isMobile ? "11px" : "15px"}
                  className={`letter ${hasAnimated ? "animate" : ""}`} // Activar animación al estar en vista
                  sx={{
                    ml: 1,
                    transition: "all 1s ease", // Transición suave
                    transform: hasAnimated ? "translateX(0)" : "translateX(15px)", // Inicialmente a la derecha (15px)
                  }}
                >
                  + SOLUCIONES PARA TU EMPRESA
                </Box>
              </Button>
            </motion.div>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default Features;
