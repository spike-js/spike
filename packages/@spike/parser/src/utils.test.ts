import { InternalPath, Node } from './nodes/base';
import {
  getAllowedMimeTypes,
  getMime,
  getInternalNodeLocation,
  getInternalNodeId,
} from './utils';
import mockFs from 'mock-fs';

describe('getInternalNodeId', () => {
  it('should return a valid id string given a valid parent node and internal location', () => {
    const idString = '/index.html#1:1-1:32';
    const node: Node = {
      id: '/index.html',
      type: 'external',
      nodeLocation: '/index.html',
      mimeType: 'html',
      children: [`${idString}`],
      data: null,
    };
    const location: InternalPath = {
      start: {
        line: 1,
        col: 1,
      },
      end: {
        line: 1,
        col: 32,
      },
    };

    const output = getInternalNodeId(node, location);
    expect(output).toBe(idString);
  });
});

describe('getInternalNodeLocation', () => {
  it('should return a valid InternalPath when provided a valid reshape node location', () => {
    const reshapeNode = {
      type: 'tag',
      name: 'p',
      attrs: {
        class: [{ type: 'text', content: 'test', line: 1, col: 5 }],
        'data-foo': [{ type: 'text', content: 'bar', line: 1, col: 18 }],
      },
      location: {
        line: 1,
        col: 1,
        startOffset: 1,
        startInnerOffset: 31,
        endInnerOffset: 31,
        endOffset: 35,
      },
    };
    const internalNodeLocation: InternalPath = {
      start: {
        line: 1,
        col: 1,
      },
      end: {
        line: 1,
        col: 32,
      },
    };
    const output = getInternalNodeLocation(reshapeNode.location, true);
    expect(output).toStrictEqual(internalNodeLocation);
  });
});

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
