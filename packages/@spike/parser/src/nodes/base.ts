import path from 'path';
import { getMime } from '../utils';

export interface Node {
  id: string;
  type: 'internal' | 'external';
  location: FilePath | InternalPath;
  mimeType: 'javascript' | 'typescript' | 'css' | 'html';
  children: string[];
  data?: unknown;
}

export type FilePath = string;

export type InternalPath = {
  start: {
    line: number;
    col: number;
  };
  end: {
    line: number;
    col: number;
  };
};

export const createGraphNode = (file: string) => ({
  id: file,
  // assume a file found means an external node
  type: 'external',
  // assign an external location
  location: path.resolve(path.join(process.cwd(), file)),
  // assign the node a mimeType
  mimeType: getMime(file),
  children: []
} as Node);

export default createGraphNode;