import { JSX, StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.css";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
  useNavigate,
} from "react-router-dom";

import About from "./routes/About";
import Contact from "./routes/Contact";
import Home from "./routes/Home";
import Error from "./routes/Error";
import Login from "./routes/Login";

// Mejorado: Verificación de autenticación
const isAuthenticated = () => {
  const token = localStorage.getItem("authToken");
  if (!token) return false;

  try {
    // Aquí puedes agregar verificación adicional del token si lo necesitas
    return true;
  } catch {
    localStorage.removeItem("authToken");
    return false;
  }
};

// Componente de protección mejorado
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate("/login", { replace: true });
    }
  }, [navigate]);

  return isAuthenticated() ? children : null;
};

const router = createBrowserRouter([
  {
    path: "/login",
    element: isAuthenticated() ? <Navigate to="/" replace /> : <Login />,
    errorElement: <Error />,
  },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "/contact",
        element: (
          <ProtectedRoute>
            <Contact />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "/about",
    element: (
      <ProtectedRoute>
        <About />
      </ProtectedRoute>
    ),
  },
  {
    path: "*",
    element: <Error />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
