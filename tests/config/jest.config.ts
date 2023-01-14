import nextJest from "next/jest";

const jestConfig = nextJest({
  dir: "./tests",
});

const customJestConfig = {
  testEnvironment: "jsdom",
  clearMocks: true,
  moduleDirectories: ["node_modules"],
  setupFilesAfterEnv: [
    "<rootDir>/tests/config/setupTests.ts",
  ],
  testRegex: "**.test.js",
};

export default jestConfig(customJestConfig);
