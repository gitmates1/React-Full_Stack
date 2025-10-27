import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Vite config
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173, // frontend port
    proxy: {
      "/api": "http://localhost:5000" // proxy API calls to backend
    }
  }
});
