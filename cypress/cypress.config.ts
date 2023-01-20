import { defineConfig } from "cypress";

export default defineConfig({
  env: {
    BASE_URL_API: "http://localhost:8000",
  },
});
