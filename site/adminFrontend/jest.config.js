module.exports = {
    preset: 'ts-jest', // Use ts-jest for TypeScript support
    testEnvironment: 'jsdom', // Simulate a browser environment
    transform: {
      '^.+\\.tsx?$': 'ts-jest', // Use ts-jest to handle .ts and .tsx files
    },
    moduleNameMapper: {
      '\\.(css|less|scss|sass)$': 'identity-obj-proxy', // Mock CSS modules
    },
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'], // Additional setup, e.g., jest-dom
    testPathIgnorePatterns: ['/node_modules/', '/dist/'], // Ignore certain directories
    collectCoverage: true, // Enable coverage collection
    collectCoverageFrom: ['src/**/*.{ts,tsx}'], // Specify files for coverage reporting
  };