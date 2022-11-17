/// <reference types="vitest" />
import { defineConfig } from "vite";
import { resolve } from "pathe";
import { fileURLToPath } from "node:url";

// const __filename = url.fileURLToPath(import.meta.url);
const __dirname = fileURLToPath(new URL(".", import.meta.url));

// used for testing, library code uses TSUP to build exports
export default defineConfig({
  resolve: {
    alias: {
      src: resolve(__dirname, "./src"),
      test: resolve(__dirname, "./test"),
    }
  },
  test: {
    dir: "test",
  },
  plugins: [],
});
