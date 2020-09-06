export type TestingConfigOptions = {
  name: string
} & {
  [key: string]: unknown;
}

export function createTestingConfig(options: TestingConfigOptions) {
  return {
    ...options,
    displayName: options.name,
    name: options.name,
    verbose: true,
    transform: {
      '.(ts|tsx)': 'ts-jest',
    },
    testRegex: '(\\.test)\\.(ts|tsx|js)$',
    modulePaths: ['<rootDir>/src/', '<rootDir>/node_modules/'],
    moduleFileExtensions: ['ts', 'tsx', 'js'],
    moduleNameMapper: {
      '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
        '<rootDir>/../../__mocks__/fileMock.js',
      '\\.(css|scss)$': 'identity-obj-proxy',
    },
  }
}

export default createTestingConfig;