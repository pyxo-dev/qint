module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    '^qint$': '<rootDir>/src',
  },
  coverageDirectory: '<rootDir>/docs/dist/coverage',
}
