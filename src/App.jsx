import React, { useEffect, useState, useRef } from "react";
import { CssBaseline, Box, IconButton, useMediaQuery, Snackbar, Alert } from "@mui/material";
import theme from "./theme";
import { ThemeProvider } from "@mui/material/styles";
import "@fontsource/poppins";
import { lazy, Suspense } from "react";
const Informations = lazy(() => import("./components/Informations"));
const Footer = lazy(() => import("./components/Footer"));
const Navbar = lazy(() => import("./components/Navbar"));

import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { useLocation } from "react-router-dom";
import { Outlet } from "react-router-dom";
import Cargando from './components/Cargando';
import { AnimatePresence, motion } from 'framer-motion';
import "./components/css/App.css";
import { useNavigate } from "react-router-dom";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [showContacto, setShowContacto] = useState(false);
  const [showArrow, setShowArrow] = useState(false);
  const [openBubble, setOpenBubble] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const contactoRef = useRef(null); // Crear ref para la sección de contacto
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const informationsRef = useRef(null); // ✅ AÑADE AQUÍ EL REF PARA SCROLL
  const location = useLocation();
  const [videoReady, setVideoReady] = useState(false);
  const isHome = ["/", "/inicio", ""].includes(location.pathname);
  const isCompletelyReady = !isLoading && (isHome ? videoReady : true);
  const [showApp, setShowApp] = useState(false);
  const [snackbarVersion, setSnackbarVersion] = useState({ open: false, version: "", });
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const areasSection = document.getElementById("areas-section");
      if (areasSection) {
        const rect = areasSection.getBoundingClientRect();
        setShowContacto(rect.top < window.innerHeight * 0.5);
      }
      setShowArrow(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setOpenBubble(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);


  useEffect(() => {
    if (openBubble) {
      const timer = setTimeout(() => {
        setOpenBubble(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [openBubble]);

  const scrollToTop = () => {

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleUserInteraction = () => {
    setHasInteracted(true);
  };

  //location.pathname
  useEffect(() => {
    if (location.pathname === "/") {
      // Ejecutar lógica cuando se vuelva a la ruta de inicio
    }
  }, [location.pathname]);

  // ⏳ CARGANDO CON LÓGICA CORRECTA
  useEffect(() => {
    const isAuthenticated = sessionStorage.getItem("credenciales") !== null;

    if (!["/", "/inicio", "", "/login"].includes(location.pathname)) {
      setShowApp(true);
      return;
    }

    let minListo = false;

    const minTimeout = setTimeout(() => {
      minListo = true;
      if (!videoReady) {
        setShowApp(true);
        if (!isAuthenticated) navigate("/login"); // ✅ solo si no estás autenticado
      }
    }, 1500);

    const maxTimeout = setTimeout(() => {
      setShowApp(true);
      if (!isAuthenticated) navigate("/login"); // ✅ solo si no estás autenticado
    }, 4000);

    return () => {
      clearTimeout(minTimeout);
      clearTimeout(maxTimeout);
    };
  }, [videoReady, location.pathname, navigate]);




  //LIMPIAR CACHE
  useEffect(() => {
    fetch("/version.json", { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => {
        const storedVersion = localStorage.getItem("app_version");
        const currentVersion = data.version;

        if (!storedVersion) {
          localStorage.setItem("app_version", currentVersion);
          return; // No mostramos snackbar, solo almacenamos
        }

        if (storedVersion !== currentVersion) {
          console.log("🆕 Nueva versión detectada. Limpiando caché...");
          console.log("🗂️ Versión anterior:", storedVersion);
          console.log("📄 Versión nueva:", currentVersion);

          // ✅ Mostrar snackbar ANTES de recargar
          //localStorage.setItem("app_version", "0.0.1");

          setSnackbarVersion({ open: true, version: currentVersion });

          setTimeout(() => {
            caches.keys().then((names) => {
              for (let name of names) caches.delete(name);
            });
            localStorage.setItem("app_version", currentVersion);
            window.location.reload();
          }, 1500); // Espera para mostrar el mensaje
        } else {
          console.log("✅ App actualizada. Versión:", currentVersion);
        }
      })
      .catch((err) =>
        console.warn("⚠️ No se pudo verificar la versión:", err)
      );
  }, []);


  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      {/* Pantalla de carga */}
      <AnimatePresence>
        {!showApp && !["/dashboard", "/configurar-servicios"].includes(location.pathname) && (

          <>
            <motion.div
              key="cargando"
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
                zIndex: 9999,
              }}
            >
              <Cargando />
            </motion.div>

            {/* Snackbar como overlay global */}
            <Snackbar
              open={snackbarVersion.open}
              autoHideDuration={1400}
              anchorOrigin={{ vertical: "top", horizontal: "center" }}
              sx={{ zIndex: 20000 }}
            >
              <Alert
                severity="info"
                icon={false}
                sx={{
                  width: "100%",
                  fontSize: "0.9rem",
                  boxShadow: 3,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center", // ✅ centra horizontalmente el contenido
                  justifyContent: "center",
                  textAlign: "center",  // ✅ centra el texto
                }}
              >
                <Box>
                  ✅ Nueva versión disponible: {snackbarVersion.version}
                  <br />
                  🔄 Actualizando...
                </Box>
              </Alert>
            </Snackbar>


          </>
        )}
      </AnimatePresence>


      {/* Contenido principal, oculto mientras se carga */}
      <Box sx={{ visibility: showApp ? "visible" : "hidden", pointerEvents: showApp ? "auto" : "none", overflowX: 'hidden', }}      >
        {/* Navbar solo si no estás en /administracion */}
        {location.pathname !== "/login" && (
          <Suspense fallback={null}>
            <Navbar contactoRef={contactoRef} informationsRef={informationsRef} videoReady={videoReady} />
          </Suspense>
        )}

        {/* Rutas principales con contexto */}
        <Outlet context={{ showApp, contactoRef, informationsRef }} />

        {/* Secciones visibles solo en la página de inicio */}
        {["/", ""].includes(location.pathname) && (
          <>
            <Suspense fallback={null}>
              <div ref={informationsRef}>
                <Informations />
              </div>
            </Suspense>
          </>
        )}

        {/* Botón WhatsApp */}
        {location.pathname !== "/login" && location.pathname !== "/dashboard" && location.pathname !== "/configurar-servicios" && (
          <Box
            sx={{
              position: "fixed",
              bottom: "40px",
              right: "40px",
              zIndex: 100,
              transition: "bottom 0.3s ease",
            }}
          >
            <IconButton
              onClick={() => {
                window.open("https://api.whatsapp.com/send?phone=56922292189", "_blank");
                setHasInteracted(true);
              }}
              sx={{
                width: 60,
                height: 60,
                backgroundColor: "#25d366",
                color: "#FFF",
                borderRadius: "50%",
                boxShadow: "2px 2px 3px #999",
                "&:hover": { backgroundColor: "#1ebe5d" },
                zIndex: 101,
              }}
            >
              <WhatsAppIcon sx={{ fontSize: 30 }} />
            </IconButton>

            {/* Burbuja de mensaje */}
            {openBubble && (
              <Box
                sx={{
                  position: "fixed",
                  bottom: 110,
                  right: 40,
                  backgroundColor: "#fff",
                  color: "#000",
                  boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
                  borderRadius: "20px",
                  padding: "8px 16px",
                  fontFamily: "Poppins, sans-serif",
                  zIndex: 102,
                  opacity: openBubble ? 1 : 0,
                  transform: openBubble ? "translateX(0)" : "translateX(100%)",
                  transition: "transform 0.5s ease, opacity 0.5s ease",
                }}
                onClick={() => setOpenBubble(false)}
              >
                Puedes escribirnos al wsp!
              </Box>
            )}
          </Box>
        )}

        {/* Botón scroll arriba */}
        {showArrow && (
          <IconButton
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            sx={{
              position: "fixed",
              bottom: "120px",
              right: "40px",
              backgroundColor: "#fff",
              color: "#000",
              borderRadius: "50%",
              padding: "10px",
              boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.2)",
              zIndex: 101,
              transition: "transform 0.3s ease-in-out",
              "&:hover": {
                transform: "scale(1.1)",
                backgroundColor: "#000",
                color: "#fff",
              },
            }}
          >
            <ArrowUpwardIcon sx={{ fontSize: 30 }} />
          </IconButton>
        )}
      </Box>
    </ThemeProvider>
  );
}

export default App;
