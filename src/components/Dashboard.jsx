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
import { MapContainer, TileLayer, Marker, useMapEvent, Polyline } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import SpeedIcon from "@mui/icons-material/Speed";
import AvTimerIcon from "@mui/icons-material/AvTimer";
import SettingsIcon from "@mui/icons-material/Settings";
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";
import ThermostatIcon from "@mui/icons-material/Thermostat";
import AltRouteIcon from "@mui/icons-material/AltRoute";

const Contador = ({ valorFinal, texto, subtexto, delay = 0, variant = "h5", iniciar }) => {
    const [valor, setValor] = useState(valorFinal || 0);
    const valorAnterior = useRef(valorFinal || 0);
    const animando = useRef(false);

    useEffect(() => {
        if (!iniciar || valorFinal === valorAnterior.current || animando.current) return;

        animando.current = true;

        let start = valorAnterior.current;
        const duration = 1000;
        const steps = 30;
        const increment = (valorFinal - start) / steps;
        const stepTime = duration / steps;

        const timeout = setTimeout(() => {
            const interval = setInterval(() => {
                start += increment;
                const nuevoValor = Math.round(start);

                if ((increment > 0 && nuevoValor >= valorFinal) || (increment < 0 && nuevoValor <= valorFinal)) {
                    setValor(valorFinal);
                    valorAnterior.current = valorFinal;
                    clearInterval(interval);
                    animando.current = false;
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



const Dashboard = ({ vehiculo }) => {

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const cardSize = isMobile ? "300px" : "340px";
    const smallCardSize = isMobile ? "140px" : "165px";
    const nombre = vehiculo?.patente || "Vehículo";
    const [snackbarServicios, setSnackbarServicios] = useState(false);
    const [usuario, setUsuario] = useState(null);
    const historialRef = useRef([]);
    const extraerCoordenadas = (valor) => {
        if (!valor || typeof valor !== 'string') return [-33.45, -70.66];

        const partes = valor.split(",").map(s => parseFloat(s.trim()));
        if (partes.length !== 2 || partes.some(isNaN)) return [-33.45, -70.66];

        return partes;
    };
    const finalPosition = extraerCoordenadas(vehiculo?.coordenadas);
    const [position, setPosition] = useState(finalPosition);
    const posicionInicial = useRef(finalPosition);



    useEffect(() => {
        const usuarioGuardado = JSON.parse(sessionStorage.getItem("usuario"));
        if (usuarioGuardado) {
            setUsuario(usuarioGuardado);
        }
    }, []);
    const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });
    const yaHizoZoom = useRef(false);

    const navigate = useNavigate();


    const initialZoom = 3; // Zoom inicial lejano
    const finalZoom = 17; // Zoom final al que queremos llegar

    const data = {
        speed: parseInt(vehiculo?.velocidad || 0),
        rpm: parseInt(vehiculo?.rpm || 0),
        load: parseInt(vehiculo?.carga_motor || 0),
        fuel: parseInt(vehiculo?.combustible || 0),
        coolant: parseInt(vehiculo?.temperatura || 0),
        odometer: parseInt(vehiculo?.odometro || 0),
    };

    useEffect(() => {
        const nuevaPosicion = extraerCoordenadas(vehiculo?.coordenadas);

        const mismaPos =
            nuevaPosicion[0] === position[0] &&
            nuevaPosicion[1] === position[1];

        if (!mismaPos) {
            setPosition(nuevaPosicion);
            historialRef.current = [...historialRef.current, nuevaPosicion];
        }
    }, [vehiculo]);



    const MoverMapa = ({ position }) => {
        const map = useMapEvent("load", () => { });
        const ultimaPos = useRef(null);

        useEffect(() => {
            if (!map || !position) return;

            // Inicializa ultimaPos si es null
            if (!ultimaPos.current) {
                ultimaPos.current = [...position];
                return;
            }

            const mismaPos =
                ultimaPos.current[0] === position[0] &&
                ultimaPos.current[1] === position[1];

            if (!mismaPos) {
                map.flyTo(position, map.getZoom(), {
                    animate: true,
                    duration: 1.0,
                });
                ultimaPos.current = [...position];
            }
        }, [position]);

        return null;
    };


    const marcarZoomRealizado = () => {
        yaHizoZoom.current = true;
    };
    useEffect(() => {
        historialRef.current = []; // Limpiar al cargar nuevo vehículo
    }, [vehiculo.id_vehiculo]);

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
                            center={posicionInicial.current}
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
                            <MoverMapa position={position} />

                            <ZoomEffect
                                zoom={finalZoom}
                                startAnimation={!yaHizoZoom.current}
                                finalPosition={finalPosition}
                                onZoomEnd={marcarZoomRealizado}
                            />

                            <TileLayer
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                                subdomains={["a", "b"]}
                                maxZoom={17}
                                noWrap
                            />
                            <Polyline
                                positions={historialRef.current}
                                pathOptions={{
                                    color: "#ff4d4d",
                                    weight: 4,
                                    opacity: 0.8,
                                    dashArray: "6, 8", // discontinua
                                }}
                            />

                            <MarkerAnimado
                                nuevaPosicion={position}
                                iconUrl="/logo-car.png"
                            />



                        </MapContainer>
                        <Grid container justifyContent="space-between" alignItems="center">
                            <Typography variant="body2" sx={{ color: "gray", fontStyle: "italic" }}>
                                OBDII ⏱ Hace 5 Segundos
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
const ZoomEffect = ({ zoom, startAnimation, finalPosition, onZoomEnd }) => {

    const map = useMapEvent("load", () => { });
    const zoomApplied = useRef(false);
    const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

    useEffect(() => {
        if (!map || !inView || zoomApplied.current || !startAnimation) return;

        zoomApplied.current = true;

        const delayTimer = setTimeout(() => {
            map.flyTo(finalPosition, zoom, {
                animate: true,
                duration: 1.5,
                easeLinearity: 1,
            });

            if (typeof onZoomEnd === 'function') {
                onZoomEnd(); // ✅ aquí marcamos que ya se hizo el zoom
            }

        }, 800);

        return () => clearTimeout(delayTimer);
    }, [inView, map, zoom, startAnimation, finalPosition]);


    return <div ref={ref} style={{ width: "100%", height: "100%" }} />;
};

const MarkerAnimado = ({ nuevaPosicion, iconUrl }) => {
    const [posicionAnimada, setPosicionAnimada] = useState(nuevaPosicion);
    const markerRef = useRef();

    useEffect(() => {
        if (!nuevaPosicion || !markerRef.current) return;

        const marker = markerRef.current;
        const duracion = 500; // ms
        const pasos = 20;
        const delay = duracion / pasos;

        const latIni = posicionAnimada[0];
        const lngIni = posicionAnimada[1];
        const latFin = nuevaPosicion[0];
        const lngFin = nuevaPosicion[1];

        let i = 0;

        const intervalo = setInterval(() => {
            i++;
            const frac = i / pasos;
            const lat = latIni + (latFin - latIni) * frac;
            const lng = lngIni + (lngFin - lngIni) * frac;
            setPosicionAnimada([lat, lng]);

            if (i >= pasos) clearInterval(intervalo);
        }, delay);

        return () => clearInterval(intervalo);
    }, [nuevaPosicion]);

    return (
        <Marker
            ref={markerRef}
            position={posicionAnimada}
            icon={new L.Icon({
                iconUrl: iconUrl,
                iconSize: [85, 85],
                iconAnchor: [42.5, 42.5],
                popupAnchor: [0, -42.5],
            })}
        />
    );
};


export default Dashboard;
