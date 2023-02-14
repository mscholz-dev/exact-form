import { loadEnvConfig } from "@next/env";
import { defineConfig } from "cypress";

const { combinedEnv } = loadEnvConfig(
  process.cwd(),
);

export default defineConfig({
  projectId: "rvrwgg",
  env: combinedEnv,
  e2e: {
    baseUrl: "http://localhost:3000",
    retries: {
      runMode: 3,
    },
    viewportHeight: 1080,
    viewportWidth: 1920,
    video: false,
    screenshotOnRunFailure: false,
    watchForFileChanges: false,
    defaultCommandTimeout: 10_000,
    taskTimeout: 10_000,
    pageLoadTimeout: 10_000,
    requestTimeout: 10_000,
    responseTimeout: 10_000,
  },
});
