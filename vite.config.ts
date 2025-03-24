import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      usePolling: true, // Permite detectar cambios en entornos como Docker
    },
    host: "0.0.0.0", // Permite que sea accesible desde fuera del contenedor
    strictPort: true,
    port: 3000,
  },
});
