module.exports = {
  roots: ['<rootDir>/src'],
  snapshotSerializers: ["enzyme-to-json/serializer"],
  "setupFilesAfterEnv": ["<rootDir>/src/setupTests.ts"],
  verbose: true,
  transform: {
    '.*.(tsx?)$': 'ts-jest',
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node',	'ReactFifteenAdapter.js'],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mocks__/fileMock.js',
    '\\.(scss|sass|css)$': 'identity-obj-proxy',
  },
 

}
