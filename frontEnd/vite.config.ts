// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  plugins: [react()],
  build: {
    // Ajusta la advertencia a 600 kB
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks: {
          // Todas las importaciones de @mui/* van al chunk "mui"
          mui: [
            "@mui/material",
            "@mui/icons-material",
            "@emotion/react",
            "@emotion/styled",
          ],
          // React y ReactDOM en su propio chunk
          "react-vendor": ["react", "react-dom"],
          // Puedes añadir más chunks o dejar que el resto vaya a "vendor"
          vendor: ["axios", "lodash", "zod", "@tanstack/react-query"],
        },
      },
    },
  },
});
