import { promises as fs } from 'fs';
import createGraphNode, { Node } from './nodes/base';
import { handleHtmlEntryNode } from './nodes/html';
import { handleJavascriptEntryNode } from './nodes/javascript';
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

export async function parser(opts?: ParserOptions): Promise<Graph> {
  // TODO: implement and propogate
  const entryPoints = await fs.readdir(opts?.workingDirectory || process.cwd());
  let baseGraph: Graph = await Promise.all(
    entryPoints
      .filter(getAllowedMimeTypes)
      .map(async entryPoint => createGraphNode(entryPoint))
  );
  let resolvedGraph: Graph = await Promise.all(
    baseGraph
      .map(async node => node)
      .map(async node => await handleHtmlEntryNode(node, baseGraph))
      .map(async node => await handleJavascriptEntryNode(node, baseGraph))
  );
  // Final act of removing duplicates from the graph, flattening it entirely
  const flatGraph = resolvedGraph.reduce(dedupeGraph, baseGraph);

  return flatGraph;
}

function dedupeGraph(graph: Graph, currentNode: Node): Graph {
  const match_keys = graph.reduce(
    (keys: number[], node: Node, index: number) => {
      if (
        node.id === currentNode.id ||
        node.nodeLocation === currentNode.nodeLocation
      ) {
        keys.push(index);
      }

      return keys;
    },
    []
  );

  if (match_keys.length > 1) {
    for (let i = 1; i < match_keys.length; i++) {
      let match = match_keys[i];

      graph.splice(match, 1);
    }
  }

  return graph;
}

export default parser;
