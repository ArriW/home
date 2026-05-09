import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { buildHeadTags } from "./src/data/siteMeta";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    {
      name: "inject-site-meta",
      transformIndexHtml() {
        return buildHeadTags();
      },
    },
  ],
});
