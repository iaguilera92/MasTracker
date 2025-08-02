import React, { useEffect, useState, useRef } from "react";
import {
    Box,
    Grid,
    Paper,
    Typography,
    useMediaQuery,
    useTheme, Snackbar, Alert
} from "@mui/material";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker, useMapEvent } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import SpeedIcon from "@mui/icons-material/Speed";
import AvTimerIcon from "@mui/icons-material/AvTimer";
import SettingsIcon from "@mui/icons-material/Settings";
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";
import ThermostatIcon from "@mui/icons-material/Thermostat";
import AltRouteIcon from "@mui/icons-material/AltRoute";

const Contador = ({ valorFinal, texto, subtexto, delay = 0, variant = "h5", iniciar }) => {
    const [valor, setValor] = useState(0);

    useEffect(() => {
        if (!iniciar) return;

        let start = 0;
        const duration = 2000;
        const steps = 60;
        const increment = valorFinal / steps;
        const stepTime = duration / steps;

        if (valorFinal === 0) {
            setValor(0);
            return;
        }

        const timeout = setTimeout(() => {
            const interval = setInterval(() => {
                start += increment;
                const nuevoValor = Math.ceil(start);
                if (nuevoValor >= valorFinal) {
                    setValor(valorFinal); // ⬅️ asegura el valor exacto
                    clearInterval(interval);
                } else {
                    setValor(nuevoValor);
                }
            }, stepTime);
        }, delay);

        return () => clearTimeout(timeout);
    }, [valorFinal, delay, iniciar]);

    return (
        <>
            <Typography variant={variant} fontWeight="bold">
                {valor.toLocaleString("es-CL")} {texto}
            </Typography>
            <Typography variant="body2">{subtexto}</Typography>
        </>
    );
};


const Dashboard = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    const cardSize = isMobile ? "300px" : "340px";
    const smallCardSize = isMobile ? "140px" : "165px";

    const [snackbarServicios, setSnackbarServicios] = useState(false);
    const [usuario, setUsuario] = useState(null);
    useEffect(() => {
        const usuarioGuardado = JSON.parse(sessionStorage.getItem("usuario"));
        if (usuarioGuardado) {
            setUsuario(usuarioGuardado);
        }
    }, []);


    const letterVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: (i) => ({
            opacity: 1,
            x: 0,
            transition: { delay: 0.4 + i * 0.05 }, // puedes ajustar el delay aquí
        }),
    };
    const navigate = useNavigate();

    const finalPosition = [-33.45, -70.66]; // ubicación por defecto (ej: Santiago)
    const nombre = "Vehículo 1"; // título dinámico
    const initialZoom = 3; // Zoom inicial lejano
    const finalZoom = 17; // Zoom final al que queremos llegar

    const data = {
        speed: 65,
        rpm: 2300,
        load: 78,
        fuel: 52,
        coolant: 89,
        odometer: 42536,
    };


    return (
        <Box
            sx={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                overflow: "hidden",
            }}
        >
            <Grid

                justifyContent="top"
                alignItems="center"
                sx={{ width: "100%", flexGrow: 1, pt: isMobile ? 0 : 0 }}
            >
                {/* CONTENIDO PRINCIPAL */}
                <Grid item>
                    <Paper
                        elevation={4}
                        sx={{
                            width: "100%",
                            backgroundColor: "white",
                            p: isMobile ? 1 : 2,
                            borderRadius: 3,
                            display: "flex",
                            flexDirection: "column",
                            gap: 0,
                            mt: 0,
                            maxHeight: isMobile ? "78vh" : "auto", // altura límite en mobile
                            overflowY: isMobile ? "auto" : "visible", // scroll interno en mobile
                        }}
                    >

                        <MapContainer
                            preferCanvas
                            center={finalPosition}
                            zoom={initialZoom}
                            style={{
                                width: "100%",
                                height: isMobile ? "180px" : "240px"
                            }}
                            dragging={false}
                            scrollWheelZoom={false}
                            touchZoom={false}
                            doubleClickZoom={false}
                        >
                            <ZoomEffect
                                zoom={finalZoom}
                                startAnimation={true}
                                finalPosition={finalPosition}
                            />

                            <TileLayer
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                                subdomains={["a", "b"]}
                                maxZoom={17}
                                noWrap
                            />
                            <Marker
                                position={finalPosition}
                                icon={new L.Icon({
                                    iconUrl: "/logo-car.png",
                                    iconSize: [85, 85],
                                    iconAnchor: [42.5, 42.5], // centrado exacto
                                    popupAnchor: [0, -42.5],  // opcional si usas popups
                                })}
                            />

                        </MapContainer>
                        <Grid container justifyContent="space-between" alignItems="center">
                            <Typography variant="body2" sx={{ color: "gray", fontStyle: "italic" }}>
                                OBDII ⏱ Hace un minuto
                            </Typography>
                        </Grid>
                        <Grid container spacing={1}>
                            {[
                                {
                                    label: "VEHICLE SPEED",
                                    value: data.speed,
                                    suffix: "km/h",
                                    icon: <SpeedIcon />,
                                    color: "#2196f3",
                                },
                                {
                                    label: "ENGINE RPM",
                                    value: data.rpm,
                                    suffix: "",
                                    icon: <AvTimerIcon />,
                                    color: "#9c27b0",
                                },
                                {
                                    label: "ENGINE LOAD",
                                    value: data.load,
                                    suffix: "%",
                                    icon: <SettingsIcon />,
                                    color: "#ff9800",
                                },
                                {
                                    label: "FUEL LEVEL",
                                    value: data.fuel,
                                    suffix: "%",
                                    icon: <LocalGasStationIcon />,
                                    color: "#4caf50",
                                },
                                {
                                    label: "COOLANT TEMP",
                                    value: data.coolant,
                                    suffix: "°C",
                                    icon: <ThermostatIcon />,
                                    color: "#f44336",
                                },
                                {
                                    label: "ODOMETER",
                                    value: data.odometer,
                                    suffix: "km",
                                    icon: <AltRouteIcon />,
                                    color: "#607d8b",
                                },
                            ].map((item, i) => (
                                <Grid item xs={6} sm={4} key={item.label}>
                                    <Paper
                                        elevation={1}
                                        sx={{
                                            p: 1,
                                            textAlign: "center",
                                            borderRadius: 2,
                                            backgroundColor: "#f8f9fa",
                                            borderTop: `4px solid ${item.color}`,
                                        }}
                                    >
                                        <Box
                                            display="flex"
                                            justifyContent="center"
                                            alignItems="center"
                                            mb={0.5}
                                            sx={{ color: item.color, svg: { fontSize: isMobile ? 20 : 24 } }}
                                        >
                                            {item.icon}
                                        </Box>

                                        <Typography variant="caption" fontWeight="bold" sx={{ color: "#666" }}>
                                            {item.label}
                                        </Typography>

                                        <Contador
                                            valorFinal={item.value}
                                            texto={item.suffix}
                                            subtexto=""
                                            delay={200 * i}
                                            variant={isMobile ? "subtitle1" : "h6"}
                                            iniciar={true}
                                        />
                                    </Paper>
                                </Grid>
                            ))}

                        </Grid>

                    </Paper>
                </Grid>


            </Grid >
            <Snackbar
                open={snackbarServicios}
                autoHideDuration={2000}
                onClose={() => setSnackbarServicios(false)}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
                <Alert
                    severity="info" icon={false}
                    onClose={() => setSnackbarServicios(false)}
                    sx={{ width: "100%", fontSize: "0.9rem", boxShadow: 3 }}
                >
                    🚧 En Construcción...
                </Alert>
            </Snackbar>

        </Box >

    );
};
const ZoomEffect = ({ zoom, startAnimation, finalPosition }) => {
    const map = useMapEvent("load", () => { });
    const zoomApplied = useRef(false);
    const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });
    const isMobile = useMediaQuery("(max-width:600px)");

    useEffect(() => {
        if (!map || !inView || zoomApplied.current || !startAnimation) return;

        zoomApplied.current = true;

        const delayTimer = setTimeout(() => {
            const correctedPosition = [...finalPosition]; // no aplicar offset
            map.flyTo(correctedPosition, zoom, {
                animate: true,
                duration: 1.5,
                easeLinearity: 1,
            });
        }, 800);

        return () => clearTimeout(delayTimer);
    }, [inView, map, zoom, isMobile, startAnimation, finalPosition]);

    return <div ref={ref} style={{ width: "100%", height: "100%" }} />;
};


export default Dashboard;
