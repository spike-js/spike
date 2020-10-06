import path from 'path';
import { Graph } from '../parser';
import { getInternalNodeId, getInternalNodeLocation, getMime } from '../utils';
import createGraphNode, { InternalPath, Node } from './base';

/**
 * Handles a css entry node
 *
 * @param node
 * @param graph
 * @returns Node
 */
export async function handleCssEntryNode(node: Promise<Node>, graph: Graph) {
  let cssNode = await node;

  if (cssNode.mimeType === 'css') {
    return await getCssNodeMeta(cssNode.nodeLocation as string, graph);
  }

  return node;
}

/**
 * Traverses a single html file's AST, creating its node and
 * collecting its child nodes and adding them to the graph if necessary
 *
 * @param node
 * @param graph
 * @param parentNode
 * @param internalPath
 * @returns Promise<Node>
 */
export async function getCssNodeMeta(
  nodePath: string,
  graph: Graph
): Promise<Node> {
  const node = await createGraphNode(nodePath);
  graph.push(node);
  return node;
}

/**
 * Returns all script nodes from within an HTML node
 * by walking the HTML node's AST and extracting them
 *
 * @param graph
 * @param htmlNode
 * @returns Function
 */
export function getCssNodesFromHtmlNode(
  htmlNode: Node,
  graph: Graph
): Function {
  const walkToLinkTag = (tree: any, htmlNode: Node, graph: Graph): void => {
    tree.forEach((node: any) => {
      if (node.name === 'style') {
        const internalLocation: InternalPath = getInternalNodeLocation(
          node.location,
          true
        );

        const styleNode: Node = {
          id: getInternalNodeId(htmlNode, internalLocation),
          type: 'internal',
          nodeLocation: internalLocation,
          mimeType: 'css',
          children: [],
        };

        htmlNode.children.push(styleNode.id);
        graph.push(styleNode);
      } else if (node.name === 'link') {
        const isCssLink =
          node?.attrs?.href?.[0] !== 'undefined' &&
          node?.attrs?.rel?.[0]?.content === 'stylesheet';

        if (isCssLink) {
          const fileName = node.attrs.href[0].content as string;
          const isValidMimeType = getMime(fileName) === 'css';

          if (isValidMimeType) {
            getCssNodeMeta(fileName, graph);
            htmlNode.children.push(path.resolve(fileName));
          }
        }
      } else if (Array.isArray(node.content) && node.content.length > 0) {
        walkToLinkTag(node.content, htmlNode, graph);
      }
    }, []);

    return tree;
  };

  return (tree: any) => walkToLinkTag(tree, htmlNode, graph);
}
