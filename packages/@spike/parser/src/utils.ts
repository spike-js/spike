import { promises as fs } from 'fs';
import { InternalPath, MimeTypes } from './nodes/base';

// Returns only the files we handle for processing
export const getAllowedMimeTypes = async (file: string) =>
  file.match(/\.(html|css|js|ts|tsx)$/) !== null &&
  !(await fs.stat(file)).isDirectory();

export const getInternalNodeLocation = (
  node: any,
  inner?: boolean
): InternalPath => ({
  start: {
    line: node.line,
    col: node.col,
  },
  end: {
    line: node.line,
    col: node.col + (inner ? node.startInnerOffset : node.endInnerOffset),
  },
});

export const getInternalNodeId = (
  parentNode: any,
  internalPath: InternalPath
): string => {
  const { nodeLocation } = parentNode;
  const { start, end } = internalPath;

  return `${nodeLocation}#${start.line}:${start.col}-${end.line}:${end.col}`;
};

// Returns a plain string representing the mimetype of the file
export const getMime = (path: string): MimeTypes =>
  path.match(/\.htm(l)?$/)
    ? 'html'
    : path.match(/\.css$/)
    ? 'css'
    : path.match(/\.js$/)
    ? 'javascript'
    : path.match(/\.ts[x]?$/)
    ? 'typescript'
    : 'unsupported';
