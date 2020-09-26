import { getAllowedMimeTypes, getMime } from './utils';
import mockFs from 'mock-fs';

describe('getAllowedMimeTypes', () => {
  afterEach(() => mockFs.restore());

  it.each<string[]>([
    ['HTML file', 'test.html'],
    ['CSS file', 'test.css'],
    ['JS file', 'test.js'],
    ['TS file', 'test.ts'],
    ['TSX file', 'test.tsx'],
  ])(
    'should return true when provided %s',
    async (type: string, input: string) => {
      let output;

      mockFs({ [`${input}`]: '' });
      output = await getAllowedMimeTypes(input);

      expect(output).toBe(true);
      expect(type).toBe(type); // typescript doesn't like unused params
    }
  );

  it.each<string[]>([
    ['Image file', 'test.png'],
    ['Binary file', 'test.exe'],
    ['Sass file', 'test.scss'],
  ])(
    'should return false when provided %s',
    async (type: string, input: string) => {
      let output;

      mockFs({ [`${input}`]: '' });
      output = await getAllowedMimeTypes(input);

      expect(output).toBe(false);
      expect(type).toBe(type); // typescript doesn't like unused params
    }
  );
});

describe('getMime', () => {
  it.each<string[]>([
    ['html', 'test.html'],
    ['css', 'test.css'],
    ['javascript', 'test.js'],
    ['typescript', 'test.ts'],
    ['typescript', 'test.tsx'],
  ])(
    'should return %s when provided %s',
    async (expected: string, input: string) => {
      const output = getMime(input);

      expect(output).toBe(expected);
    }
  );

  it.each<string[]>([
    ['unsupported', 'test.png'],
    ['unsupported', 'test.scss'],
  ])(
    'should return %s when provided %s',
    async (expected: string, input: string) => {
      const output = getMime(input);

      expect(output).toBe(expected);
    }
  );
});
