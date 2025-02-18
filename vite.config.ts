import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { configDefaults } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  test: { // 📌 Esta opción solo existe si Vitest está bien configurado
    globals: true,
    environment: "jsdom",
    setupFiles: ["./src/setupTests.ts"],
    exclude: [...configDefaults.exclude], 
  },
});
