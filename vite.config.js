import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [reactRouter(), tsconfigPaths()],
  server: {
    watch: {
      ignored: [
        "**/.git/**",
        "**/.react-router/**",
        "**/build/**",
        "**/node_modules/**",
      ],
    },
  },
});
