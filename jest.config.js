module.exports = {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.ts?$': 'babel-jest',
  },
  setupFilesAfterEnv: [
    "./tests/setup.ts"
  ],
};
