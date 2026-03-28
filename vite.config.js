// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ command }) => ({
  plugins: [react()],
  // Use root path for local dev and repo subpath for production deployment.
  base: command === "serve" ? "/" : "/Cryptocurrency-Tracker/",
}));
