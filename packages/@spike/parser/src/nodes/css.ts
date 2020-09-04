import { Graph } from '../parser';
import { getInternalNodeLocation } from '../utils';
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
      if (node.name === 'link') {
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
          htmlNode.children.push(fileName);
        }
      } else if (Array.isArray(node.content) && node.content.length > 0) {
        walkToLinkTag(node.content, htmlNode, graph);
      }
    }, []);

    return tree;
  };

  return (tree: any) => walkToLinkTag(tree, htmlNode, graph);
}

export function getStylesFromHtmlNode(htmlNode: Node, graph: Graph): Function {
  const walkToStyleTag = (tree: any, htmlNode: Node, graph: Graph): void => {
    tree.forEach((node: any) => {
      if (node.name === 'style') {
        const isFirstChildText =
          node &&
          node.content &&
          node.content[0] &&
          node.content[0].type === 'text';

        const hasOnlyChildText = isFirstChildText && node.content.length === 1;

        if (hasOnlyChildText) {
          const nodeLocation: InternalPath = getInternalNodeLocation(
            node.content[0],
            true
          );

          // TODO: get internal node, and push location string to parent
          console.log('INLINE SCRIPT LOCATION: ', nodeLocation);
        } else if (Array.isArray(node.content) && node.content.length > 0) {
          walkToStyleTag(node.content, htmlNode, graph);
        }
      }
    }, []);

    return tree;
  };
  return (tree: any) => walkToStyleTag(tree, htmlNode, graph);
}
