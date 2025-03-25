import { useOutletContext } from "react-router-dom";

type ContextType = { user?: string };

export default function Contact() {
  const { user } = useOutletContext<ContextType>();

  return (
    <div className="content">
      <h1>Detalles del contacto</h1>
      <p>Nombre del usuario: {user || "Desconocido"}</p>
    </div>
  );
}
