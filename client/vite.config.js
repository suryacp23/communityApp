import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
	plugins: [react()],
	server: {
		proxy: {
			// Proxy requests starting with '/api' to your backend server
			"/api": {
				target: "https://community-app-git-backend-sri-haripriyans-projects.vercel.app/", // Your backend server URL
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/api/, ""), // Remove `/api` prefix when forwarding to the backend
			},
		},
	},
});
