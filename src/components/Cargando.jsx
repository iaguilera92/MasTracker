import React, { useState, useEffect } from 'react';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import "./css/Cargando.css";

const Cargando = () => {
    const [glow, setGlow] = useState(false);
    const [showElectricEffect, setShowElectricEffect] = useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const NUM_COLUMNS = isMobile ? 10 : 16;
    const COLUMN_WIDTH_PX = isMobile ? 50 : undefined;
    const [showImage, setShowImage] = useState(false);
    const [showStrips, setShowStrips] = useState(true);


    useEffect(() => {
        const timerGlow = setTimeout(() => {
            setGlow(true);
            setShowElectricEffect(true);

            setTimeout(() => {
                setShowElectricEffect(false);
            }, 1000);
        }, 2000);

        return () => clearTimeout(timerGlow);
    }, []);

    //FONDO TIRAS VERTICALES
    useEffect(() => {
        const showImageTimer = setTimeout(() => {
            setShowImage(true);

            const hideStripsTimer = setTimeout(() => {
                setShowStrips(false);
            }, 2000); // duración del fadeIn

            return () => clearTimeout(hideStripsTimer);
        }, 800); // ⏳ duración de las tiras

        return () => clearTimeout(showImageTimer);
    }, []);


    return (
        <Box
            sx={{
                position: 'relative',
                width: '100%',
                height: '100vh',
                overflow: 'hidden',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                bgcolor: 'rgba(0, 0, 0, 0.85)',
                zIndex: 9999,
            }}
        >

            {/* FONDO */}

            {showStrips && (
                <Box
                    sx={{
                        position: 'absolute',
                        inset: 0,
                        display: 'flex',
                        zIndex: 1, // correcto
                    }}
                >

                    {Array.from({ length: NUM_COLUMNS }).map((_, index) => (
                        <motion.div
                            key={index}
                            initial={{ translateY: index % 2 === 0 ? '-100%' : '100%' }}
                            animate={{ translateY: '0%' }}
                            transition={{
                                duration: 0.8,
                                delay: index * 0,
                                ease: 'easeInOut',
                            }}
                            style={{
                                flex: isMobile ? '0 0 auto' : '1',
                                width: isMobile ? `${COLUMN_WIDTH_PX}px` : 'auto',
                                height: '100%',
                                backgroundColor: 'rgb(0 7 41)',
                                margin: 0,
                                padding: 0,
                                border: 'none',
                                boxSizing: 'border-box',
                                position: 'relative',
                                zIndex: 0,
                                transformOrigin: 'left center',
                                backfaceVisibility: 'hidden',
                            }}
                        />
                    ))}

                </Box>
            )}


            <Box
                sx={{
                    position: 'absolute',
                    inset: 0,
                    backgroundImage: 'url(fondo-blizz.avif)',
                    backgroundSize: 'cover',
                    backgroundPosition: { xs: '25% 20%', md: 'center 20%' },
                    backgroundRepeat: 'no-repeat',
                    filter: 'brightness(0.7) contrast(1.2)',
                    zIndex: 2,
                    opacity: showImage ? 1 : 0,
                    transition: 'opacity 2s ease-in',
                }}
            />


            {/* Contenido */}
            <Box
                sx={{
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    transform: 'translateY(-40%)',
                    zIndex: 3,
                    opacity: showImage ? 1 : 0,
                    transition: 'opacity 2s ease-in',
                }}
            >
                {/* Imágenes + Efecto eléctrico */}
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 0,
                        marginLeft: '-1px', // o prueba con -2 si es necesario
                        marginBottom: '20px',
                        position: 'relative',
                        lineHeight: 0,
                    }}
                >

                    <motion.img
                        src="/logo-masautomatizacion-1-white.png"
                        alt="masautomatizacion Icono"
                        style={{
                            width: 90,
                            height: 'auto',
                            transformOrigin: 'center center',
                        }}
                        animate={showImage ? { rotate: 360 } : { rotate: 0 }}
                        transition={{ repeat: 0, duration: 0.7, ease: 'linear' }}
                    />

                    {/* Texto deslizante con fadeIn */}
                    <motion.img
                        src="/logo-masautomatizacion-2-white.png"
                        alt="masautomatizacion Consultores"
                        style={{ width: 180, height: 'auto' }}
                        initial={{ opacity: 0, x: 40 }}
                        animate={showImage ? { opacity: 1, x: 0 } : { x: 0, opacity: 1 }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                    />

                </Box>

                {/* Barra de carga */}
                <Box
                    sx={{
                        width: '260px',
                        height: '8px',
                        backgroundColor: '#111',
                        borderRadius: '50px',
                        overflow: 'hidden',
                        position: 'relative',
                        boxShadow: '0 0 12px #0ff4',
                    }}
                >
                    <motion.div
                        style={{
                            width: '70px',
                            height: '100%',
                            background: 'linear-gradient(90deg, #00fff0, #007de0)',
                            borderRadius: '50px',
                            boxShadow: '0 0 12px #00f9, 0 0 30px #00e0ff',
                        }}
                        initial={{ x: -80 }}
                        animate={{ x: 260 }}
                        transition={{
                            repeat: Infinity,
                            repeatType: 'loop',
                            duration: 1,
                            ease: 'linear',
                        }}
                    />
                </Box>
            </Box>
        </Box>
    );
};

export default Cargando;
