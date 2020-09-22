import { promises as fs } from 'fs';
import { default as reshapeParser } from 'reshape-parser';
import { Node } from './base';
import { Graph } from '../parser';
import { getJavascriptNodesFromHtmlNode } from './javascript';

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
  // here we need to traverse html files and find scripts and css linked
  // within to set as children/dependencies of said html files by using
  // reshape plugins to parse the ast and add/modify to the graph
  const html = await fs.readFile(htmlNode.nodeLocation as string, {
    encoding: 'utf-8',
  });

  const html_ast = reshapeParser(html);

  await getJavascriptNodesFromHtmlNode(htmlNode, graph)(html_ast);

  graph.push(htmlNode);

  return htmlNode;
}

