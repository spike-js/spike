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

export async function createGraphNode(this: any, file: string): Promise<Node> {
  return {
    id: file,
    // assume a file found means an external node
    type: typeof this.nodeLocation === 'string' ? 'external' : 'internal',
    // assign an external location
    nodeLocation: path.resolve(path.join(process.cwd(), file)),
    // assign the node a mimeType
    mimeType: getMime(file),
    children: [],
  };
}

export default createGraphNode;
