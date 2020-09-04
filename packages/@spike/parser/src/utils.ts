import { promises as fs } from 'fs';
import { InternalPath, MimeTypes } from './nodes/base';

// Returns only the files we handle for processing
export const getAllowedMimeTypes = async (file: string) =>
  !file.match(/\^.*/) && !(await fs.stat(file)).isDirectory();

export const getInternalNodeLocation = (
  node: any,
  inner?: boolean
): InternalPath => ({
  start: {
    line: node.nodeLocation.line,
    col: node.nodeLocation.col,
  },
  end: {
    line: node.nodeLocation.line,
    col:
      node.nodeLocation.col +
      (inner
        ? node.nodeLocation.startInnerOffset
        : node.nodeLocation.endInnerOffset),
  },
});

// Returns a plain string representing the mimetype of the file
export const getMime = (path: string): MimeTypes =>
  path.match(/\.htm(l)?$/)
    ? 'html'
    : path.match(/\.css$/)
    ? 'css'
    : path.match(/\.js$/)
    ? 'javascript'
    : path.match(/\.ts$/)
    ? 'typescript'
    : 'unsupported';
