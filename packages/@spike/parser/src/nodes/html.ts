import { Node } from './base';
import { Graph } from '../parser';

/**
 * Handles an HTML entry node
 *
 * @param node
 * @param graph
 */
export async function handleHtmlEntryNode(
  node: Promise<Node>,
  graph: Graph
): Promise<Node> {
  let htmlNode = await node;

  if (htmlNode?.mimeType === 'html') {
    return await getHtmlNodeMeta(htmlNode, graph);
  }

  return node;
}

/**
 * Traverses a single html file's AST, creating its node and
 * collecting its child nodes and adding them to the graph if necessary
 *
 * @param node
 * @param graph
 * @returns Promise<Node>
 */
export async function getHtmlNodeMeta(
  htmlNode: Node,
  graph: Graph
): Promise<Node> {
  graph.push(htmlNode);

  return htmlNode;
}
