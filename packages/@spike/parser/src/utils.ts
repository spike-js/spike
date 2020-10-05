import { promises as fs } from 'fs';
import { InternalPath, MimeTypes, Node } from './nodes/base';

// Returns only the files we handle for processing
export const getAllowedMimeTypes = async (file: string) =>
  file.match(/\.(html|css|js|ts|tsx)$/) !== null &&
  !(await fs.stat(file)).isDirectory();

export const getInternalNodeLocation = (
  location: any,
  inner?: boolean
): InternalPath => ({
  start: {
    line: location.line,
    col: location.col,
  },
  end: {
    line: location.line,
    col:
      location.col +
      (inner ? location.startInnerOffset : location.endInnerOffset),
  },
});

export const getInternalNodeId = (
  parentNode: Node,
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
