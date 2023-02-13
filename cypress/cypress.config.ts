import { defineConfig } from "cypress";

export default defineConfig({
  defaultCommandTimeout: 10_000,
  taskTimeout: 10_000,
  pageLoadTimeout: 10_000,
  requestTimeout: 10_000,
  responseTimeout: 10_000,
});
