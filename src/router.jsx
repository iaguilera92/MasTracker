// src/router.jsx
import { Navigate, createBrowserRouter, useOutletContext } from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";
import App from "./App";
import { useNavigate } from "react-router-dom";

// ✅ Carga dinámica de componentes de rutas
const Servicios = lazy(() => import("./components/Servicios"));
const Nosotros = lazy(() => import("./components/Nosotros"));
const Contacto = lazy(() => import("./components/Contacto"));
const Administracion = lazy(() => import("./components/Administracion"));
const Home = lazy(() => import("./components/Home"));
const Dashboard = lazy(() => import("./components/Dashboard"));
const ConfigurarServicios = lazy(() => import("./components/configuraciones/ConfigurarServicios"));
const Alarmas = lazy(() => import("./components/configuraciones/Alarmas"));
const Eventos = lazy(() => import("./components/configuraciones/Eventos"));
const Flotas = lazy(() =>
    import("./components/configuraciones/Flotas").catch((err) => {
        console.warn("Fallo al cargar Flotas, recargando...", err);
        window.location.reload();
        return new Promise(() => { }); // evita renderización
    })
);
const Flota = lazy(() => import("./components/configuraciones/Flota"));

// ✅ Función para proteger rutas con autenticación
const isAuthenticated = () => {
    const creds = sessionStorage.getItem("credenciales");
    return creds !== null;
};

const ProtectedRoute = ({ children }) => {
    return isAuthenticated() ? children : <Navigate to="/login" replace />;
};

// ✅ HOC para envolver cualquier componente con Suspense
const withSuspense = (Component) => (
    <Suspense fallback={null}>
        <Component />
    </Suspense>
);


const router = createBrowserRouter(
    [
        {
            path: "/",
            element: <App />,
            children: [
                {
                    path: "",
                    element: withSuspense(Home)
                },
                { path: "servicios", element: withSuspense(Servicios) },
                { path: "nosotros", element: withSuspense(Nosotros) },
                { path: "contacto", element: withSuspense(Contacto) },
                {
                    path: "login",
                    element: withSuspense(Administracion)
                },
                { path: "dashboard", element: withSuspense(Dashboard) },
                {
                    path: "configurar-servicios",
                    element: (
                        <ProtectedRoute>
                            {withSuspense(ConfigurarServicios)}
                        </ProtectedRoute>
                    ),
                },
                {
                    path: "alarmas",
                    element: (
                        <ProtectedRoute>
                            {withSuspense(Alarmas)}
                        </ProtectedRoute>
                    ),
                },
                {
                    path: "eventos",
                    element: (
                        <ProtectedRoute>
                            {withSuspense(Eventos)}
                        </ProtectedRoute>
                    ),
                },
                {
                    path: "flotas",
                    element: (
                        <ProtectedRoute>
                            {withSuspense(Flotas)}
                        </ProtectedRoute>
                    ),
                },
                {
                    path: "flota",
                    element: (
                        <ProtectedRoute>
                            {withSuspense(Flota)}
                        </ProtectedRoute>
                    ),
                },
            ],
        },
    ],
    {
        future: {
            v7_startTransition: true,
        },
    }
);

export default router;
