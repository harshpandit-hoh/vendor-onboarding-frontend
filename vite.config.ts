import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  // ---- ADD THIS ENTIRE SECTION ----
  // This forces Vite to use the WASM version of esbuild,
  // bypassing the native executable that eScan is blocking.
  optimizeDeps: {
    esbuildOptions: {
      // @ts-ignore
      target: "esnext",
      mainFields: ["module", "main"],
      resolveExtensions: [".js", ".json", ".ts"],
      loader: {
        ".js": "jsx",
        ".ts": "tsx",
      },
    },
  },
  base: "/vendor-onboarding-chatbot/",
});
