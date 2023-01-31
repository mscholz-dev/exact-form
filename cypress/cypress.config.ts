import { defineConfig } from "cypress";

export default defineConfig({
  requestTimeout: 10_000,
  defaultCommandTimeout: 10_000,
  responseTimeout: 10_000,
});
