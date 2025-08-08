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
          mui: [
            "@mui/material",
            "@mui/icons-material",
            "@emotion/react",
            "@emotion/styled",
          ],
          "react-vendor": ["react", "react-dom"],
          "form-vendor": ["zod", "react-hook-form", "@hookform/resolvers"],
          "query-vendor": ["@tanstack/react-query"],
          "utility-vendor": ["axios", "lodash", "date-fns"],
        },
      },
    },
  },
});
