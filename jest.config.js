module.exports = {
 testEnvironment: 'jsdom',
 collectCoverageFrom: ['packages/**/*.{ts,tsx}'],
 moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
 modulePathIgnorePatterns: [],
 transform: {
  '^.+\\.(ts|tsx|js|jsx)?$': ['@swc/jest'],
 },
 transformIgnorePatterns: ['/node_modules/', '\\.css$'],
 setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
 globals: {
  'ts-jest': {
   tsconfig: 'tsconfig.json',
  },
 },
 watchPlugins: [
  'jest-watch-typeahead/filename',
  'jest-watch-typeahead/testname',
 ],
 extensionsToTreatAsEsm: ['.ts', '.tsx'],
 moduleNameMapper: {
  '\\.(css)$': 'identity-obj-proxy',
 },
}
