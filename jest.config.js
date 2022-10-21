module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  verbose: true,
  modulePathIgnorePatterns: ['dist'],
  coverageDirectory: './coverage/',
  coverageReporters: ['json', 'lcov', 'text', 'clover', 'cobertura'],
};
