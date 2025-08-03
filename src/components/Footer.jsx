// components/Footer.jsx
import React from "react";
import { Box, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "transparent", // ✅ o match del fondo padre
        width: "100%",
        color: "#fff",
        background: "black",
        textAlign: "center",
        py: 2,
        px: 1,
        zIndex: 10
      }}
    >
      <Typography variant="body2" sx={{ fontSize: "10px" }}>
        © MasTracker.cl 2025 - Todos los derechos reservados
      </Typography>
      <Typography
        variant="body2"
        sx={{ cursor: "pointer", fontSize: "10px", mt: 0.5 }}
        onClick={() => window.open("http://plataformas-web.cl", "_blank")}
      >
        Diseñado por plataformas-web.cl
      </Typography>
    </Box>
  );
};

export default Footer;
