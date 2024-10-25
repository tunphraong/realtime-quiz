// const { defaults } = require('jest-config');

// /** @type {import('jest').Config} */
// const config = {
//     testEnvironment: 'jsdom',
//     // preset: 'ts-jest',
//     transform: {
//         '^.+\\.(ts|tsx)?$': 'ts-jest',
//         '^.+\\.(js|jsx)$': 'babel-jest',
//     },
//     moduleFileExtensions: [...defaults.moduleFileExtensions, 'mts', 'cts'],
//     setupFilesAfterEnv: ["<rootDir>/setup.jest.js"], // Add this line
//     transformIgnorePatterns: ["/node_modules/(?!@supabase)/"], // Allow Jest to transform ES modules
//     testEnv1ironmentOptions: {
//         customExportConditions: [''],
//     },
// };

// module.exports = config;

module.exports = {
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    transform: {
        '^.+\\.(ts|tsx)?$': 'ts-jest',
        '^.+\\.(js|jsx)$': 'babel-jest',
    },
    // resolver: '<rootDir>/resolver.js',
    // testEnvironmentOptions: {
    //     customExportConditions: [''],
    // },
};