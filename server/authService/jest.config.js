module.exports = {
  testEnvironment: "node",
  testMatch: ["**/_tests/**/*.test.js"],
  setupFilesAfterEnv: ["<rootDir>/test/setup.js"],
  collectCoverageFrom: ["src/**/*.js", "!src/**/index.js"],
  verbose: true,
};
