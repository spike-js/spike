import { promises as fs } from 'fs';
import createGraphNode, { Node } from './nodes/base';
import { getHtmlNodeMeta } from './nodes/html';
import { getAllowedMimeTypes } from './utils';

/** NOTES:
 * 1. find all the files
 * 2. ignore the ones that need to be ignored
 * 3. classify each fileNode with a type, mime, and location
 * 4.
 */

export type Graph = Node[];

export interface ParserOptions {
  // TODO: implement and propogate
  workingDirectory: string;
}

export default async function parser(opts?: ParserOptions): Promise<Graph> {
  // TODO: implement and propogate
  const entryPoints = await fs.readdir(opts?.workingDirectory || process.cwd());
  const graph: Graph = [];
  
  // Iterate through entryPoints and create graph
  await Promise.all(
    entryPoints
      .filter(getAllowedMimeTypes)
      .map((node) => createGraphNode(node))
      .map(async (node) => await getHtmlNodeMeta(node, graph))
  );

  return graph;
}