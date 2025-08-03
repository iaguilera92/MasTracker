import { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Button,
  IconButton,
  Drawer,
  Typography,
  ListItem,
  ListItemButton,
  ListItemText,
  Container,
  Box,
  useTheme,
  useMediaQuery, Dialog, DialogTitle, DialogContent
} from "@mui/material";
import { Menu as MenuIcon, Close } from "@mui/icons-material"; // Agregamos Close para la "X"
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { motion, AnimatePresence } from "framer-motion";
import { keyframes } from "@emotion/react";
import "@fontsource/poppins";
import { useNavigate } from "react-router-dom";
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import CloseIcon from "@mui/icons-material/Close";

import HomeIcon from "@mui/icons-material/Home";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import SettingsInputComponentIcon from "@mui/icons-material/SettingsInputComponent";
import StorageIcon from "@mui/icons-material/Storage";
import EventIcon from "@mui/icons-material/Event";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import SettingsIcon from "@mui/icons-material/Settings";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const socialData = {
  Instagram: { href: "https://www.instagram.com/plataformas.web/?hl=es-la", Icon: InstagramIcon, bgColor: "linear-gradient(45deg, #cf198c, #f41242)", hoverColor: "#cf198c" },
  Facebook: { href: "https://www.facebook.com/profile.php?id=100063452866880", Icon: FacebookIcon, bgColor: "linear-gradient(45deg, #00B5F5, #002A8F)", hoverColor: "#0077b7" },
  LinkedIn: { href: "https://www.linkedin.com/in/mat%C3%ADas-andr%C3%A9s-aguilera-salinas-399b81123?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app", Icon: LinkedInIcon, bgColor: "linear-gradient(45deg, #00B5F5, #0077b7)", hoverColor: "#0077b7" }
};


const shrinkCircle = keyframes`
  0% { transform: scale(1); opacity: 1; }
  100% { transform: scale(0); opacity: 0; }
`;

const expandIcon = keyframes`
  0% { transform: scale(1); opacity: 1; }
  100% { transform: scale(1.5); opacity: 1; }
`;

const rotateTwice = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(720deg); /* 2 vueltas */
  }
`;
const menuItemVariants = {
  hidden: { x: 60, opacity: 0 },
  visible: (i) => ({
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      delay: i * 0.1, // 🪄 Efecto cascada
      ease: "easeOut",
    },
  }),
};
const listVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.15,
    },
  },
};
const bienvenidaVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
      delay: 0.2,
    },
  },
  exit: { opacity: 0, y: 20, transition: { duration: 0.3 } },
};

const itemVariants = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
  exit: { opacity: 0, x: 40, transition: { duration: 0.3 } },
};


const SocialButton = ({ href, Icon, bgColor, hoverStyles }) => (
  <Box
    component="a"
    href={href}
    target="_blank"
    rel="noopener"
    sx={{
      width: 55,
      height: 55,
      borderRadius: "50%",
      position: "relative",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      overflow: "hidden",
      "&:hover .circle": {
        animation: `${shrinkCircle} 300ms forwards`,
      },
      "&:hover .icon": {
        animation: `${expandIcon} 300ms forwards`,
        ...hoverStyles,
      },
    }}
  >
    <Box
      className="circle"
      sx={{
        position: "absolute",
        width: "100%",
        height: "100%",
        borderRadius: "50%",
        background: bgColor,
        transition: "transform 300ms ease-out",
      }}
    />
    <Icon
      className="icon"
      sx={{
        color: "white",
        fontSize: 37,
        position: "absolute",
        transition: "color 300ms ease-in, transform 300ms ease-in",
      }}
    />
  </Box>
);

const menuItems = [
  { name: "Inicio", icon: <HomeIcon /> },
  { name: "Flotas", icon: <DirectionsCarIcon /> },
  //{ name: "OBDII", icon: <SettingsInputComponentIcon /> },
  //{ name: "DATACORE", icon: <StorageIcon /> },
  { name: "Eventos", icon: <EventIcon /> },
  { name: "Alarmas", icon: <NotificationsActiveIcon /> },
  //{ name: "CONFIGURACIÓN", icon: <SettingsIcon /> },
];


const Navbar = ({ contactoRef, informationsRef, videoReady }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [openPDF, setOpenPDF] = useState(false);
  const LogoInicio = () => (navigate("/"), scrollToTop());
  const scrollToTop = () => { window.scrollTo({ top: 0, behavior: "smooth", }); };
  const [snackbar, setSnackbar] = useState({ open: false, message: "" });

  const handleOpenPDF = () => {
    if (isMobile) {
      window.open("/masautomatizacion-pdf.pdf", "_blank");
    } else {
      setOpenPDF(true);
    }
  };
  const handleClosePDF = () => setOpenPDF(false);
  const mostrarAnimacion = videoReady || (location.pathname !== '/' && location.pathname !== '');
  const [animacionMostrada, setAnimacionMostrada] = useState(false);

  useEffect(() => {
    if (!mostrarAnimacion && !animacionMostrada) {
      const timer = setTimeout(() => {
        setAnimacionMostrada(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [mostrarAnimacion, animacionMostrada]);


  useEffect(() => {
    const target = window;
    const handleScroll = () => setIsScrolled(target.scrollTop > 50 || window.scrollY > 50);

    target.addEventListener("scroll", handleScroll);
    return () => target.removeEventListener("scroll", handleScroll);
  }, []);
  const handleScroll = () => {
    console.log("scroll!", window.scrollY);
    setIsScrolled(window.scrollY > 50);
  };
  const scrollToRef = (ref, offset = -80) => {
    if (ref?.current) {
      const y = ref.current.getBoundingClientRect().top + window.scrollY + offset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const handleClick = (item) => {
    setOpen(false);

    const enConstruccion = [
      "DATACORE",
      "CONFIGURACIÓN",
    ];

    if (enConstruccion.includes(item.name)) {
      setSnackbar({
        open: true,
        message: `La sección "${item.name}" está en construcción 🚧`,
      });
      return;
    }

    const actions = {
      Inicio: () => (location.pathname !== "/" ? navigate("/") : scrollToTop()),
      Flotas: () => {
        if (location.pathname !== "/flotas") {
          navigate("/flotas");
        } else {
          scrollToTop();
        }
      },
      Alarmas: () => {
        if (location.pathname !== "/alarmas") {
          navigate("/alarmas");
        } else {
          scrollToTop();
        }
      },
      Eventos: () => {
        if (location.pathname !== "/eventos") {
          navigate("/eventos");
        } else {
          scrollToTop();
        }
      }
    };

    actions[item.name]?.();
  };


  return (
    <>
      <Box
        sx={{
          position: "fixed",
          left: "50%",
          transform: "translateX(-50%)",
          width: "96%",
          zIndex: 1100,
          borderRadius: "50px",
          overflow: "hidden",
          marginTop: "15px",
        }}
      >
        <AppBar
          position="relative"
          sx={{
            backgroundColor: "rgba(0,0,0,0.85)",
            backdropFilter: "blur(10px)",
            boxShadow: "none",
            borderRadius: "50px",
            overflow: "hidden",
          }}
        >
          <Container>
            <Toolbar>
              <Box
                sx={{
                  position: "absolute",
                  left: { xs: "50%", md: "calc(15% + 0%)" },
                  transform: "translateX(-50%)",
                  display: "flex",
                  justifyContent: { xs: "center", md: "flex-start" },
                }}
              >
                <AnimatePresence mode="wait">
                  {(mostrarAnimacion || animacionMostrada) && (
                    <motion.div
                      key={(mostrarAnimacion ? "mostrar" : "forzado")}
                      initial={{ x: -200, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{
                        duration: 1,
                        delay: mostrarAnimacion ? 1 : 0, // ✅ delay según si fue forzado o no
                      }}
                      style={{ cursor: "pointer" }}
                    >
                      <motion.img
                        src="/logo-mastracker-white.png"
                        alt="Logo"
                        onClick={LogoInicio}
                        initial={{ scale: 1 }}
                        animate={{ scale: 1 }}
                        exit={{ opacity: 0 }} // ✅
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        style={{ height: "40px", marginTop: "10px", cursor: "pointer" }}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "/fallback-logo.png"; // 👈 puedes usar un logo alternativo
                        }}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </Box>

              <Box sx={{ flexGrow: 1 }} />

              <Box sx={{ display: { xs: "none", md: "flex" }, gap: 1 }}>
                {menuItems.map((item, index) => (
                  <motion.div
                    key={item.name}
                    custom={index}
                    initial="hidden"
                    animate="visible"
                    variants={menuItemVariants}
                  >

                    <Button
                      color="inherit"
                      sx={{
                        color: "white",
                        fontFamily: "Poppins, sans-serif",
                        padding: "10px 14px", // 👈 más angosto
                        "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.1)" },
                      }}
                      onClick={() => handleClick(item)}
                    >
                      {item.name}
                    </Button>
                  </motion.div>
                ))}
              </Box>

              <IconButton
                color="inherit"
                edge="end"
                onClick={() => setOpen(!open)}
                sx={{ display: { xs: "block", md: "none" } }}
              >
                <motion.div
                  initial={{ x: 200, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 1, ease: "easeOut" }}
                >
                  <MenuIcon />
                </motion.div>
              </IconButton>
            </Toolbar>
          </Container>
        </AppBar>
      </Box>

      {/* Menú móvil */}
      <Drawer
        anchor="right"
        open={open}
        onClose={() => setOpen(false)}
        ModalProps={{ keepMounted: true }}
        sx={{
          "& .MuiDrawer-paper": {
            display: "flex",
            flexDirection: "column",
            height: "100dvh",// ✅ Dinámico y confiable
            width: { xs: '80vw', sm: '60vw', md: '50vw' },
            maxWidth: '700px',
            minWidth: '300px',
            background: `
        linear-gradient(135deg, rgba(18, 22, 35, 0.92), rgba(24, 29, 47, 0.95)),
        radial-gradient(circle at 25% 20%, rgba(63,141,245,0.3) 0%, transparent 40%),
        radial-gradient(circle at 80% 80%, rgba(160,64,255,0.15) 0%, transparent 50%)
      `,
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            color: '#ffffff',
            boxShadow: '0 0 30px rgba(0, 0, 0, 0.6)',
            borderLeft: '1px solid rgba(255,255,255,0.05)',
            p: 0,
          },
        }}
      >
        <Box sx={{ overflowY: 'auto', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ display: "flex", justifyContent: "flex-end", p: 1.2 }}>
            <IconButton
              aria-label="Abrir menú"
              onClick={() => setOpen(false)}
              sx={{
                animation: open ? `${rotateTwice} 1s ease-in-out` : "none",
              }}
            >
              <Close sx={{ fontSize: 32, color: "white" }} />
            </IconButton>
          </Box>


          {/* 📋 Menú navegación */}
          <AnimatePresence mode="wait">
            {open && (
              <motion.ul
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={listVariants}
                style={{ listStyle: "none", padding: 0, margin: 0, width: "100%" }}
              >
                {menuItems.map((item, index) => (
                  <motion.li key={item.name} variants={itemVariants}>
                    <ListItem disablePadding>
                      <ListItemButton
                        onClick={() => handleClick(item)}
                        sx={{
                          px: 2,
                          py: 1,
                          borderBottom: "1px solid rgba(255,255,255,0.1)",
                          borderTop: index === 0 ? "1px solid rgba(255,255,255,0.2)" : "none",
                          "&:hover": { backgroundColor: "rgba(255,255,255,0.05)" },
                        }}
                      >
                        <ListItemText
                          primary={
                            <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
                              <Box sx={{ color: "#7ab7ff", fontSize: "1.7rem", marginBottom: "-5px" }}>{item.icon}</Box>
                              <span style={{ color: "#fff", fontWeight: "500", fontSize: "1.05rem" }}>
                                {item.name}
                              </span>
                            </Box>
                          }
                        />
                      </ListItemButton>
                    </ListItem>
                  </motion.li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>

          {/* 🧱 Espacio flexible para empujar bienvenida y redes al fondo */}
          <Box sx={{ flexGrow: 1 }} />

          {/* 🌟 Tarjeta bienvenida */}
          <AnimatePresence mode="wait">
            {open && (
              <motion.div
                variants={bienvenidaVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <Box
                  sx={{
                    background: `
        radial-gradient(circle at top left, rgba(144,202,249,0.1), transparent 70%),
        linear-gradient(135deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))
      `,
                    borderRadius: 3,
                    px: 2,
                    py: 1,
                    mx: 2,
                    mb: 1,
                    color: "#ffffff",
                    backdropFilter: "blur(8px)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    boxShadow: "0 0 12px rgba(255,255,255,0.05)",
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", mb: 0 }}>
                    <Box
                      component="img"
                      src="/logo-mastracker-white-1.png"
                      alt="Bienvenidos"
                      sx={{
                        width: 65,
                        height: 45,
                        objectFit: "contain",
                        borderRadius: 2,
                        mr: 1,
                      }}
                    />
                    <Typography
                      fontSize="0.8rem"
                      fontWeight={600}
                      sx={{
                        fontFamily: 'Poppins, sans-serif',
                        letterSpacing: 0.3,
                      }}
                    >
                      Bienvenid@ a MásTracker
                    </Typography>
                  </Box>

                  <Typography
                    variant="body2"
                    sx={{
                      opacity: 0.85,
                      fontSize: "0.85rem",
                      mb: 1.1,
                      fontFamily: 'Poppins, sans-serif',
                    }}
                  >
                    Conecta con nuestro equipo y trabaja con nosotros.
                  </Typography>


                  <Button
                    variant="text"
                    size="small"
                    endIcon={
                      <ArrowForwardIosRoundedIcon
                        sx={{
                          fontSize: 16,
                          transition: 'transform 0.3s ease',
                        }}
                      />
                    }
                    onClick={() => {
                      if (informationsRef?.current) {
                        const offset = -80; // 📏 Ajusta este valor según tu diseño (por ejemplo, altura del navbar)
                        const y = informationsRef.current.getBoundingClientRect().top + window.scrollY + offset;
                        window.scrollTo({ top: y, behavior: 'smooth' });
                        setOpen(false);
                      }
                    }}
                    sx={{
                      mt: 1,
                      minHeight: 'unset',
                      color: "#90caf9",
                      fontWeight: 600,
                      fontSize: "0.8rem",
                      textTransform: "none",
                      fontFamily: 'Poppins, sans-serif',
                      pl: 0,
                      py: 0,
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 0.5,
                      transition: "all 0.3s ease",
                      "&:hover": {
                        color: "#ffffff",
                        textDecoration: "underline",
                        backgroundColor: "transparent",
                        "& .MuiSvgIcon-root": {
                          transform: "translateX(3px)",
                        },
                      },
                    }}
                  >
                    Empezar ahora
                  </Button>



                </Box>
              </motion.div>

            )}
          </AnimatePresence>

          {/* Redes sociales al final del menú móvil */}
          <AnimatePresence mode="wait">
            {open && (
              <>
                {/* Redes sociales animadas */}

                <motion.div
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={{
                    hidden: {},
                    visible: {
                      transition: {
                        staggerChildren: 0.12,
                        delayChildren: 0.3,
                      },
                    },
                  }}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "24px",
                    marginBottom: isMobile ? 0 : 90,
                    padding: "20px 0",
                  }}
                >
                  {["Instagram", "Facebook", "LinkedIn"].map((social, index) => {
                    const info = socialData[social];

                    return (
                      <motion.div
                        key={social}
                        variants={{
                          hidden: { opacity: 0, x: 40 },
                          visible: {
                            opacity: 1,
                            x: 0,
                            transition: { duration: 0.5, ease: "easeOut" },
                          },
                          exit: { opacity: 0, x: 30, transition: { duration: 0.3 } },
                        }}
                      >
                        <SocialButton
                          href={info.href}
                          Icon={info.Icon}
                          bgColor={info.bgColor}
                          hoverStyles={{
                            color: info.hoverColor,
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                          }}
                        />
                      </motion.div>
                    );
                  })}
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </Box>
      </Drawer >
      {/* PDF */}
      <Dialog
        open={openPDF}
        onClose={handleClosePDF}
        fullWidth
        maxWidth="lg"
        PaperProps={{
          sx: {
            backgroundColor: "#f5f7fa",
            color: "#1a1a1a",
            borderRadius: 3,
            boxShadow: "0 12px 30px rgba(0,0,0,0.15)",
            overflow: "hidden",
          }
        }}
        BackdropProps={{
          sx: {
            backgroundColor: "rgba(0,0,0,0.7)"
          }
        }}
        // 👇 Agregá esto para evitar que se desplace el layout
        disableScrollLock
      >

        <DialogTitle
          sx={{
            fontWeight: 600,
            fontSize: "1.25rem",
            px: 3,
            py: 2.5,
            borderBottom: "1px solid rgba(0,0,0,0.1)",
            position: "relative",
            background: `linear-gradient(135deg, #e0f2ff 0%, #ffffff 100%)`,
            color: "#1a237e",
          }}
        >
          Presentación MásAutomatización - PDF
          <IconButton
            aria-label="close"
            onClick={handleClosePDF}
            sx={{
              position: "absolute",
              right: 12,
              top: 12,
              color: "#1a237e"
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent sx={{ p: 0 }}>
          <Box
            sx={{
              height: { xs: "75vh", sm: "80vh", md: "85vh" },
              width: "100%",
              backgroundColor: "#000",
            }}
          >
            <iframe src="/masautomatizacion-pdf.pdf#page=1" width="100%" height="600px"></iframe>


          </Box>
        </DialogContent>
      </Dialog>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          severity="info"
          sx={{ fontSize: "0.95rem", fontFamily: "Poppins, sans-serif" }}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
}

export default Navbar;