import { defineConfig } from "cypress";

export default defineConfig({
  requestTimeout: 10_000,
  defaultCommandTimeout: 10_000,
  env: {
    BASE_URL_API: "http://localhost:8000",
  },
});
