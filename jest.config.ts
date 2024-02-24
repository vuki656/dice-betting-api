import type { JestConfigWithTsJest } from 'ts-jest'

const baseConfig: JestConfigWithTsJest = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    verbose: true,
    silent: false,
    collectCoverage: false,
    coveragePathIgnorePatterns: [
        './src/database',
        './src/test',
        './src/shared',
        './src/server',
        '__tests__',
    ],
    globalSetup: './src/test/config/globalSetup.ts',
    setupFilesAfterEnv: [
        './src/test/config/fileSetup.ts',
    ],
    slowTestThreshold: 15,
    testMatch: ['**/*.integration.test.ts'],
}

module.exports = baseConfig
