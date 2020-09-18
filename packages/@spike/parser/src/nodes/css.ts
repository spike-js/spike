import path from 'path';
import { Graph } from '../parser';
import { getInternalNodeId, getInternalNodeLocation } from '../utils';
import createGraphNode, { InternalPath, Node } from './base';

export async function handleCssEntryNode(node: Promise<Node>, graph: Graph) {
  let cssNode = await node;

  if (cssNode.mimeType === 'css') {
    return await getCssNodeMeta(cssNode.nodeLocation as string, graph);
  }

  return node;
}

export async function getCssNodeMeta(
  nodePath: string,
  graph: Graph
): Promise<Node> {
  const node = await createGraphNode(nodePath);
  graph.push(node);
  return node;
}

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
          node !== undefined &&
          node.attrs !== undefined &&
          node.attrs.href !== undefined &&
          node.attrs.href[0] !== undefined &&
          node.attrs.rel !== undefined &&
          node.attrs.rel[0] !== undefined &&
          node.attrs.rel[0].content === 'stylesheet';

        if (isCssLink) {
          const fileName = node.attrs.href[0].content as string;

          getCssNodeMeta(fileName, graph);
          htmlNode.children.push(path.resolve(fileName));
        }
      } else if (Array.isArray(node.content) && node.content.length > 0) {
        walkToLinkTag(node.content, htmlNode, graph);
      }
    }, []);

    return tree;
  };

  return (tree: any) => walkToLinkTag(tree, htmlNode, graph);
}
