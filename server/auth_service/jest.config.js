// This file configures Jest to use the in-memory MongoDB server for tests.
module.exports = {
  testEnvironment: 'node',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
};
