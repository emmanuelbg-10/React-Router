import { useState, useEffect } from "react";
import Menu from "../components/Menu";
import { fetchAboutInfo } from "../services/about.service";
import { AboutInfo } from "../models/About";

export default function About() {
  const [data, setData] = useState<AboutInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    function loadData() {
      fetchAboutInfo()
        .then((info) => setData(info))
        .catch((err) => setError((err as Error).message))
        .finally(() => setLoading(false));
    }
    loadData();
  }, []);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;
  return (
    <div>
      <Menu />
      <h1>About</h1>
      {loading ? (
        <p>Cargando...</p>
      ) : data ? (
        <>
          <h2>{data.title}</h2>
          <p>{data.description}</p>
          <p>Versión: {data.version}</p>
        </>
      ) : (
        <p>No hay información disponible.</p>
      )}
    </div>
  );
}
