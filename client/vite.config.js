import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        host: "0.0.0.0",
        fs: {
            strict: false,
        },
        // proxy: {
        // "/blogs": {
        // target: "http://localhost:3000",
        // target: "https://server-io2gmraao-imadrouahs-projects.vercel.app/",
        // changeOrigin: true,
        // secure: false,
        // },
        // "/login": {
        // target: "http://localhost:3000",
        // target: "https://server-io2gmraao-imadrouahs-projects.vercel.app/",
        // changeOrigin: true,
        // secure: false,
        // },
        // },
    },
});
