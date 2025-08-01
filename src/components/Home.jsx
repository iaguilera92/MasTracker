// src/components/Home.jsx
import React from "react";
import { Box } from "@mui/material";
import Hero from "./Hero";
import Features from "./Features";
import { useOutletContext } from "react-router-dom";

function Home({ contactoRef, informationsRef, setVideoReady }) {
    const { triggerInformations, hasSeenInformations, showApp } = useOutletContext();
    return (
        <Box>
            <Hero scrollToContacto={contactoRef} setVideoReady={setVideoReady} />
            <Box>
                <Features videoReady={showApp} scrollToInformations={informationsRef} />
            </Box>
        </Box>
    );
}


export default Home;
