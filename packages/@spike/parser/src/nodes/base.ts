import path from 'path';
import { getMime } from '../utils';

export interface Node {
  id: string;
  type: 'internal' | 'external';
  nodeLocation: FilePath | InternalPath;
  mimeType: MimeTypes;
  children: string[];
  data?: unknown;
}

export type MimeTypes =
  | 'javascript'
  | 'typescript'
  | 'css'
  | 'html'
  | 'unsupported';

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

export async function createGraphNode(file: string): Promise<Node> {
  return {
    id: path.resolve(file),
    type: 'external',
    nodeLocation: path.resolve(file),
    mimeType: getMime(file),
    children: [],
  };
}

export default createGraphNode;
