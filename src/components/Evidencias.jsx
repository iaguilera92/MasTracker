import React from 'react';
import {
    Box,
    Typography,
    Grid,
    useTheme,
    useMediaQuery,
    Snackbar,
    Alert,
} from '@mui/material';
import { motion } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { useInView } from "react-intersection-observer";

const Evidencias = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const videoRef = useRef();
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [visible, setVisible] = useState(false);
    const { ref: refTitulo1, inView: inViewTitulo1 } = useInView({
        threshold: 0.5,
        triggerOnce: true,
        rootMargin: '0px 0px -30% 0px'
    });

    const { ref: refTitulo2, inView: inViewTitulo2 } = useInView({
        threshold: 0.5,
        triggerOnce: true,
        rootMargin: '0px 0px -30% 0px'
    });
    const sectionRef = useRef();
    const letterVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: (i) => ({
            opacity: 1,
            x: 0,
            transition: { delay: 0.4 + i * 0.1 },
        }),
    };
    const letterVariants2 = {
        hidden: { opacity: 0, x: -20 },
        visible: (i) => ({
            opacity: 1,
            x: 0,
            transition: { delay: 0.2 + i * 0.08 },

        }),
    };
    const [hasAnimated, setHasAnimated] = useState(false);
    const titulo = "Han confiado en nosotros";
    const titulo2 = ["Integramos con las", "siguientes marcas"];
    const offsetLinea1 = titulo2[0].length;

    const handleSnackbarOpen = () => setSnackbarOpen(true);
    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') return;
        setSnackbarOpen(false);
    };

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && videoRef.current) {
                    videoRef.current.play();
                } else {
                    videoRef.current?.pause();
                }
            },
            { threshold: 0.2 }
        );
        if (videoRef.current) observer.observe(videoRef.current);
        return () => {
            if (videoRef.current) observer.unobserve(videoRef.current);
        };
    }, []);

    const logos = [
        '/logo-1.jpg', 'logo-2.png', '/logo-3.jpg', '/logo-4.png',
        '/logo-5.jpg', '/logo-6.jpg', '/logo-7.jpg'
    ];

    const marcas = [
        '/marca-1.webp', '/marca-2.webp', '/marca-3.webp', '/marca-4.webp', '/marca-5.webp'
        , '/marca-6.webp', '/marca-7.webp', '/marca-8.webp', '/marca-9.webp', '/marca-10.webp'
    ];

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true);
                }
            },
            { threshold: 0.1 }
        );
        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);
    return (
        <Box sx={{ width: '100%', position: 'relative', mt: '-80px' }}>
            {/* 🔹 Sección 1 */}
            <Box
                sx={{
                    position: 'relative',
                    height: isMobile ? '35vh' : '40vh',
                    overflow: 'hidden',
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'center',
                    pt: { xs: 11, sm: 10 },
                    zIndex: 0,
                    backgroundImage: `url('https://entel.cdn.modyo.com/uploads/019e0744-4f00-4bab-bcca-b6e5c3ae083b/original/bg-secondary-desk-xxl_Eq.webp')`,
                    backgroundAttachment: isMobile ? 'scroll' : 'fixed',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                }}
            >
                <Box sx={{ width: '100%', overflow: 'hidden', position: 'relative', height: 'auto' }}>
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: '-100%' }}
                        transition={{ repeat: Infinity, duration: 8, ease: 'linear' }}
                        style={{ whiteSpace: 'nowrap', display: 'inline-block' }}
                    >
                        <Typography
                            sx={{
                                fontSize: { xs: '2.2rem', sm: '2.8rem', md: '3.5rem' },
                                fontWeight: 600,
                                color: 'white',
                                fontFamily: `'Montserrat', 'Segoe UI', sans-serif`,
                                textShadow: '1px 1px 4px rgba(0,0,0,0.4)',
                                px: 4,
                            }}
                        >
                            Conoce cómo ayudamos a otras empresas a <span style={{ color: '#ffe037' }}>crecer.</span>
                        </Typography>
                    </motion.div>
                </Box>
            </Box>

            {/* 🔹 Sección 2 */}
            <Box
                sx={{
                    position: 'relative',
                    backgroundImage: `linear-gradient(to bottom, rgba(10,10,10,0) 50%, #0a0a0a 100%), url(fondo-blizz.avif)`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    pt: isMobile ? 0 : 0,
                    pb: 4,
                    px: { xs: 2, sm: 4 },
                    zIndex: 2,
                    mt: -8,
                    boxShadow: '0px -4px 20px rgba(0,0,0,0.05)',
                    borderTop: '1px solid #e0e0e0',
                }}
            >
                {/* Clip decorativo */}
                <Box
                    sx={{
                        position: 'absolute',
                        top: isMobile ? '-9vh' : '-99px',
                        left: 0,
                        width: '100%',
                        height: 100,
                        zIndex: 1,
                        clipPath: isMobile
                            ? "polygon(0 0, 50% 50%, 100% 0, 100% 100%, 0 100%)"
                            : "polygon(0 0, 50% 70%, 100% 0, 100% 100%, 0 100%)",
                        backgroundImage: `url(fondo-blizz.avif)`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        pointerEvents: 'none',
                    }}
                />

                {/* Logos (quedan por encima del degradado) */}
                <motion.div
                    ref={sectionRef}
                    initial={{ opacity: 0, y: 50 }}
                    animate={visible ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 1 }}
                    style={{ position: 'relative', zIndex: 6 }}
                >
                    <Box sx={{ position: 'relative', zIndex: 1 }}>
                        {/* 🔹 Logos de empresas */}
                        <Box
                            sx={{
                                background: "var(--darkreader-background-f7f4f4, #241a1a)",
                                borderRadius: 4,
                                p: { xs: 2, sm: 4 },
                                mt: 0,
                                boxShadow: '0 8px 30px rgba(0, 0, 0, 0.25)',
                                maxWidth: "1200px",
                                mx: "auto",
                            }}
                        >
                            <Box sx={{ textAlign: 'center' }}>
                                <Typography
                                    ref={refTitulo1}
                                    variant="h4"
                                    gutterBottom
                                    component="div"
                                    sx={{
                                        fontFamily: "'Montserrat', Helvetica, Arial, sans-serif",
                                        fontSize: { xs: "1.3rem", md: "2rem" },
                                        paddingLeft: { xs: "0", md: "30px" },
                                        paddingRight: { xs: "0", md: "30px" },
                                        paddingBottom: { xs: "25px", md: "25px" },
                                        paddingTop: { xs: "15px", md: "10px" },
                                        letterSpacing: "3px",
                                        my: 0,
                                        position: "relative",
                                        zIndex: 1,
                                        backgroundColor: "transparent",
                                        color: "white",
                                        display: 'inline-block',
                                        lineHeight: 1.2,
                                    }}
                                >
                                    <motion.span
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={inViewTitulo1 || hasAnimated ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                                        transition={{ delay: 0.3 }}
                                        style={{
                                            color: "#8B4513",
                                            fontWeight: "bold",
                                            fontSize: "0.9em",
                                            lineHeight: "inherit",
                                            display: "inline-block",
                                            verticalAlign: "middle",
                                            marginRight: "0",
                                            marginBottom: isMobile ? "0px" : "9px"
                                        }}
                                    >
                                        |
                                    </motion.span>

                                    {titulo.split("").map((char, i) => (
                                        <motion.span
                                            key={i}
                                            custom={i}
                                            variants={letterVariants}
                                            initial="hidden"
                                            animate={inViewTitulo1 || hasAnimated ? "visible" : "hidden"}
                                            style={{
                                                display: "inline-block",
                                                whiteSpace: "pre",
                                            }}
                                        >
                                            {char}
                                        </motion.span>
                                    ))}
                                </Typography>
                            </Box>


                            <Grid container spacing={3} justifyContent="center">
                                {logos.map((logo, i) => {
                                    const [ref, inView] = useInView({
                                        triggerOnce: true,        // Solo se activa una vez
                                        threshold: 0.2            // Se activa cuando el 20% está visible
                                    });

                                    return (
                                        <Grid item xs={6} sm={4} md={3} key={i} ref={ref}>
                                            <motion.div
                                                initial={{ opacity: 0, y: 30 }}
                                                animate={inView ? { opacity: 1, y: 0 } : {}}
                                                transition={{
                                                    delay: i * 0.15,
                                                    duration: 0.4,
                                                    ease: "easeOut"
                                                }}
                                            >
                                                <Box
                                                    sx={{
                                                        backgroundColor: "#fff",
                                                        borderRadius: 2,
                                                        overflow: "hidden",
                                                        height: 100,
                                                        transition: "all 0.3s ease",
                                                        display: "flex",
                                                        alignItems: "center",
                                                        justifyContent: "center",
                                                        padding: 0.4, // 👈 Añade espacio interno
                                                        "&:hover img": {
                                                            filter: "none",
                                                            transform: "scale(1.05)"
                                                        }
                                                    }}
                                                >
                                                    <img
                                                        src={logo}
                                                        alt={`Logo ${i + 1}`}
                                                        style={{
                                                            width: "100%",
                                                            height: "100%",
                                                            objectFit: "contain", // 👈 Ahora se ajusta sin recortar
                                                            display: "block",
                                                            transition: "all 0.3s ease-in-out"
                                                        }}
                                                    />
                                                </Box>

                                            </motion.div>
                                        </Grid>
                                    );
                                })}
                            </Grid>
                            <Box sx={{ textAlign: 'center' }}>
                                <Typography
                                    ref={refTitulo2}
                                    variant="h4"
                                    gutterBottom
                                    component="div"
                                    sx={{
                                        fontFamily: "'Montserrat', Helvetica, Arial, sans-serif",
                                        fontSize: { xs: "1.3rem", md: "2rem" },
                                        paddingLeft: { xs: "0", md: "30px" },
                                        paddingRight: { xs: "0", md: "30px" },
                                        paddingBottom: { xs: "25px", md: "25px" },
                                        paddingTop: { xs: "15px", md: "10px" },
                                        letterSpacing: "3px",
                                        my: 0,
                                        position: "relative",
                                        zIndex: 1,
                                        backgroundColor: "transparent",
                                        color: "white",
                                        display: 'inline-block',
                                        lineHeight: 1.2,
                                    }}
                                >

                                    {titulo2.map((linea, indexLinea) => (
                                        <Box key={indexLinea} sx={{ display: "block", lineHeight: 1.3 }}>
                                            {/* Span "|" solo para la primera línea */}
                                            {indexLinea === 0 && (
                                                <motion.span
                                                    initial={{ opacity: 0, x: -20 }}
                                                    animate={inViewTitulo2 || hasAnimated ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                                                    transition={{ delay: 0.3 }}
                                                    style={{
                                                        color: "#8B4513",
                                                        fontWeight: "bold",
                                                        fontSize: "0.9em",
                                                        lineHeight: "inherit",
                                                        display: "inline-block",
                                                        verticalAlign: "middle",
                                                        marginRight: "0",
                                                        marginBottom: isMobile ? "0px" : "9px"
                                                    }}
                                                >
                                                    |
                                                </motion.span>
                                            )}
                                            {linea.split("").map((char, i) => {
                                                const globalIndex = indexLinea === 0 ? i : offsetLinea1 + i;
                                                return (
                                                    <motion.span
                                                        key={`${indexLinea}-${i}`}
                                                        custom={globalIndex}
                                                        variants={letterVariants2}
                                                        initial="hidden"
                                                        animate={inViewTitulo2 || hasAnimated ? "visible" : "hidden"}
                                                        style={{
                                                            display: "inline-block",
                                                            whiteSpace: "pre",
                                                        }}
                                                    >
                                                        {char}
                                                    </motion.span>
                                                );
                                            })}
                                        </Box>
                                    ))}


                                </Typography>
                            </Box>


                            <Grid container spacing={1.5} justifyContent="center">
                                {marcas.map((logo, i) => {
                                    const [ref, inView] = useInView({
                                        triggerOnce: true,
                                        threshold: 0.2
                                    });

                                    return (
                                        <Grid item xs={6} sm={4} md={2.4} key={i} ref={ref}>
                                            <motion.div
                                                initial={{ opacity: 0, y: 30 }}
                                                animate={inView ? { opacity: 1, y: 0 } : {}}
                                                transition={{
                                                    delay: i * 0.15,
                                                    duration: 0.4,
                                                    ease: "easeOut"
                                                }}
                                            >
                                                <Box
                                                    sx={{
                                                        backgroundColor: "#fff",
                                                        borderRadius: 2,
                                                        overflow: "hidden",
                                                        height: 110,
                                                        maxWidth: 200, // ✅ más ancho
                                                        width: "100%",
                                                        display: "flex",
                                                        alignItems: "center",
                                                        justifyContent: "center",
                                                        padding: 0.5,
                                                        mx: "auto", // ✅ centro horizontal
                                                        transition: "all 0.3s ease",
                                                        "&:hover img": {
                                                            filter: "none",
                                                            transform: "scale(1.05)"
                                                        }
                                                    }}
                                                >
                                                    <img
                                                        src={logo}
                                                        alt={`Logo ${i + 1}`}
                                                        style={{
                                                            maxWidth: "160px", // ✅ imagen más ancha
                                                            width: "100%",
                                                            height: "100%",
                                                            objectFit: "contain",
                                                            display: "block",
                                                            transition: "all 0.3s ease-in-out"
                                                        }}
                                                    />
                                                </Box>
                                            </motion.div>
                                        </Grid>
                                    );
                                })}
                            </Grid>
                        </Box>
                    </Box>
                </motion.div>
            </Box >

            <Snackbar
                open={snackbarOpen}
                autoHideDuration={4000}
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert onClose={handleSnackbarClose} severity="info" sx={{ width: '100%' }}>
                    Para ver más trabajos contáctanos vía redes sociales.
                </Alert>
            </Snackbar>
        </Box >
    );
};

export default Evidencias;
