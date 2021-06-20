// eslint-disable-next-line no-undef
module.exports = {
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  testMatch: ['**/?(*.)+(spec|test).[jt]s?(x)'],
  testPathIgnorePatterns: ['lib/', 'node_modules/'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  modulePathIgnorePatterns: ['<rootDir>/functional-test'],
  testEnvironment: 'node',
  // rootDir: 'src',
  // Read: https://kulshekhar.github.io/ts-jest/user/config/diagnostics
  // https://github.com/kulshekhar/ts-jest/issues/822
  globals: {
    'ts-jest': {
      diagnostics: false,
    },
  },
  setupFiles: ['dotenv/config'],
};
