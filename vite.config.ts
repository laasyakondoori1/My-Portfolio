import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [
    tailwindcss(),
    TanStackRouterVite(),
    tsconfigPaths(),
    react()
  ],
});
