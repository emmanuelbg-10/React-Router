import { Outlet, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Menu from "../components/Menu";
import { API_PRO } from "../services/apiUrl";

export default function Home() {
  const [user, setUser] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProtectedData = async () => {
      const authToken = localStorage.getItem("authToken");

      if (!authToken) {
        localStorage.removeItem("authToken"); // Limpiamos por si acaso
        navigate("/login", { replace: true });
        return;
      }

      try {
        const response = await fetch(`${API_PRO}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          // Si hay error de autenticación, limpiamos y redirigimos
          localStorage.removeItem("authToken");
          navigate("/login", { replace: true });
          return;
        }

        const data = await response.json();
        setUser(data.user);
      } catch (error) {
        console.error("Error:", error);
        localStorage.removeItem("authToken");
        navigate("/login", { replace: true });
      }
    };

    fetchProtectedData();
  }, [navigate]);

  // Si no hay usuario, no renderizamos nada mientras se procesa la redirección
  if (!user) {
    return null;
  }

  return (
    <div className="layout">
      <Menu />
      <div className="mainContainer">
        <div className="sidebar">
          <Link to="/contact" className="link">
            {user}
          </Link>
        </div>
        <div className="content">
          <Outlet context={{ user }} />
          <p>Usuario autenticado</p>
        </div>
      </div>
    </div>
  );
}
