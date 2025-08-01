import React, { useState, useEffect, useRef } from "react";
import { Grid, Typography, Box, useMediaQuery, useTheme } from "@mui/material";
import "@fontsource/poppins";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";


const data = [
  { count: 21, text: "Sistemas de control implementados en industrias críticas", image: "ProyectoTerminado.mp4", },
  { count: 13, text: "Marcas integradas en plataformas PLC, SCADA y DSC", image: "Proyecto-pymes.mp4", },
  { count: 12, text: "Años de experiencia en automatización industrial", image: "Experience.mp4", },
  { count: 8, text: "Tazas de café en el día ☕", image: "Cafe.mp4", },
];

const Areas = () => {
  const images = ["consultoria.png", "consultoria2.png"];
  const [currentImage, setCurrentImage] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [delayed, setDelayed] = useState(false);
  const { ref, inView } = useInView({ threshold: 0.15, triggerOnce: false, });
  const [hasAnimated, setHasAnimated] = useState(false);
  const videosRef = useRef([]);
  const inViewStates = data.map(() => useInView({ threshold: 0.3, triggerOnce: true }));

  //EVITAR ANIMACIÓN DUPLICADA
  useEffect(() => {
    if (inView && !hasAnimated) {
      const timer = setTimeout(() => {
        setHasAnimated(true); //
      }, 2600);
      return () => clearTimeout(timer);
    }
  }, [inView, hasAnimated]);

  useEffect(() => {
    // Solo se activa el retraso cuando el item está en vista
    if (inView) {
      const timer = setTimeout(() => {
        setDelayed(true);
      }, 1700); // ⏳ Ahora el contador se activa después de 1.2 segundos

      return () => clearTimeout(timer); // Limpia el temporizador al desmontarse
    }
  }, [inView]);

  // Función para dividir el texto en palabras
  const splitTextIntoWords = (text) => {
    return text.split(" ").map((word, index) => (
      <motion.span
        key={index}
        initial={{ opacity: 0, x: "100%" }} // Empieza invisible y desde la derecha
        animate={{
          opacity: delayed ? 1 : 0,
          x: delayed ? 0 : "100%", // Aparece palabra por palabra
        }}
        transition={{
          delay: 0.2 + index * 0.2, // Retraso escalonado para cada palabra
          duration: 1,
          ease: "easeOut",
        }}
        style={{ display: "inline-block", marginRight: "5px" }} // Espaciado entre palabras
      >
        {word}
      </motion.span>
    ));
  };

  const [rotateTrigger, setRotateTrigger] = useState(false);

  //EFECTO
  useEffect(() => {
    const interval = setInterval(() => {
      setRotateTrigger(true); // Activa rotación

      setTimeout(() => {
        // Espera a que termine la animación antes de cambiar imagen
        setCurrentImage((prevImage) => (prevImage + 1) % images.length);
        setRotateTrigger(false); // Reinicia para la próxima vez
      }, 1400); // igual a la duración del giro
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    data.forEach((_, index) => {
      if (inView && videosRef.current[index]) {
        videosRef.current[index].play().catch(() => { });
      }
    });
  }, [inView]);


  return (

    <Box
      sx={{
        backgroundImage: isMobile ? 'url(/fondo-areas2.webp)' : 'url(/fondo-areas1.jpg)',
        backgroundRepeat: "no-repeat",
        backgroundSize: isMobile ? "100% 100%" : "100% auto",
        backgroundPosition: isMobile ? "center" : "",
        backgroundAttachment: isMobile ? "initial" : "fixed",
        minHeight: isMobile ? "85vh" : "auto",
        paddingTop: "30px !important",
        padding: { xs: 4, md: 16 },
        paddingBottom: { xs: 14, md: 16 },
      }}
    >
      <Grid container spacing={4} alignItems="center">
        <Grid item xs={12} md={6}>
          <Grid container spacing={4}>
            {data.map((item, index) => (
              <Grid item xs={6} sm={6} md={6} key={index}>
                <Box
                  sx={{
                    textAlign: "center",
                    color: "white",
                    borderRadius: 2,
                    width: "100%",
                    height: 150,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontFamily: "'Poppins', sans-serif",
                    perspective: "1000px",
                    cursor: "pointer",
                    position: "relative",
                  }}
                  ref={ref}
                >
                  {/* Caja para rotación 3D */}
                  <Box
                    sx={{
                      width: "100%",
                      height: "100%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      transformStyle: "preserve-3d",
                      transition: "transform 2.6s",
                      transitionDelay: inView ? "0.8s" : "0s",
                      transform: inView || hasAnimated ? "rotateY(180deg)" : "rotateY(0deg)",
                      position: "relative",
                    }}
                  >
                    {/* Cara trasera: Información */}
                    <Box
                      sx={{
                        position: "absolute",
                        backfaceVisibility: "hidden",
                        width: isMobile ? "115%" : "100%",
                        height: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "column",
                        backgroundColor: "rgba(24, 26, 27, 0.9)",
                        borderRadius: 2,
                        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)",
                        zIndex: 2,
                        transform: "rotateY(180deg)",
                      }}
                    >
                      {/* Contenedor fijo para evitar que se mueva el contador */}
                      <Box
                        sx={{
                          minWidth: "100px", // Asegura que el ancho no cambie
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                        }}
                      >
                        {/* Contador con retraso de 0.8 segundos */}
                        <Typography
                          variant="h3"
                          gutterBottom
                          sx={{
                            fontFamily: "'Saira', Sans-serif",
                            fontWeight: "700",
                            minWidth: "80px",
                            textAlign: "center",
                            marginBottom: "0.15em",
                            fontSize: isMobile ? "2.6rem" : "2.2rem", // Aumentado el tamaño
                          }}
                        >
                          +{delayed ? <CountUp start={0} end={item.count} duration={3.1} /> : "0"}
                        </Typography>
                        <Box
                          sx={{
                            textAlign: "center",
                            maxWidth: isMobile ? "100%" : "90%",
                            fontSize: isMobile ? "0.93rem" : "1.1rem", // Reducir tamaño del texto en móviles
                            fontFamily: "'Oswald', sans-serif", // Fuente agregada
                          }}
                        >
                          {splitTextIntoWords(item.text)}
                        </Box>
                      </Box>
                    </Box>

                    {/* Cara delantera: Imagen */}
                    <video
                      ref={(el) => (videosRef.current[index] = el)}
                      src={item.image}
                      muted
                      playsInline
                      style={{
                        position: "absolute",
                        backfaceVisibility: "hidden",
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        borderRadius: 8,
                        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)",
                      }}
                    />

                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Grid>

        <Grid item xs={12} md={6} display="flex" justifyContent="center">
          <motion.div
            key={currentImage}
            animate={{
              rotateY: rotateTrigger ? [0, 90, 180] : 0,
              y: [0, -10, 0],
            }}
            transition={{
              rotateY: { duration: 1.4, ease: "easeInOut" },
              y: { duration: 2, repeat: Infinity, ease: "easeInOut" },
            }}
            style={{
              position: "relative",
              width: isMobile ? 420 : 450,
              height: isMobile ? 280 : 336,
              perspective: 1200,
              transformStyle: 'preserve-3d',
            }}
          >
            {/* Imagen visible antes del giro */}
            <motion.img
              key={`front-${currentImage}`}
              src={images[currentImage]}
              alt="Rotating Image"
              width="100%"
              height="100%"
              style={{
                position: "absolute",
                backfaceVisibility: "hidden", // Oculta la cara trasera de la imagen
                transform: 'rotateY(0deg)', // Asegura que la imagen frontal no se voltee
              }}
            />

            {/* Imagen visible después del giro */}
            <motion.img
              key={`back-${(currentImage + 1) % images.length}`}
              src={images[(currentImage + 1) % images.length]}
              alt="Next Rotating Image"
              width={isMobile ? "100%" : "100%"}
              height={isMobile ? "100%" : "100%"}
              initial={{ rotateY: 180, opacity: 1 }}
              style={{
                position: "absolute",
                transform: 'rotateY(180deg)', // Imagen trasera en la posición de 180 grados
                backfaceVisibility: "hidden", // Oculta la cara trasera de la imagen
              }}
            />
          </motion.div>
        </Grid>


      </Grid>
    </Box>
  );
};

export default Areas;
