/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest/presets/js-with-ts",
  testEnvironment: "node",
  roots: ["<rootDir>/src"],
  transformIgnorePatterns: ["node_modules/(?!variables/.*)"],
  testPathIgnorePatterns: ["<rootDir>/dist/", "node_modules"],
  moduleDirectories: ["node_modules", "<rootdir>/src/"],
  setupFiles: ["dotenv/config"],
  collectCoverage: true,
  coverageDirectory: "coverage",
  extensionsToTreatAsEsm: [".ts"],
  moduleNameMapper: {
    "/src/(.*)": "<rootDir>/src/$1",
    "^utils(.*)$": "<rootDir>/src/utils$1",
  },
  transform: {
    "node_modules/variables/.+\\.(j|t)sx?$": "ts-jest",
  },
};
