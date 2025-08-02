// src/components/Home.jsx
import React from "react";
import { Box } from "@mui/material";
import { useOutletContext } from "react-router-dom";

function Home() {
    const { contactoRef, informationsRef, setVideoReady } = useOutletContext();

    return (
        <Box>
            {/* Aquí puedes incluir o no secciones según necesidad */}
        </Box>
    );
}

export default Home;
