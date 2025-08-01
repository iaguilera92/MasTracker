import { Box, Container, Typography, Link, keyframes, useMediaQuery, Snackbar, Alert, useTheme } from "@mui/material";
import { useState } from "react";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { useInView } from "react-intersection-observer";
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings'; // Ícono de administración
import { useNavigate } from "react-router-dom";
import { Dialog, DialogTitle, DialogContent, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

// Animación al entrar en vista
const growElement = keyframes`
  0% { transform: scale(0.5); opacity: 0.5; }
  100% { transform: scale(1); opacity: 1; }
`;
// Animación del círculo desapareciendo
const shrinkCircle = keyframes`
0% { transform: scale(1); opacity: 1; }
100% { transform: scale(0); opacity: 0; }
`;

// Animación del icono creciendo
const expandIcon = keyframes`
0% { transform: scale(1); }
100% { transform: scale(1.5); }
`;

// Botón social con animaciones
const SocialButton = ({ href, Icon, bgColor, hoverStyles, isMobile }) => (
  <Box
    component="a"
    href={href}
    target="_blank"
    rel="noopener"
    sx={{
      width: isMobile ? 60 : 40,
      height: isMobile ? 60 : 40,
      borderRadius: "50%",
      position: "relative",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      overflow: "hidden",
      "&:hover .circle": {
        animation: `${shrinkCircle} 900ms forwards`,
      },
      "&:hover .icon": {
        animation: `${expandIcon} 150ms 150ms ease-in forwards`,
        ...hoverStyles, // Se aplican los estilos únicos de cada red
      },
    }}
  >
    {/* Círculo de fondo */}
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

    {/* Icono con color inicial en blanco */}
    <Icon
      className="icon"
      sx={{
        color: "white",
        fontSize: isMobile ? 35 : 24,
        position: "absolute",
        transition: "color 300ms ease-in, transform 300ms ease-in",
      }}
    />
  </Box>
);

const Footer = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [openAlert, setOpenAlert] = useState(false);
  const navigate = useNavigate();
  const [openPDF, setOpenPDF] = useState(false);
  const handleOpenPDF = () => {
    if (isMobile) {
      window.open("/masautomatizacion-pdf.pdf", "_blank");
    } else {
      setOpenPDF(true);
    }
  };
  const handleClosePDF = () => setOpenPDF(false);
  const pdfZoom = isMobile ? 100 : 60;
  const pdfSrc = `/masautomatizacion-pdf.pdf#zoom=${pdfZoom}`;



  const handleClick = (event) => {
    setOpenAlert(true);
    navigate("/administracion"); // Redirige a /administracion
  };
  // Animaciones al hacer scroll
  const { ref: logoRef, inView: logoInView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const { ref: socialRef, inView: socialInView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const { ref: contactRef, inView: contactInView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const { ref: providersRef, inView: providersInView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <Box
      sx={{
        backgroundColor: "rgba(23, 24, 25, 0.97)",
        padding: "20px 0",
        color: "white",
        backgroundImage: "url(/fondo-footer.webp)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        "@media (max-width: 600px)": {
          padding: "10px 0",
        },
      }}
    >
      <Container maxWidth="lg">
        {/* 🔹 Diseño para Escritorio con 3 Columnas */}
        {!isMobile && (
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)", // 🔹 3 columnas iguales
              gap: 4, // 🔹 Espacio entre columnas
              alignItems: "center",
              textAlign: "center",
            }}
          >
            {/* 🔹 Columna 1: Contacto */}
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 1 }}>
              <Typography variant="h6" sx={{ color: "var(--darkreader-text-00b4ff, #1abcff)" }}>
                Contacto
              </Typography>

              <Typography sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <img src="telefono-icon.png" alt="Teléfono" width={16} />
                <Link href="tel:+56922292189" color="inherit">+569 22292189</Link>
              </Typography>

              <Typography sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <img src="mail-icon.png" alt="Correo" width={16} />
                <Link
                  href="https://mail.google.com/mail/?view=cm&to=aguilera.matias.salinas@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  color="inherit"
                >
                  aguilera.matias.salinas@gmail.com
                </Link>
              </Typography>

              <Typography sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <img src="location-icon.png" alt="Ubicación" width={16} />
                Santiago centro, Las camelias 015

              </Typography>
            </Box>

            {/* 🔹 Columna 2: Logo + Redes Sociales */}
            <Box
              ref={logoRef}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                animation: logoInView ? `${growElement} 1s forwards` : "none",
              }}
            >
              <img src="/logo-masautomatizacion-white.png" alt="Logo" style={{ height: "65px", marginBottom: "10px" }} />
              <Box
                ref={socialRef}
                sx={{
                  display: "flex",
                  gap: 4,
                  mt: 0,
                  animation: socialInView ? `${growElement} 1s forwards` : "none",
                }}
              >
                <SocialButton
                  href="https://www.instagram.com/plataformas.web/?hl=es-la"
                  Icon={InstagramIcon}
                  bgColor="linear-gradient(45deg, #cf198c, #f41242)"
                  hoverStyles={{
                    color: "#cf198c",
                    background: "-webkit-linear-gradient(45deg, #cf198c, #f41242)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                />

                {/* Facebook con su hover personalizado */}
                <SocialButton
                  href="https://www.facebook.com/profile.php?id=100063452866880"
                  Icon={FacebookIcon}
                  bgColor="linear-gradient(45deg, #00B5F5, #002A8F)"
                  hoverStyles={{
                    color: "white",
                    background: "-webkit-linear-gradient(45deg, #00B5F5, #002A8F)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                />

                {/* LinkedIn */}
                <SocialButton
                  href="https://www.linkedin.com/in/mat%C3%ADas-andr%C3%A9s-aguilera-salinas-399b81123?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
                  Icon={LinkedInIcon}
                  bgColor="linear-gradient(45deg, #00B5F5, #0077b7)"
                  hoverStyles={{
                    color: "#0077b7",
                    background: "-webkit-linear-gradient(45deg, #00B5F5, #0077b7)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                />
              </Box>
            </Box>

            {/* 🔹 Columna 3: Proveedores */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 0.5, // menor separación entre imagen y texto
              }}
            >
              <img
                src="area-clientes.png"
                width={120}
                alt="Área Clientes"
                style={{ marginTop: -5, marginBottom: "10px" }} // Ajusta el valor según necesites
              />

              <Typography
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 0.5,
                }}
              >
                <AdminPanelSettingsIcon fontSize="small" />
                <Link href="administracion" color="inherit" onClick={handleClick}>
                  Administración
                </Link>

              </Typography>
              <Typography
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 0.5,
                }}
              >

              </Typography>
            </Box>

          </Box>
        )}

        {/* 🔹 Diseño para Móviles */}
        {isMobile && (
          <Box display="flex" flexDirection="column" alignItems="center" mb={7}>
            <Box ref={logoRef} sx={{ animation: logoInView ? `${growElement} 1s forwards` : "none" }}>
              <img src="/logo-masautomatizacion-white.png" alt="Logo" style={{ height: "65px", marginBottom: "15px", marginTop: "15px", marginRight: "40px" }} />
            </Box>

            {/* Redes Sociales */}
            <Box
              ref={socialRef}
              sx={{
                display: "flex",
                gap: 6,
                mb: 2,
                animation: socialInView ? `${growElement} 1s forwards` : "none",
              }}
            >
              <SocialButton href="https://www.instagram.com/plataformas.web/?hl=es-la" Icon={InstagramIcon} bgColor="linear-gradient(45deg, #cf198c, #f41242)" isMobile={isMobile} />
              <SocialButton href="https://www.facebook.com/profile.php?id=100063452866880" Icon={FacebookIcon} bgColor="linear-gradient(45deg, #00B5F5, #002A8F)" isMobile={isMobile} />
              <SocialButton href="https://www.linkedin.com/in/mat%C3%ADas-andr%C3%A9s-aguilera-salinas-399b81123?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" Icon={LinkedInIcon} bgColor="linear-gradient(45deg, #00B5F5, #0077b7)" isMobile={isMobile} />
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "left",
                gap: 0.5, // menor separación entre imagen y texto
              }}
            >
              <img
                src="area-clientes.png"
                width={120}
                alt="Área Clientes"
                style={{ marginTop: 30, marginRight: 30, marginBottom: "20px" }} // Ajusta el valor según necesites
              />

              <Typography
                ml={"10px"}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 0,
                }}
              >
                <AdminPanelSettingsIcon fontSize="small" />
                <Link href="administracion" color="inherit" onClick={handleClick}>
                  Administración
                </Link>
              </Typography>
              <Typography
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 0.5,
                }}
              >
              </Typography>
            </Box>
          </Box>

        )}

        <Typography variant="body2" align="center" mt={2} sx={{ marginTop: "5vh", fontSize: "15px" }}>
          @masautomatizacion.cl 2025 Todos los derechos reservados
        </Typography>
        <Typography variant="body2" align="center" mt={2} sx={{ marginTop: "1vh", cursor: "pointer" }} onClick={() => window.open("http://plataformas-web.cl", "_blank")}>
          Diseñado por plataformas-web.cl
        </Typography>

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
            Presentación masautomatizacion - PDF
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
              <iframe
                src={pdfSrc}
                title="Presentación masautomatizacion"
                width="100%"
                height="100%"
                style={{
                  border: 'none',
                }}
              />

            </Box>
          </DialogContent>
        </Dialog>



      </Container>
    </Box>
  );
};

export default Footer;
