module.exports = {
  moduleNameMapper: {
    '~(.*)': '<rootDir>/src$1',
  },
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
};
