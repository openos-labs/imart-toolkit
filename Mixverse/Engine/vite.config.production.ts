import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import {resolve as re} from "path";
import resolve from "rollup-plugin-node-resolve";
import alias from "@rollup/plugin-alias";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [alias(),react()],
  resolve: {
    alias: {
      '@': re(__dirname, 'src')
    }
  },
  build: {
    lib: {
      entry: "src/index.tsx",
      formats: ["es"]
    },
    rollupOptions: {
      external: ["react", "react-dom",'@ungap/structured-clone','stats.js','wavesurfer.js']
    }
  },
  publicDir: false
})